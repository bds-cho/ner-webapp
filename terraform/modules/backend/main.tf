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
variable "frontend_ip" {
  type = string
}

# Create SG with Ingress and Outgress rules
resource "aws_security_group" "allow_frontend" {
  name        = "allow_frontend"
  vpc_id      = var.vpc_id
  tags = {
    Name = "allow_frontend"
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  ingress { # Django port
    from_port        = 8000
    to_port          = 8000
    protocol         = "tcp"
    cidr_blocks      = ["${var.frontend_ip}/32"]
  }
  ingress { # Allow controller to SSH
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["${var.controller_ip}/32"]
  }
}

# Create VM
resource "aws_instance" "backend" {
  ami               = "ami-0e872aee57663ae2d" # ubuntu-server-24.04-amd64-hvm
  instance_type     = "t2.micro"              # 1CPU-1GiB
  tags              = { Name = "backend" }
  availability_zone = "eu-central-1a"
  associate_public_ip_address = true # Temporary
  vpc_security_group_ids = [aws_security_group.allow_frontend.id]
  key_name = var.ansible_node_pubkey_name
}

# Outputs for inter-module dependency resolution
output "backend_ip" {
  value = aws_instance.backend.private_ip
}
