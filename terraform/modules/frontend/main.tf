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

# Create SG with Ingress and Outgress rules
resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  vpc_id      = var.vpc_id
  tags = {
    Name = "allow_http"
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  ingress {
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  ingress { # Allow controller to SSH
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["${var.controller_ip}/32"]
  }
}

# Create VM
resource "aws_instance" "frontend" {
  ami               = "ami-0e872aee57663ae2d" # ubuntu-server-24.04-amd64-hvm
  instance_type     = "t2.micro"              # 1CPU-1GiB
  tags              = { Name = "frontend" }
  availability_zone = "eu-central-1a"
  vpc_security_group_ids = [aws_security_group.allow_http.id]
  key_name = var.ansible_node_pubkey_name
}

# Outputs for inter-module dependency resolution
output "frontend_ip" {
  value = aws_instance.frontend.private_ip
}
