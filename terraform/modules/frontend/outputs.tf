# Outputs for inter-module dependency resolution
output "frontend_ip" {
  value = aws_instance.frontend.private_ip
}
