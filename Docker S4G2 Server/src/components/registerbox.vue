<style scoped>
.register-box{
    width:80%;
    min-height: 100%;
    margin: 0 auto;
    flex: 1 0 auto;
    display:flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.register-box .register-item{
    width: 90%;
    flex: 1 0 auto;
    padding: 10px;
}
</style>

<template>
    <div class="register-box ui form">
        <div :class="['register-item', 'field', {'error':username.length==0}]">
            <label>Username </label>
            <input v-model="username" type="text" placeholder="Username">
        </div>
        <div class="register-item field">
            <label>Email </label>
            <input v-model="email" type="text" placeholder="Email">
        </div>
        <div :class="['register-item', 'field', {'error':password.length==0}]">
            <label>Password </label>
            <input v-model="password" type="password" placeholder="Password">
        </div>
        <div :class="['register-item', 'field', {'error':cpassword.length==0 || cpassword != password}]">
            <label>Confirm Password </label>
            <input v-model="cpassword" type="password" placeholder="Confirm Password">
        </div>
        <div class="register-item">
            <button @click="register" class="ui positive labeled icon button">
                <i class="checkmark icon"></i>
                Register
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:"",
                password:"",
                cpassword:"",
                email:""
            }
        },
        methods:{
            register(){
                if( this.username.length != 0 && this.password.length != 0 && this.cpassword == this.password){
                    this.$emit('register', this.username, this.password, this.email.length != 0 ? this.email : null);
                }else{
                    $('.register-box').shake(5,10,100);
                }
            }
        }
    }
</script>