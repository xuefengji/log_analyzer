"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from project_apps.analyzer import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/',views.get_student) , #获取所有学生
    path('students/query/', views.query_student), #获取符合条件的学生信息
    path('student/check/',views.check_student), #检查学生信息
    path('student/add/',views.add_student), #添加学生
]
