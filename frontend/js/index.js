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
            inputstr: "" //获取输入框的值
            
        }
    },
    mounted() {
        this.getStudents()
    },
   
    methods: {
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