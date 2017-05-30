<style scoped>

</style>

<template>
    <div>
    <div v-if="!is_chosen">
         <label for="file" class="ui icon button">
            <i class="file icon"></i>
        Choose File</label>
        <input id="file" accept="filetype" type="file" @change="onFileChange" style="display:none">
    </div>
    <div v-else>
        <p>{{this.file_info.filename}} | {{this.file_info.size}}</p>
        <button class="ui labeled icon button" @click="removeImage">
            <i class="remove icon"></i>
            Remove Image
        </button>
    </div>
    <div :class="messageClass">
        <i @click="remove_msg" class="close icon"></i>
        <div class="header">
            File Too Large
        </div>
        <p> Max Size: 2 MB
        </p>
    </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                is_chosen:false,
                file_obj:null,
                messageClass: "ui negative message hidden"
            }
        },
        props:['filetype'],
        computed:{
            file_info:function(){
                if( this.file_obj ) {
                    var filename = this.file_obj.name;
                    var size_in_bytes = this.file_obj.size;
                    var size_in_kb = size_in_bytes / 1024.0;
                    var size_in_mb = size_in_kb / 1024.0;
                    var size = size_in_mb > 1 ? size_in_mb.toFixed(2) + ' MB' :
                                size_in_kb.toFixed(2) + 'KB';
                    return {
                        filename:filename,
                        size:size
                    }
                }else {
                    return{
                        filename:'',
                        size:''
                    }
                }  
            }
        },
        methods:{
            onFileChange:function(e){
                var files = e.target.files || e.dataTransfer.files;
                if ( !files.length ){
                    return;
                }
                this.file_obj = files[0]
                console.log(this.file_obj)
                if( this.file_obj.size / 1024 / 1024 > 2 ){
                    this.messageClass = "ui negative message"
                }else{
                    this.is_chosen = true;
                    this.messageClass = "ui negative message hidden"
                }
            },
            removeImage: function (e) {
                this.file_obj = null;
                this.is_chosen = false;
            },
            remove_msg:function(){
                this.messageClass = "ui negative message hidden"
            }
        }
    }
</script>