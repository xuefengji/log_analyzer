const app = new Vue({
    'el': '#app',
    data() {
        // 自定义规则
        const check_student = (rule,value,callback) => {
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
            isEdit: false,
            dialogTitle: "",
            studentForm:{
                sno: "",
                name:"",
                gender: "",
                birthday: "",
                mobile: "",
                email: "",
                address: "",
                image: "",
            },
            rules:{
                sno:[
                    {required: true, message: '学号不能为空',trigger: 'blur'},
                    {pattern:/^[9][5]\d{3}$/, message: '学号必须以95开头的5位',trigger: 'blur'},
                    {validator: check_student, triggler:'blur'}
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
                    { required: true, message: '手机号码不能为空', triggler: 'blur' },
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
        //修改学生信息
        updateStudent(row){
            this.dialogTitle = "修改学生信息";
            this.dialogVisible = true;
            this.isEdit = true;
            this.isView = false;
            this.studentForm = JSON.parse(JSON.stringify(row));

        },
        //关闭弹窗
        closeDialogForm(){
            this.studentForm.sno = "";
            this.studentForm.name = "";
            this.studentForm.gender = "";
            this.studentForm.birthday = "";
            this.studentForm.mobile = "";
            this.studentForm.email = "";
            this.studentForm.address = "";
            this.dialogVisible = false;
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
        },
        //添加学生信息
        addStudent(){
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