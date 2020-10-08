# log_analyzer

## 后端项目初始化

+ 新建 Django 项目，创建 app ，为所有 app 创建文件夹，并将改文件夹设置为 source root(右键选择)，并在 setting 中设置

```
import sys
sys.path.insert(0, os.path.join(BASE_DIR, 'project_apps'))
```

+ 将 app 添加至 setting 中的 INSTALLED_APPS 中

  