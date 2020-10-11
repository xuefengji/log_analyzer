import pymysql

pymysql.version_info=(1,3,13,"final",0) #解决pymsql版本报错问题
#加载mysql到模块中
pymysql.install_as_MySQLdb()