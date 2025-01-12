# Global
variable "vpc_id" {
  type = string
}
variable "controller_ip" {
  type = string
}
variable "ansible_node_pubkey_name" {
  type = string
}
variable "backend_ip" {
  type = string
}

# Create SG with Ingress and Outgress rules
resource "aws_security_group" "allow_backend" {
  name        = "allow_backend"
  vpc_id      = var.vpc_id
  tags = {
    Name = "allow_backend"
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  ingress { # PostgreSQL port
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["${var.backend_ip}/32"]
  }
  ingress { # Allow controller to SSH
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["${var.controller_ip}/32"]
  }
}

# Create VM
resource "aws_instance" "postgre" {
  ami               = "ami-0e872aee57663ae2d" # ubuntu-server-24.04-amd64-hvm
  instance_type     = "t2.micro"              # 1CPU-1GiB
  tags              = { Name = "postgre" }
  availability_zone = "eu-central-1a"
  associate_public_ip_address = true # Temporary
  vpc_security_group_ids = [aws_security_group.allow_backend.id]
  key_name = var.ansible_node_pubkey_name
}

# Outputs for inter-module dependency resolution
output "postgre_ip" {
  value = aws_instance.postgre.private_ip
}
