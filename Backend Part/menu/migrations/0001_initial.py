# Generated by Django 5.0.6 on 2024-09-01 08:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=200, unique=True)),
                ('slug', models.SlugField(max_length=25)),
                ('image', models.ImageField(blank=True, null=True, upload_to='static/category/')),
            ],
            options={
                'verbose_name_plural': 'Category',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='menu/Food_image/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField()),
                ('stock', models.IntegerField(default=100)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='food_items', to='menu.category')),
            ],
            options={
                'verbose_name_plural': 'Product',
            },
        ),
        migrations.CreateModel(
            name='Special_Offer_Model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discount_percentage', models.DecimalField(decimal_places=2, max_digits=5)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='special_offers', to='menu.product')),
            ],
            options={
                'verbose_name_plural': 'Special Offer',
            },
        ),
    ]
