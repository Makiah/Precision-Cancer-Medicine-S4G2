var Vue = require('../node_modules/vue/dist/vue.js');
var App = require('./app.vue');
var Dashboard = require('./dashboard.vue');
var VueResource = require('vue-resource');
var Admin = require('./admin.vue');
Vue.use(VueResource);
new Vue({
    el:'#maincontent',
    components:{
        app:App,
        dashboard:Dashboard,
        admin:Admin
    },
    mounted:function(){
        $('#dashbar').sidebar({context:$('#container')})
        .sidebar('setting', 'transition', 'push');
        $('#adminbar').sidebar({context:$('#container')})
        .sidebar('setting', 'transition', 'push');
    }
});