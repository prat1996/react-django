# Generated by Django 3.2.5 on 2021-07-18 03:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='insurance',
            name='date_of_purchase',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
