from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class user_id(models.Model):
    user_name = models.CharField(max_length=50)
    password = models.CharField(max_length=30)
    gender = models.CharField(max_length=6)
    dob = models.DateField()
    email = models.EmailField(max_length=250)

    def save(self, *args, **kwargs):
        # Hash password before saving
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    class Meta:
        app_label = "myapp"

    def __str__(self):
        return self.user_name


class personal_details(models.Model):
    user_id = models.OneToOneField(
        'myapp.user_id', on_delete=models.CASCADE, primary_key=True)
    family_history = models.CharField(max_length=1000)
    treatment = models.CharField(max_length=1000)
    mental_health_condition = models.CharField(max_length=1000)
    phy_health_condition = models.CharField(max_length=1000)
    comments = models.CharField(max_length=1000)


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    blog_url = models.URLField()


class BullyingReport(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
