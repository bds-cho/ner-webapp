# Outputs for inter-module dependency resolution
output "controller_ip" {
  value = aws_instance.controller.private_ip
}
output "controller_public_ip" {
  value = aws_instance.controller.public_ip
}