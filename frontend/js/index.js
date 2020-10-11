const app = new Vue({
    'el': '#app',
    data() {
        return {
            msg: 'hello,world',
            students:[],
            baseUrl: 'http://127.0.0.1:8000/',
            currentpage:1,
            pagesize:10,
            total:0,
            
        }
    },
    mounted() {
        this.getStudents()
    },
   
    methods: {
        // 获取所有学生信息
        getStudents: function(){
            let that = this
            axios
            .get(that.baseUrl + 'students/')
            .then(function(res){
                if(res.data.code === 1){
                    // console.log(res)
                    that.students = res.data.data;
                    that.$message.success('查询数据成功');
                }else{
                    that.$message.error('查询数据错误');
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
})