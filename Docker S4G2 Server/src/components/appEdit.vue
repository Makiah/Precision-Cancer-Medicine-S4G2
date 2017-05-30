<style scoped>
div#app-edit{
    width:90%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    flex-flow: column;
    justify-content: center;
    align-content: center
}
.msg-area{
    width:80%;
    margin: 0 auto;
}
.input-area{
    flex:4 1 0;
    width: 90%;
    margin: 20px auto;
    overflow: auto;
}
.btn-area{
    flex: 1 1 auto;
    min-height: 1.2em;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>

<template>
    <div id="app-edit">
        <div v-if="is_loading || is_updated" :class="['msg-area', 'ui', 'icon', 'message', {'negative':!is_success, 'positive':is_success}]" >
            <i v-if="is_loading" class="notched circle loading icon"></i>
            <i v-if="is_updated" :class="['icon', {'info': is_success, 'warning':!is_success, 'sign':!is_success}]"></i>
            <div class="content">
                <div class="header">
                    {{is_loading ? 'Just one second' : (is_success ? 'App Info Updated' : 'App Info Can not be updated')}}
                </div>
                <p v-if="!is_success">{{error}}</p>
            </div>
        </div>
        <div class="ui form input-area">
            <div :class="['field', {'error':app_info.name.length==0}]">
                <label>Name</label>
                <input type="text" v-model="app_info.name" placeholder="App Name">
            </div>
            <!--<div class="field">
                <label>Logo</label>
                <file-upload filetype="image/*"></file-upload>
            </div>-->
            <div class="field">
                <label>Stand Alone App? (Stand Alone App can launch without S4G context) </label>
                <div class="ui toggle checkbox">
                    <input type="checkbox" :checked="app_info.is_stand_alone" @click="onCheckClicked">
                    <label>{{app_type}}</label>
                </div>
            </div>
            <div v-if="!app_info.is_stand_alone" :class="['field', {'error':app_info.launch_uri.length==0}]">
                <label>Launch URI</label>
                <input v-model="app_info.launch_uri" type="text" placeholder="App Launch URI">
            </div>
            <div :class="['field', {'error':app_info.redirect_uri.length==0}]">
                <label>Redirect URI</label>
                <input v-model="app_info.redirect_uri" type="text" placeholder="App Redirect URI">
            </div>
            <div :class="['field', {'error':app_info.scopes.length==0}]">
                <label>Scope</label>
                <div class="ui horizontal list">
                    <div v-for="(scope, index) in app_info.scopes" class="item">
                        <div class="content">
                            <label class="ui teal label">{{scope}}  <i @click="removeScope(index)" class="delete icon"></i></label>
                        </div>
                    </div>
                </div>
                <autocomplete :items="scopes" @selected="add_scope(arguments[0])"></autocomplete>
            </div>
        </div>
        <div class="btn-area">
            <button @click="do_update" class="ui positive labeled icon button">
                <i class="save icon"></i>
                Save
            </button>
            <button class="ui labeled icon button">
                <i class="remove icon"></i>
                Cancel
            </button>
        </div>
    </div>
</template>

<script>
    import FileUpload from "./fileUoload.vue"
    import Autocomplete from "./autocomplete.vue"
    export default {
        data(){
            return {
                scopes:[],
                app_info:{
                    scopes:[],
                    name:'',
                    launch_uri:'',
                    redirect_uri:'',
                    is_stand_alone:true
                },
                is_loading:false,
                is_success:false,
                is_updated:false
            }
        },
        mounted(){
            this.$http.get('/app/scopes').then(response => {
                this.scopes = response.body;
            });
        },
        props:{
            clientid:{
                type: String,
                twoWay: true,
                default: ''
            }
        },
        watch:{
            clientid:function(value){
                this.$http.get('/app/appInfo?client_id=' + value).then(response => {
                    if( response.body.isSuccessful ){
                        console.log(response.body.app_info);
                        this.app_info = response.body.app_info;
                    }
                });
            }
        },
        computed:{
            app_type:function(){
               return this.app_info.is_stand_alone ? 'Stand Alone' : 'S4G Launch'
            }
        },
        components:{
            FileUpload,
            Autocomplete
        },
        methods:{
            update_app_info(client_id){
                this.$http.get('/app/appInfo?client_id=' + value).then(response => {
                    if( response.body.isSuccessful ){
                        console.log(response.body.app_info);
                        this.app_info = response.body.app_info;
                    }
                });
            },
            onCheckClicked:function(e){
                this.app_info.is_stand_alone = e.target.checked;
            },
            add_scope(scope){
                this.app_info.scopes.push(scope);
            },
            removeScope(index){
                this.app_info.scopes.splice(index, 1);
            },
            do_update(){
                this.is_updated = false;
                this.is_loading = true;
                this.is_success = false;
                var post_data = {
                    client_id:this.clientid,
                    app_info:this.app_info
                }
                console.log(post_data);
                this.$http.post('/app/update', post_data).then(response =>{
                    this.is_loading = false;
                    this.is_updated = true;
                    this.is_success = response.body.isSuccessful;
                    if( response.body.isSuccessful ){
                        update_app_info(this.clientid);
                    }
                });
            }
        }
    }
</script>