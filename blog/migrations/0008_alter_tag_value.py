# Generated by Django 3.2.6 on 2023-02-16 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_alter_post_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='value',
            field=models.TextField(max_length=100, unique=True),
        ),
    ]