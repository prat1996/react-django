from django.db import models
from datetime import datetime

class Insurance(models.Model):
    policy_id                   =  models.CharField(max_length=255, blank=False, default=None,unique=True)
    customer_id                 =  models.IntegerField(default=10,blank=True)
    fuel                        =  models.CharField(max_length=100,null=True, blank=True,default="")
    veichel_segment             =  models.CharField(max_length=100,null=True, blank=True,default="")
    premium                     =  models.FloatField(blank=True, null=True)
    bodily_injury_liability     =  models.IntegerField(default=10,blank=True)
    personal_injury_protection  =  models.IntegerField(default=10,blank=True)
    property_damage_liability   =  models.IntegerField(default=10,blank=True)
    collision                   =  models.IntegerField(default=10,blank=True)
    comprehensive               =  models.IntegerField(default=10,blank=True)
    customer_gender             =  models.CharField(max_length=30,null=True, blank=True)
    customer_income_group       =  models.CharField(max_length=30,null=True, blank=True)
    customer_region             =  models.CharField(max_length=30,null=True, blank=True)
    customer_marital_status     =  models.CharField(max_length=30,null=True, blank=True)
    date_of_purchase            =  models.DateTimeField( default=datetime.now,blank=True)