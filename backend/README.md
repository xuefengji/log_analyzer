# 1. 添加 media 访问

1. settings 中设置访问路径

   ```
   #设置上传图片路径和外部访问路径MEDIA_ROOt = os.path.join(BASE_DIR,'media/')MEDIA_URL = '/media/'
   ```

2. url 中设置所有的文件可以被访问

   ```
   from django.conf import settings
   from django.conf.urls.static import static
   
   #允许所有的media文件被访问
   urlpatterns += static(settings.MEDIA_URL, document_root =settings.MEDIA_ROOt)
   ```