# Generated by Django 3.1.5 on 2021-04-30 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210416_2103'),
        ('travel', '0003_trip_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='user',
            field=models.ManyToManyField(related_name='trips', to='accounts.UserProfile'),
        ),
    ]
