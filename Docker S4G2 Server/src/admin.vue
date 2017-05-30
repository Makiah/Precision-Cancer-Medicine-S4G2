<style scoped>
    div#admin{
        display: flex;
        display: -webkit-flex;
        display: flex;
        flex-flow: column;
        width: 100%;
        height: 100%;
    }
    div#container{
        width: 100%;
        flex: 1 1 0;
        /*display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;*/
        overflow: hidden;
    }
    div.content{
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div id="admin">
        <app-header title="S4G2 Server"></app-header>
        <div id="container">
        <div class="ui left demo vertical inverted sidebar labeled icon menu" id="adminbar">
            <a @click="change_content('AdminUser')" class="item">
                <i class="users icon"></i>
                Manage Users
            </a>
            <a @click="change_content('AdminApp')" class="item">
                <i class="grid layout icon"></i>
                Manage Apps
            </a>
            <a @click="change_content('Setting')" class="item">
                <i class="settings icon"></i>
                Server Settings
            </a>
            <!--<br/><br/><br/><br/>-->
            <a @click="back_home()" class="item home">
                <i class="home icon"></i>
                Home
            </a>
        </div>
        <div class="pusher content">
            <div class="ui black big launch right attached fixed button" @click="show_sidebar">
                <i class="content icon"></i>
                <span class="text">Menu </span> |
                <span class="text"> {{currentView}}</span>
            </div>
            <components v-bind:is="currentView"></components>
        </div> 
        </div>
    </div>
</template>

<script>
    import AdminApp from "./pages/admin_app.vue"
    import AdminUser from "./pages/admin_user.vue"
    import Setting from "./pages/admin_setting.vue"
    import AppHeader from "./components/header.vue"
    export default {
        data(){
            return {
                currentView:'Setting'
            }
        },
        methods:{
            show_sidebar:function(){
                $('#adminbar').sidebar('toggle');
                console.log(this.$root);
            },
            change_content:function(name){
                this.currentView = name;
            },
            back_home:function(){
                // npm install vue-router --save
                console.log("back home!!!");
                window.location.href="http://127.0.0.1:3000/"
            }
        },
        components:{
            AdminApp,
            AdminUser,
            Setting,
            AppHeader
        }
    }
</script>