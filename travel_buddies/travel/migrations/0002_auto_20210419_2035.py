# Generated by Django 3.1.5 on 2021-04-19 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trip',
            old_name='transporation',
            new_name='transportation',
        ),
    ]
