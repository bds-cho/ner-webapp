# Outputs for inter-module dependency resolution
output "postgre_ip" {
  value = aws_instance.postgre.private_ip
}
