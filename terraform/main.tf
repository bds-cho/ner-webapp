terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.60.0"
    }
  }
}

provider "aws" {
  region     = "eu-central-1"
  access_key = var.aws_access_id
  secret_key = var.aws_access_secret
}

/*
  VARIABLES
*/

variable "aws_access_id" {}

variable "aws_access_secret" {}

variable "az" {
  type    = string
  default = "eu-central-1a"
}

/*
  REQUIRED RESOURCES
*/

resource "tls_private_key" "ansible_node_rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "ansible_node" {
  key_name   = "ansible_node"
  public_key = tls_private_key.ansible_node_rsa.public_key_openssh
}

data "aws_vpc" "default" {
  default = true
}

/*
  MODULES
*/

module "controller" {
  source = "./modules/controller"
  vpc_id = data.aws_vpc.default.id
  ansible_node_pkey = tls_private_key.ansible_node_rsa.private_key_openssh
}

module "frontend" {
  source = "./modules/frontend"
  controller_ip = module.controller.controller_ip
  vpc_id = data.aws_vpc.default.id
  ansible_node_pubkey_name = aws_key_pair.ansible_node.key_name
}

module "backend" {
  source = "./modules/backend"
  controller_ip = module.controller.controller_ip
  vpc_id = data.aws_vpc.default.id
  ansible_node_pubkey_name = aws_key_pair.ansible_node.key_name
  frontend_ip = module.frontend.frontend_ip
}

module "postgre" {
  source = "./modules/postgre"
  controller_ip = module.controller.controller_ip
  vpc_id = data.aws_vpc.default.id
  ansible_node_pubkey_name = aws_key_pair.ansible_node.key_name
  backend_ip = module.backend.backend_ip
}

/*
  CUSTOM "/ETC/HOSTS" FILE
  WARNING: NO IDEMPOTENCE HERE! DESTRUCTION CAN BE OUT OF ORDER.
*/

resource "null_resource" "custom_hosts" {
  provisioner "local-exec" {
    when = create
    command = <<EOT
      echo "127.0.0.1 locahost" > hosts
      echo "${module.controller.controller_ip} controller" >> hosts
      echo "${module.frontend.frontend_ip} frontend" >> hosts
      echo "${module.backend.backend_ip} backend" >> hosts
      echo "${module.postgre.postgre_ip} postgre" >> hosts
    EOT
  }
  provisioner "local-exec" {
    when = create
    command = <<EOT
      ssh -i ./controller_pkey ubuntu@${module.controller.controller_public_ip} sudo mv /etc/hosts /etc/hosts.bak
      scp -i ./controller_pkey hosts ubuntu@${module.controller.controller_public_ip}:~/
      ssh -i ./controller_pkey ubuntu@${module.controller.controller_public_ip} sudo mv /home/ubuntu/hosts /etc/hosts
    EOT
  }
  provisioner "local-exec" {
    when = destroy
    command = <<EOT
      rm -f hosts
    EOT
  }
}
