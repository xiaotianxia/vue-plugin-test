<template>
    <div class="form">
        <input class="validate-item" type="text" data-errorTip="输入错误" v-model="msg">
        <button @click="onClick">点击</button>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },

    mounted () {
        this.$validateForm('.form')
    },

    methods: {
        onClick () {
            this.msg = 'test';
        }
    }

}
</script>

<style scoped>

</style>
