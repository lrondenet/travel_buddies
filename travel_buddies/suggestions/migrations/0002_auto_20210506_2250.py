# Generated by Django 3.1.5 on 2021-05-06 22:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20210506_2250'),
        ('suggestions', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='suggestions',
            name='vote',
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('suggestions', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='suggestions.suggestions')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.userprofile')),
            ],
        ),
    ]
