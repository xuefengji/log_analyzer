from django.db import models

# Create your models here.
# Analyzer: 学号，姓名，性别，出生日期，手机号码，邮箱地址，家庭住址，照片

# Analyzer 类
class Analyzer(models.Model):
    gender_choices = (('男', '男'), ('女', '女'))
    sno = models.IntegerField(db_column="SNo", primary_key=True, null=False) # 学号不能为空
    name = models.CharField(db_column="SName", max_length=100, null=False) # 姓名不能为空
    gender = models.CharField(db_column="Gender", max_length=100, choices=gender_choices) # 性别
    birthday = models.DateField(db_column="Birthday",null=False) #生日
    mobile = models.CharField(db_column="Mobile", max_length=100) # 手机号码
    email = models.CharField(db_column="Email",max_length=100) #邮箱地址
    address = models.CharField(db_column="Address", max_length=200) #家庭住址
    image = models.CharField(db_column="Image", max_length=200,null=True) #头像


    class Meta:
        managed = True
        db_table = "analyzer"

    def __str__(self):
        return "学号：%s\t姓名：%s\t性别：%s"%(self.sno, self.name,self.gender)

