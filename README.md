# log_analyzer

## 后端项目初始化

+ 新建 Django 项目，创建 app ，为所有 app 创建文件夹，并将改文件夹设置为 source root(右键选择)，并在 setting 中设置

```
import sys
sys.path.insert(0, os.path.join(BASE_DIR, 'project_apps'))
```

+ 将 app 添加至 setting 中的 INSTALLED_APPS 中

+ 数据库连接

  + models.py 中创建 model
  
  + setting 文件中配置数据库信息，需要在 __init__.py 文件中添加 pymysql 模块
  
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
  
    
  
  + 执行 python manage.py makemigrations
  
    遇到报错 
  
    1. raise ImproperlyConfigured(‘mysqlclient 1.3.13 or newer is required; you have %s.’ % Database.**version**)
       　 django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.  
  
    解决方法：
  
    1. 在 __init__.py 文件中设置 pymysql.version_info=(1,3,13,"final",0)
  
                        2. 注释  Python38\Lib\site-packages\django\db\backends\mysql\base.py 文件中注释if version < (1, 3, 13):    raise ImproperlyConfigured('mysqlclient 1.3.13 or newer is required; you have %s.' % Database.__version__)
  
    2.  File “D:\Python38\lib\site-packages\django\db\backends\mysql\operations.py”, line 146, in last_executed_query 　　
       query = query.decode(errors=‘repDlace’) 　　
       AttbuteError: ‘str’ object has no attribute ‘decode’  
  
       解决方法：
  
       ?	 146行的decode修改为encode 
  
  + 执行 python manage.py migrate 