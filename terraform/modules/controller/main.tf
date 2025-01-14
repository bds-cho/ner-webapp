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
    echo "${var.ansible_node_pkey}" > /home/ubuntu/.ssh/id_rsa
    chmod 400 /home/ubuntu/.ssh/id_rsa
    chown ubuntu:ubuntu /home/ubuntu/.ssh/id_rsa
  EOL
}

# Export private key for SSHing from localhost
resource "local_file" "controller_pkey" {
  content  = tls_private_key.controlle_rsa.private_key_openssh
  filename = "${path.module}/controller_pkey"
  file_permission = 0400
}

# Controller setup
resource "null_resource" "setup" {
  # Create custom /etc/hosts file
  provisioner "local-exec" {
    when = create
    command = <<EOT
      echo "127.0.0.1 locahost" > ${path.module}/hosts
      echo "${aws_instance.controller.private_ip} controller" >> ${path.module}/hosts
      echo "${var.frontend_ip} frontend" >> ${path.module}/hosts
      echo "${var.backend_ip} backend" >> ${path.module}/hosts
      echo "${var.postgre_ip} postgre" >> ${path.module}/hosts
    EOT
  }
  # Copy /etc/hosts file to the controller
  provisioner "local-exec" {
    when = create
    command = <<EOT
      ssh -i ${path.module}/controller_pkey -o StrictHostKeyChecking=accept-new ubuntu@${aws_instance.controller.public_ip} sudo mv /etc/hosts /etc/hosts.bak
      scp -i ${path.module}/controller_pkey ${path.module}/hosts ubuntu@${aws_instance.controller.public_ip}:~/
      ssh -i ${path.module}/controller_pkey ubuntu@${aws_instance.controller.public_ip} sudo mv /home/ubuntu/hosts /etc/hosts
    EOT
  }
  # Copy ansible workspace to controller
  provisioner "local-exec" {
    when = create
    command = <<EOT
      scp -i ${path.module}/controller_pkey -r ${path.root}/../ansible ubuntu@${aws_instance.controller.public_ip}:~/
    EOT
  }
  # Cleanup on destroy
  provisioner "local-exec" {
    when = destroy
    command = <<EOT
      rm -f ${path.module}/hosts
    EOT
  }
}
