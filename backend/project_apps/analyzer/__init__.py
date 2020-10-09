import pymysql
#加载mysql到模块中
pymysql.version_info=(1,3,13,"final",0) #解决pymsql版本报错问题
pymysql.install_as_MySQLdb()