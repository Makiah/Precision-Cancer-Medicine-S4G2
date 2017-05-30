<style scoped>
.login-box{
    width:60%;
    flex: 1 0 auto;
    display:flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.login-box .title-area{
    flex:1 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width:50%;
}

.login-box .title-area .title-img{
    width: 150px;
}

.login-box .btn-area{
    flex: 1 0 auto;
    width: 50%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
}

.login-box .btn-area .btn-login{
    flex: 1 0 auto;
    margin-right:10px;
}

.login-box .input-area{
    flex: 1 0 auto;
    width:40%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.login-box .input-area input.input-login{
    height:2.3em;
    width:100%;
    background-color: #eee;
    color:#000;
	box-shadow: none;
	font-size: 1.5em;
	border-radius: 0px;
	border-left: 0px;
	border-right: 0px;
	border-top: 0px;
	border-bottom: 0px;
    padding: 10px;
}

.login-box .input-area input.input-login-top{
    border-top:2px solid rgb(150, 150, 150);
    border-left:2px solid rgb(150, 150, 150);
    border-right:2px solid rgb(150, 150, 150);
    border-bottom: 1px solid rgb(150, 150, 150);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.login-box .input-area input.input-login-bottom{
    border-bottom:2px solid rgb(150, 150, 150);
    border-left:2px solid rgb(150, 150, 150);
    border-right:2px solid rgb(150, 150, 150);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.login-box .input-area input.input-login:focus{
    outline: none;
    border:1px solid blue;
}

.login-box .footer-area{
    width:70%;
    flex: 1 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: start;
    border-top: 1px solid rgba(170, 170, 170, 0.502);
    padding:5px;
}

.login-box .footer-area .footer-item{
    flex: 1 0 auto;
}
</style>

<template>
    <div class="login-box">
        <div class="title-area">
            <img src="../assets/logo_black_small.png" alt="" class="title-img ui image">
            <h2 class="title-text">{{title}}</h2>
        </div>
        <div class="input-area">
            <input v-model="username" type="text" class="input-login input-login-top">
            <input v-model="password" type="password" class="input-login input-login-bottom">
        </div>
        <div class="btn-area">
            <button @click="doLogin" class="ui green labeled icon button btn-login"><i class="sign in icon"></i>
            Sign in
            </button>
        </div>
        <div class="footer-area">
            <div class="footer-item">
                <span>New User? <a href="javascript:void()" v-on:click="show_register" class="plain-link">  Create Account<i class="add user icon"></i> </a></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:"",
                password:""
            }
        },
        methods:{
            show_register(){
                this.$emit('register');
            },
            doLogin(){
                this.$emit('login', this.username, this.password);
            }
        },
        props: {
            'title':{
                type:String
            }
        }
    }
</script>