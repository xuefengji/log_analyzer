const app = new Vue({
    'el': '#app',
    data() {
        // 自定义规则
        const check_student = (rule,value,callback) => {
            if(this.isEdit) callback();
            axios.post(this.baseUrl+'student/check/',{
                sno: value
            })
            .then((res)=>{
                if(res.data.code == 1){
                    if(res.data.exists){
                        callback(new Error('学号已存在！'));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error('后端检查学生信息时出错'));
                }
            })
            .catch((res)=>{
                callback(new Error('后端检查学生信息时出错'));
            })
        };
        return {
            msg: 'hello,world',
            students:[],
            pageStudent:[], //用于存放当前页数据
            baseUrl: 'http://127.0.0.1:8000/',
            currentPage:1,
            pageSize:10, 
            total:0,
            inputstr: "", //获取输入框的值
            dialogVisible: false,
            isView: false,
            isEdit: false, //标志是否是编辑
            dialogTitle: "",
            selectStudents:[], //保存多选数据
            studentForm:{
                sno: " ",
                name:" ",
                gender: " ",
                birthday: " ",
                mobile: " ",
                email: " ",
                address: " ",
                image: " ",
                imageUrl: " ",
            },
            rules:{
                sno:[
                    {required: true, message: '学号不能为空',trigger: 'blur'},
                    {pattern:/^[9][5]\d{3}$/, message: '学号必须以95开头的5位',trigger: 'blur'},
                    {validator: check_student, trigger:'blur'}
                ],
                name:[
                    {required: true, message: '姓名不能为空',trigger: 'blur'},
                    {pattern:/^[\u4e00-\u9fa5]{2,5}$/, message: '姓名必须是2-5个汉字',trigger: 'blur'}
                ],
                gender: [
                    { required: true, message: '性别不能为空', trigger: 'change' },
                ],
                birthday: [
                    {required: true, message: '出生日期不能为空', trigger: 'change' },
                ],
                mobile: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    { pattern: /^[1][35789]\d{9}$/, message: '手机号码必须要符合规范', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱地址必须要符合规范', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '家庭住址不能为空', trigger: 'blur' },
                ]
            }
            
        }
    },
    mounted() {
        this.getStudents()
    },
   
    methods: {
        //导入excel
        uploadExcelPost(file) {
            let that = this
            //实例化一个formdata
            //定义一个FormData类
            let fileReq = new FormData();
            //把照片穿进去
            fileReq.append('excel', file.file);
            //使用Axios发起Ajax请求
            axios(
                {
                    method: 'post',
                    url: that.baseURL + 'excel_import/',
                    data: fileReq
                }
            ).then(res => {
                // 根据code判断是否成功
                if (res.data.code === 1) {
                    //把照片给image 
                    that.students = res.data.data;
                    //计算总共多少条
                    that.total = res.data.data.length;
                    //分页
                    that.getPageStudents();
                    //弹出框体显示结果 
                    this.$alert('本次导入完成! 成功：' + res.data.success +'失败：'+ res.data.error 
                    , '导入结果展示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: "本次导入失败数量为：" + res.data.error + ",具体的学号："+res.data.errors,
                            });
                        }
                    });
                    //把失败明细打印
                    console.log("本次导入失败数量为：" + res.data.error + ",具体的学号：");
                    console.log(res.data.errors);
                } else {
                    //失败的提示！
                    that.$message.error(res.data.msg);
                }

            }).catch(err => {
                console.log(err);
                that.$message.error("上传Excel出现异常！");
            })

        },
        //上传图片
        uploadPicturePost(file){
            let that = this;
            //将文件添加到formdata中
            let fileReq = new FormData();
            fileReq.append("avatar", file.file);
            axios({
                method: 'post',
                url: that.baseUrl+'upload/',
                data: fileReq
            })
            .then(res=>{
                if(res.data.code ===1){
                    that.studentForm.image = res.data.name;
                    that.studentForm.imageUrl = that.baseUrl + 'media/'+ res.data.name;
                    
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err=>{
                console.log(err)
                that.$message.error("上传头像出现异常！");
            })
        },
        //表格多选学生信息时
        handleSelectionChange(data){
            this.selectStudents = data;
        },
        //批量删除学生信息
        deleteStudents(){
            this.$confirm("是否批量删除"+this.selectStudents.length+"个学生信息嘛？", '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let that = this;
                axios.post(that.baseUrl + 'students/delete/',{student:that.selectStudents})
                .then(res=>{
                    if(res.data.code ===1){
                        //获取所有学生信息
                        that.students = res.data.data;
                        //获取数据总数
                        that.total = res.data.data.length;
                        //获取分页数据
                        that.getPageStudent();
                        that.$message({
                            type: 'success',
                            message: '批量删除成功!'
                          });

                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(err=>{
                    this.$message({
                        type: 'error',
                        message: '批量删除学生信息失败'
                      }); 
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
        },
        //校验表单提交信息(修改、添加)
        submitStudentForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.isEdit){
                    this.updateSubmitStudent();
                }else{
                    // console.log(1);
                    this.addSubmitStudent();
                }
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          //添加学生到数据库
        addSubmitStudent(){
            let that = this;
            axios.post(that.baseUrl+'student/add/',that.studentForm)
            .then(res=>{
                if(res.data.code === 1){
                    console.log(res.data.data);
                    that.students = res.data.data;
                    that.total = res.data.data.length;
                    that.getPageStudent();
                    that.$message.success('添加学生成功');
                    that.closeDialogForm('studentForm');
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
         //修改学生到数据库
         updateSubmitStudent(){
            let that = this;
            axios.post(that.baseUrl+'student/update/',that.studentForm)
            .then(res=>{
                if(res.data.code === 1){
                    // console.log(res.data.data);
                    that.students = res.data.data;
                    that.total = res.data.data.length;
                    that.getPageStudent();
                    that.$message.success('修改学生成功');
                    that.closeDialogForm('studentForm');
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //删除学生信息
        deleteStudent(row){
            this.$confirm('是否删除[学号：'+row.sno+',姓名：'+row.name+']，该学生信息?', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let that = this;
                axios.post(that.baseUrl + 'student/delete/',{sno:row.sno})
                .then(res=>{
                    if(res.data.code ===1){
                        //获取所有学生信息
                        that.students = res.data.data;
                        //获取数据总数
                        that.total = res.data.data.length;
                        //获取分页数据
                        that.getPageStudent();
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                          });

                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(err=>{
                    this.$message({
                        type: 'error',
                        message: '删除学生信息失败'
                      }); 
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });

        },
        //修改学生信息
        updateStudent(row){
            this.dialogTitle = "修改学生信息";
            this.dialogVisible = true;
            this.isEdit = true;
            this.isView = false;
            this.studentForm = JSON.parse(JSON.stringify(row));
            

        },
        //关闭弹窗
        closeDialogForm(formName){
            //重置表单
            this.$refs[formName].resetFields();
            this.studentForm.sno = "";
            this.studentForm.name = "";
            this.studentForm.gender = "";
            this.studentForm.birthday = "";
            this.studentForm.mobile = "";
            this.studentForm.email = "";
            this.studentForm.address = "";
            this.studentForm.image = "";
            this.studentForm.imageUrl = "";
            this.dialogVisible = false;
        },

        //根据学号查询学生信息
        getStudentInfo(sno){
            for(oneStudent of this.students){
                if(oneStudent.sno === sno) return oneStudent.image;
            }
        },
        //查看学生信息
        viewStudent(row){
            this.dialogTitle = "查看学生信息";
            this.dialogVisible = true;
            this.isView = true;
            this.isEdit = false;
            //通过浅拷贝的方式赋值
            // this.studentForm = row;
            //深拷贝
            this.studentForm = JSON.parse(JSON.stringify(row));
            this.studentForm.image = this.getStudentInfo(row.sno);
            this.studentForm.imageUrl = this.baseUrl + 'media/'+ this.studentForm.image;
        },
        //添加学生信息弹框
        addStudent(){
            this.dialogTitle = "添加学生信息";
            this.dialogVisible = true;
            this.isEdit = false;
            this.isView = false;
        },
        // 查询学生信息
        getQueryStudent(){
            let that = this;
            axios
            .post(that.baseUrl + 'students/query/',{inputstr:that.inputstr})
            .then(function(res){
                if(res.data.code === 1){
                    console.log(res)
                    that.students = res.data.data;
                    that.total = res.data.data.length;
                    that.getPageStudent(); //获取当前页数据
                    // console.log(that.pageStudent);
                    // that.$message.success('查询数据成功');
                }else{
                    that.$message.error('查询数据错误');
                }
            })
            .catch(function(err){
                console.log(err)
            })
        },
        // 获取所有学生信息
        getStudents: function(){
            let that = this;
            axios
            .get(that.baseUrl + 'students/')
            .then(function(res){
                if(res.data.code === 1){
                    console.log(res)
                    that.students = res.data.data;
                    that.total = res.data.data.length;
                    that.getPageStudent(); //获取当前页数据
                    // console.log(that.pageStudent);
                    // that.$message.success('查询数据成功');
                }else{
                    that.$message.error('查询数据错误');
                }
            })
            .catch(function(err){
                console.log(err)
            })
        },
        // 获取当前分页数据
        getPageStudent(){
            this.pageStudent = [];
            for(let i = (this.currentPage-1)*this.pageSize; i<this.total ;i++ ){
                this.pageStudent.push(this.students[i]);
                if(this.pageStudent.length === this.pageSize) break;
            }
        },
        handleSizeChange(size) {
            this.pageSize = size;
            this.getPageStudent();
          },
        handleCurrentChange(pageNum) {
            this.currentPage = pageNum;
            this.getPageStudent();
          }
    },
})