<style scoped>
    div#app{
        display: flex;
        display: -webkit-flex;
        display: flex;
        flex-flow: column;
        width: 100%;
        height: 100%;
    }
    div#container{
        width: 100%;
        height:100%; 
        flex: 1 1 auto;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        padding-top: 100px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px; 
    }
</style>

<template>
    <div id="app">
    <app-header title="S4G2 Server" v-bind:tools="tools"></app-header>
    <div id="container">
        <login-box @login="doLogin(arguments[0],arguments[1])" title="Welcome to S4G Server" @register="show_register"></login-box>
    </div>
    <modal title="Create Account" :show.sync="register_show" @cancel="cancel_register">
        <register-box @register="doRegister(arguments[0],arguments[1], arguments[2])"></register-box>
    </modal>
    </div>
</template>

<script>
    import AppHeader from "./components/header.vue"
    import LoginBox from "./components/loginbox.vue"
    import Modal from "./components/modal.vue"
    import RegisterBox from "./components/registerbox.vue"
    export default {
        data(){
            return {
                tools:[],
                register_show:false
            }
        },
        methods: {
            do_register(){
                console.log('registering');
                this.register_show = false;
            },
            cancel_register(){
                this.register_show = false;
            },
            show_register(){
                this.register_show = true;
                $('.modal').modal('show');
            },
            doLogin(username, password){
                console.log(username);
                console.log(password);
                this.$http.post('/account/login', {username:username, password:password}).then(response => {
                    if( response.body.isSuccessful ){
                        window.location.href = '/dashboard'
                    }else{
                        $('.login-box').shake(5,10,100);
                    }
                }, response =>{
                    console.log(response.status);
                })
            },
            doRegister(username, password, email){
                console.log(username);
                console.log(password);
                this.$http.post('/account/register', {username:username, password:password, email:email}).then(response => {
                    if( response.body.isSuccessful ){
                        window.location.href = '/dashboard'
                    }else{
                        $('.register-box').shake(5,10,100);
                    }
                }, response =>{
                    console.log(response.status);
                })
            }
        },
        components:{
            AppHeader,
            LoginBox,
            Modal,
            RegisterBox
        }
    }
</script>