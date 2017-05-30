<style scoped>

</style>

<template>
    <div>
        <div class="ui input">
            <input type="text" v-model="keyword" @keydown.enter = "enter"
                @keydown.down = "down"
                @keydown.up = "up"
                @input = "change">
        </div>
        <div :class="['ui', 'middle', 'divided', 'aligned', 'selection', 'list', {'hidden': !isDropdown}]" >
            <div v-for="(element,index) in matches" @click="suggestionClick(index)" :class="['item', { 'active': isActive(index) }]">
            <div class="content">
                <div class="header">{{element}}</div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isDropdown:false,
                current: 0,
                keyword:'',
                selection:''
            }
        },
        computed:{
            matches() {
                return this.items.filter((str) => {
                    return str.indexOf(this.keyword) >= 0;
                });
            },
        },
        methods:{
            enter(){
                console.log(this);
                this.selection = this.matches[this.current];
                this.isDropdown = false;
                this.$emit('selected', this.selection);
            },
            up() {
                if(this.current > 0)
                    this.current--;
            },
            down() {
                if(this.current < this.matches.length - 1)
                    this.current++;
            },
            isActive(index) {
                console.log(this.current);
                return index === this.current;
            },
            change() {
                if ( !this.isDropdown ) {
                    this.isDropdown = true;
                    this.current = 0;
                }
            },
            suggestionClick(index) {
                console.log(index);
                this.selection = this.matches[index];
                console.log(this.selection)
                this.isDropdown = false;
                this.$emit('selected', this.selection);
            },
        },
        props:{
            items:{
                type:Array,
                required:true,
                twoWay:false
            }
        }
    }
</script>