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