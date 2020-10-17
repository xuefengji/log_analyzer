const app = new Vue({
    'el': '#app',
    data() {
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