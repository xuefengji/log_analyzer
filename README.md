# log_analyzer

## �����Ŀ��ʼ��

+ �½� Django ��Ŀ������ app ��Ϊ���� app �����ļ��У��������ļ�������Ϊ source root(�Ҽ�ѡ��)������ setting ������

```
import sys
sys.path.insert(0, os.path.join(BASE_DIR, 'project_apps'))
```

+ �� app ����� setting �е� INSTALLED_APPS ��

+ ���ݿ�����

  + models.py �д��� model
  
  + setting �ļ����������ݿ���Ϣ����Ҫ�� __init__.py �ļ������ pymysql ģ��
  
    ```
    DATABASES = {
        # 'default': {
        #     'ENGINE': 'django.db.backends.sqlite3',
        #     'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        # }
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'analyzer_db',
            'USER': 'root',
            'PASSWORD': '123456',
            'HOST': '127.0.0.1',
            'PORT': '3306'
        }
    }
    ```
  
    
  
  + ִ�� python manage.py makemigrations
  
    �������� 
  
    1. raise ImproperlyConfigured(��mysqlclient 1.3.13 or newer is required; you have %s.�� % Database.**version**)
       �� django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.  
  
    ���������
  
    1. �� __init__.py �ļ������� pymysql.version_info=(1,3,13,"final",0)
  
                        2. ע��  Python38\Lib\site-packages\django\db\backends\mysql\base.py �ļ���ע��if version < (1, 3, 13):    raise ImproperlyConfigured('mysqlclient 1.3.13 or newer is required; you have %s.' % Database.__version__)
  
    2.  File ��D:\Python38\lib\site-packages\django\db\backends\mysql\operations.py��, line 146, in last_executed_query ����
       query = query.decode(errors=��repDlace��) ����
       AttbuteError: ��str�� object has no attribute ��decode��  
  
       ���������
  
       ?	 146�е�decode�޸�Ϊencode 
  
  + ִ�� python manage.py migrate 



##  ����������

+ ���

  1. ��װ pip install django-cors-headers

  2. ע�ᵽ setting �� INSTALL_APPS����

  3. ��ӵ� setting �� MIDDLEWARE ��

     corsheaders.middleware.CorsMiddleware, ��Ҫ����csrf��ǰ��

  4. ���������ʵİ�����,���ǳ����ڰ������е����������Է��ʺ�˽ӿ�

     CORS_ORIGIN_WHITELIST = ('http://192.168.182.1:8080')��:CORS_ORIGN_ALLOW_ALL = TRUE

     �������:CORS_ALLOW_CREDENTIALS = Trueָ���ڿ��������,����Ƿ�֧�ֶ�cookie�Ĳ���



## ǰ��ʹ�� axios �Ŀ�

+ ʹָ�� vue ʵ���� this ��� undefined