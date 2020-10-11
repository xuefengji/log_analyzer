from django.shortcuts import render
# 从models中引入
from project_apps.analyzer.models import Analyzer
#返回Json格式的数据
from django.http import JsonResponse

# Create your views here.
# 使用ORM，获取所有学生的接口，
def get_student(request):
    try:
        analyzer_object = Analyzer.objects.all().values()
        analyzer = list(analyzer_object)
        return JsonResponse({'code': 1, 'data':analyzer})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg':'获取学生信息异常'+str(e)})


