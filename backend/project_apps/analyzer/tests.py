from django.test import TestCase
import openpyxl

# Create your tests here.

def get_excel_data(path:str):
    # 获取工作簿
    workbook = openpyxl.load_workbook(path)
    # 获取sheet
    sheet = workbook['student']
    # 准备数据
    students = []
    # 准备key
    stu_key = ['sno','name','gender','birthday','mobile','email','address']
    # 获取数据
    for one_student in sheet.rows:
        temp = {}
        # 组合key和value
        for index,cell in enumerate(one_student):
            temp[stu_key[index]] = cell.value
        students.append(temp)
    return students



