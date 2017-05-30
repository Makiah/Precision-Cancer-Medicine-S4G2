<style scoped>
div#manage-app{
    width: 85%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    flex-flow: row;
    justify-content: center;
    align-content: center
}
div.app-list{
    flex: 1 0 0;
    height: 100%;
    width: 100%;
    overflow: auto;
}

div.app-detail{
    flex: 4 0 0;
    width:90%;
    margin:0 auto;
    height: 100%;
}

</style>

<template>
    <div id="manage-app">
        <div class="app-list">
            <div class="ui big divided selection aligned very relaxed list">
                <div class="item" v-for="app in apps" @click="app_chosen(app.client_id)">
                    <img class="ui avatar image" src="../assets/logo_black_small.png">
                    <div class="content">
                        <div class="header">{{app.name}}</div>
                        <div class="description">Author: {{app.author.username}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-detail">
            <app-edit :clientid="client_id" v-if="apps.length!=0"></app-edit>
        </div>
    </div>
</template>

<script>
    import AppEdit from "../components/appEdit.vue"
    export default {
        data(){
            return {
                apps:[],
                client_id:''
            }
        },
        mounted(){
            // get data
            this.$http.get('/account/apps').then(response => {
                console.log(response.body);
                this.apps = response.body;
            })
        },
        methods:{
            app_chosen(client_id){
                console.log(client_id);
                this.client_id = client_id;
            }
        },
        components:{
            AppEdit
        }
    }
</script>