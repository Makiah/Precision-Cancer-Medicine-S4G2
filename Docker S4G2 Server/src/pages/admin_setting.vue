<style scoped>
div#setting{
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
</style>
<template>
<div id="setting">
    <div class="ui form input-area">
        <div class="field">
            <label>Open Server? (Open Server doesn't have authorization) </label>
            <div class="ui toggle checkbox">
                <input type="checkbox" :checked="is_open" @click="onCheckClicked">
                <label>{{is_open ? 'Open' : 'Constrain'}}</label>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return {
            is_open: false
        }
    },
    methods:{
        onCheckClicked:function(e){
            this.is_open = e.target.checked;
        }
    }
}
</script>