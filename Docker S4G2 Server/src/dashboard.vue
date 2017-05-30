<style scoped>
    div#dashboard{
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
    <div id="dashboard">
    <app-header title="S4G2 Server" v-bind:tools="tools"></app-header>
    <div id="container">
        <div class="ui left demo vertical inverted sidebar labeled icon menu" id="dashbar">
            <a @click="change_content('MangeApp')" class="item">
                <i class="edit icon"></i>
                Manage Apps
            </a>
            <a @click="change_content('NewApp')" class="item">
                <i class="add square icon"></i>
                New App
            </a>
            <a @click="change_content('Upload')" class="item">
                <i class="upload icon"></i>
                Upload Data
            </a>
            <a href="/account/logout" class="item">
                <i class="power icon"></i>
                Logout
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
    import AppHeader from "./components/header.vue"
    import MangeApp from "./pages/manage_app.vue"
    import NewApp from "./pages/create_ap.vue"
    import Upload from "./pages/upload.vue"
    export default {
        data(){
            return {
                currentView:'NewApp',
            }
        },
        methods:{
            show_sidebar:function(){
                $('#dashbar').sidebar('toggle');
                console.log(this.$root);
            },
            change_content:function(name){
                this.currentView = name;
            }
        },
        components:{
            AppHeader,
            MangeApp,
            NewApp,
            Upload
        }
    }
</script>