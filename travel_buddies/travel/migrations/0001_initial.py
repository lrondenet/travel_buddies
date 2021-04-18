# Generated by Django 3.1.5 on 2021-04-16 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('destination', models.TextField()),
                ('transporation', models.TextField(choices=[('PLANE', 'Plane'), ('CAR', 'Car'), ('TRAIN', 'Train'), ('BOAT', 'Boat')])),
                ('stay', models.TextField(choices=[('HOTEL', 'Hotel'), ('HOSTEL', 'Hostel'), ('AIRBNB', 'Airbnb'), ('CAMPING', 'Camping')])),
            ],
        ),
    ]