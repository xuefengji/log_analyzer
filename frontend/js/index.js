const app = new Vue({
    'el': '#app',
    data() {
        return {
            msg: 'hello,world',
            student:[
                {sno: 95004, name:"张丽",gender:"女",birthday:"1992-09-09",mobile:"13587678908",email:"1354256@qq.com",address:"江苏省无锡市滨湖区",image:""},
                {sno: 95004, name:"张丽",gender:"女",birthday:"1992-09-09",mobile:"13587678908",email:"1354256@qq.com",address:"江苏省无锡市滨湖区",image:""},
                {sno: 95004, name:"张丽",gender:"女",birthday:"1992-09-09",mobile:"13587678908",email:"1354256@qq.com",address:"江苏省无锡市滨湖区",image:""},
            ],
            currentpage:1,
            pagesize:10,
            total:100
        }
    },
})