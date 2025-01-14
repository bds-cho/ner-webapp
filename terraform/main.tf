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
  frontend_ip = module.frontend.frontend_ip
  backend_ip = module.backend.backend_ip
  postgre_ip = module.postgre.postgre_ip
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
