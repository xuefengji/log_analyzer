from django.shortcuts import render
# 从models中引入
from project_apps.analyzer.models import Analyzer
#返回Json格式的数据
from django.http import JsonResponse

import json

#引入Q 查询
from django.db.models import Q

# Create your views here.
# 使用ORM，获取所有学生的接口，
def get_student(request):
    try:
        analyzer_object = Analyzer.objects.all().values()
        analyzer = list(analyzer_object)
        return JsonResponse({'code': 1, 'data':analyzer})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg':'获取学生信息异常'+str(e)})


# 使用ORM查询学生信息
def query_student(request):
    # axios 默认数据为json格式--使用inputstr存储
    data = json.loads(request.body.decode("utf-8"))
    try:
        #获取满足条件的学生信息，并转为字典格式
        analyzer_object = Analyzer.objects.filter(Q(email__icontains=data['inputstr']) | Q(name__icontains=data['inputstr']) |
                                                  Q(gender__icontains=data['inputstr']) | Q(address__icontains=data['inputstr'])|
                                                  Q(mobile__icontains=data['inputstr']) |Q(address__icontains=data['inputstr'])).values()
        analyzer = list(analyzer_object)
        return JsonResponse({'code': 1, 'data':analyzer})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg':'获取学生信息异常'+str(e)})


#检查学生学号是否已存在
def check_student(request):
    data = json.loads(request.body.decode("utf-8"))
    try:
        students_object = Analyzer.objects.filter(sno=data['sno'])
        if students_object.count() == 0:
            return JsonResponse({'code':1,'exists':False})
        else:
            return JsonResponse({'code':1,'exists':True})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "检查学生信息出错"+str(e)})

#添加学生
def add_student(request):
    data = JsonResponse(request.body.decode('utf-8'))
    try:
        #     添加学生信息
        student_obj = Analyzer(sno=data['sno'],name=data['name'],birthday=data['birthday'],gender=data['gender'],
                               mobile=data['mobile'],emial=data['email'],address=data['address'])
        student_obj.save()
        analyzer_object = Analyzer.objects.all().values()
        analyzer = list(analyzer_object)
        return JsonResponse({'code': 1, 'data': analyzer})
    except Exception as e:
        return JsonResponse({'code':0,'msg':'添加学生失败，具体原因'+str(e)})