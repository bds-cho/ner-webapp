# Global
variable "vpc_id" {
  type = string
}
variable "ansible_node_pkey" {
  type = string
}

# Create security group with Ingress and Outgress rules
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  vpc_id      = var.vpc_id
  tags = {
    Name = "allow_ssh"
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  ingress {
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

# Create RSA key pair
resource "tls_private_key" "controlle_rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
resource "aws_key_pair" "controller_key" {
  key_name   = "controller_pkey"
  public_key = tls_private_key.controlle_rsa.public_key_openssh
}

# Create VM
resource "aws_instance" "controller" {
  ami               = "ami-0e872aee57663ae2d" # ubuntu-server-24.04-amd64-hvm
  instance_type     = "t2.micro"              # 1CPU-1GiB
  tags              = { Name = "controller" }
  availability_zone = "eu-central-1a"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]
  key_name = aws_key_pair.controller_key.key_name
  user_data = <<-EOL
    #!/bin/bash -xe
    apt update
    apt install -y software-properties-common git
    add-apt-repository --yes --update ppa:ansible/ansible
    apt install -y ansible
    echo "${var.ansible_node_pkey}" > /etc/ansible/nodes_pkey
  EOL
}

# Export private key for SSHing from localhost
resource "local_file" "controller_pkey" {
  content  = tls_private_key.controlle_rsa.private_key_openssh
  filename = "controller_pkey"
  file_permission = 0400
}

# Outputs for inter-module dependency resolution
output "controller_ip" {
  value = aws_instance.controller.private_ip
}
output "controller_public_ip" {
  value = aws_instance.controller.public_ip
}