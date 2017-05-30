<style scoped>
div#upload-data{
    width: 70%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
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
.msg-area{
    flex: 1 1 auto;
    width: 80%;
    margin: 0 auto;
    overflow: auto;
}
</style>

<template>
    <div id="upload-data">
        <div v-if="is_loading" class="msg-area ui icon message">
            <i class="notched circle loading icon"></i>
            <div class="content">
                <div class="header">
                Just one second
                </div>
                <p>Data Uploading</p>
            </div>
        </div>
        <div v-if="is_uploaded" :class="['ui', 'message', 'msg-area', {'positive':is_success, 'negative':!is_success}]">
            <i @click="close_msg" class="close icon"></i>
            <div class="header">
                Upload {{is_success ? 'Successed' : 'Failed'}}
            </div>
            <pre v-if="!is_success">{{upload_result}}</pre>
        </div>
        <div class="ui form input-area">
            <!--<div :class="['field']">
                <label>Data File(JSON)</label>
                <file-upload filetype="application/json"></file-upload>
            </div>-->
            <div :class="['field', {'error':jsonstr.length==0}]">
                <label>JSON Data</label>
                <textarea v-model="jsonstr" rows="10" placeholder="Or Input JSON Data here"></textarea>
            </div>
        </div>
        <div class="btn-area">
            <button @click="upload" class="ui positive labeled icon button">
                <i class="cloud upload icon"></i>
                Submit
            </button>
        </div>
        
    </div>
</template>

<script>
    import FileUpload from "../components/fileUoload.vue"
    export default {
        data(){
            return {
                jsonstr:'',
                upload_res_str: "",
                is_uploaded:false,
                is_success:false,
                is_loading: false
            }
        },
        computed:{
            upload_result:function(){
                var res = ''
                try{
                    res = JSON.stringify(JSON.parse(this.upload_res_str), null, 2);
                }catch(e){
                    res = ''
                }
                return res
            }
        },
        components:{
            FileUpload
        },
        methods:{
            close_msg(){
                this.is_uploaded = false;
            },
            upload(){
                this.is_loading = true;
                this.is_uploaded = false;
                this.is_success = false;
                var post_data = {
                    resource: null
                }
                try{
                    post_data.resource = JSON.parse(this.jsonstr);
                }
                catch(e){
                    this.is_uploaded = true;
                    this.is_success = false;
                    this.is_loading = false;
                    this.upload_res_str = JSON.stringify({
                        error: 'Invalid Resource'
                    });
                }
                if( post_data.resource ){
                    this.$http.post('/upload/data', post_data).then(response =>{
                        this.is_uploaded = true;
                        this.is_loading = false;
                        console.log(response.body);
                        this.is_success = response.body.isSuccessful;
                        if( !response.body.isSuccessful ){
                            this.upload_res_str = JSON.stringify(response.body.error);
                        }
                    });
                }
                
            }
        }
    }
</script>