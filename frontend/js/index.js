const app = new Vue({
    'el': '#app',
    data() {
        return {
            msg: 'hello,world',
            student:[],
            baseUrl: 'http://127.0.0.1:8000/',
            currentpage:1,
            pagesize:10,
            total:100,
            
        }
    },
    mounted() {
        this.getStudents()
    },
    methods: {
        getStudents: function(){
            axios
            .get(this.baseUrl + 'students/')
            .then(function(res){
                console.log(res)
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
})