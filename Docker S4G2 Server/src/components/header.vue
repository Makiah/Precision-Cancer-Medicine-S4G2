<style scoped>
    .header-bar{
        flex: 0 1 50px;
        background-color: rgba(0, 0,0);
        padding:10px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row;
        color: #fff;
    }
    .header-bar .head-title{
        text-align: left;
        flex:1 1 auto;
    }
    .header-bar .head-title .head-title-text {
        text-align: left;
        font-size: 1.5em;
        font-weight: bold;
        line-height: 1.4em;
        color: inherit;
    }

    .header-bar .head-tools {
        flex:0 1 auto;
    }
    
</style>

<template>
    <div class="header-bar">
        <div class="head-title">
            <span class="head-title-text">{{title}}</span>
        </div>
        <div class="head-tools">
            <a v-for="item in tools" href="javascript:void()" v-on:click="item.handle_click" class="btn-plain">{{item.text}} </a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        props: ['title', 'tools']
    }
</script>

