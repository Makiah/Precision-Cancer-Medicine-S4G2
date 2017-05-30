<style scoped>
.footer{
    flex:1 1 auto;
    width:100%;
    background-color: rgba(230, 230, 230, 0.8);
    border-top: 2px solid #ccc;
    border-radius: 2px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    padding: 30px;
}

.footer-row{
    flex: 1 1 auto;
    height: 90%;
    margin:10px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color:#000;
}

.footer-row .footer-row-title{
    flex:1 1 auto;
    font-size: 1.2em;
    font-weight: bold;
}

.footer-row .footer-item{
    flex:1 1 auto;
    font-size: 1em;
    margin-top: 5px;
}

.footer .footer-img{
    width:50px;
    margin: 10px auto;
}
</style>

<template>
    <div class="footer">
            <div v-for="item in footers" class="footer-row">
                <div class="footer-row-title">{{item.title}}</div>
                <div v-for="subitem in item.subs" class="footer-item">
                    <a v-if="is_link" href="{{subitem.link}}" class="plain-link">{{subitem.text}}</a>
                    <span v-else>{{subitem.text}}</span>
                </div>
            </div>
            <div v-if="hasImg" class="footer-row">
                <img src="../assets/logo_white_small.png" alt="" class="responsive-img footer-img">
            </div>
        </div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        mounted(){
            console.log(this.hasImg);
        },
        props:['footers', 'hasImg']
    }
</script>