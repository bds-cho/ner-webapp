# Generated by Django 5.0.6 on 2024-06-17 16:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("myapi", "0003_alter_userdata_created_at_alter_userdata_updated_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="userdata",
            name="analyzed_text",
            field=models.TextField(default=""),
        ),
    ]
