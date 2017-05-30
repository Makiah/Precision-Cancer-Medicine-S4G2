<style scoped>
div#app-create{
    width: 70%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center
}
.msg-area{

    width:80%;
    margin: 10px auto;
}
.input-area{
    flex:4 1 0;
    width: 80%;
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
    <div id="app-create">
        <div v-if="is_loading && !is_created" class="msg-area ui icon message">
            <i class="notched circle loading icon"></i>
            <div class="content">
                <div class="header">
                Just one second
                </div>
                <p>App Creating</p>
            </div>
        </div>
        <div v-if="!is_loading && is_created" class="msg-area ui positive icon message">
            <i class="info circle icon"></i>
            <div class="content">
                <div class="header">
                You app is created.
                </div>
                <p>Client-id: {{client_id}}</p>
            </div>
        </div>
        <div v-if="is_error" class="msg-area ui negative icon message">
            <i class="warning sign icon"></i>
            <div class="content">
                <div class="header">
                    {{error_msg}}
                </div>
            </div>
        </div>
        <div class="ui form input-area">
            <div :class="['field', {'error':app_name.length==0}]">
                <label>Name</label>
                <input type="text" v-model="app_name" placeholder="App Name">
            </div>
            <!--<div class="field">
                <label>Logo</label>
                <file-upload filetype="image/*"></file-upload>
            </div>-->
            <div class="field">
                <label>Stand Alone App? (Stand Alone App can launch without S4G context) </label>
                <div class="ui toggle checkbox">
                    <input disabled="disabled" type="checkbox" :checked="isStandAlone" @click="onCheckClicked">
                    <label>{{app_type}}</label>
                </div>
            </div>
            <div v-if="!isStandAlone" :class="['field', {'error':app_launch.length==0}]">
                <label>Launch URI</label>
                <input v-model="app_launch" type="text" placeholder="App Launch URI">
            </div>
            <div :class="['field', {'error':app_redirect.length==0}]">
                <label>Redirect URI</label>
                <input v-model="app_redirect" type="text" placeholder="App Redirect URI">
            </div>
            <div :class="['field', {'error':selected_scopes.length==0}]">
                <label>Scope</label>
                <div class="ui horizontal list">
                    <div v-for="(scope, index) in selected_scopes" class="item">
                        <div class="content">
                            <label class="ui teal label">{{scope}}  <i @click="removeScope(index)" class="delete icon"></i></label>
                        </div>
                    </div>
                </div>
                <autocomplete :items="scopes" @selected="add_scope(arguments[0])"></autocomplete>
            </div>
        </div>
        <div class="btn-area">
            <button @click="create_app" class="ui positive labeled icon button">
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
    import FileUpload from "../components/fileUoload.vue"
    import Autocomplete from "../components/autocomplete.vue"
    export default {
        data(){
            return {
                isStandAlone:true,
                scopes:[],
                selected_scopes: [],
                app_name:'',
                app_launch:'',
                app_redirect:'',
                is_loading:false,
                is_created:false,
                client_id:'',
                is_error:false,
                error_msg:'Failed'
            }
        },
        computed:{
            app_type:function(){
               return this.isStandAlone ? 'Stand Alone' : 'S4G Launch'
            }
        },
        mounted(){
            this.$http.get('/app/scopes').then(response => {
                this.scopes = response.body;
            });
        },
        components:{
            FileUpload,
            Autocomplete
        },
        methods:{
            onCheckClicked:function(e){
                this.isStandAlone = e.target.checked;
            },
            add_scope(scope){
                this.selected_scopes.push(scope);
            },
            removeScope(index){
                this.selected_scopes.splice(index, 1);
            },
            create_app(){
                this.is_created = false;
                this.is_error = false;
                this.is_loading = true;
                var post_data = {
                    name:this.app_name,
                    scopes:this.selected_scopes,
                    is_stand_alone:this.isStandAlone,
                    redirect_uri:this.app_redirect,
                    launch_uri:this.app_launch,
                    is_patient_required:false
                }
                console.log(post_data);
                this.$http.post('/app/register', post_data).then(response =>{
                    this.is_loading = false;
                    console.log(response.body);
                    if( response.body.isSuccessful ){
                        this.is_created = true;
                        this.client_id = response.body.client_id;
                    }else{
                        this.is_created = false;
                        this.is_error = true;
                        this.error_msg = 'App Create failed';
                    }
                });
            }
        }
    }
</script>