<template>
    <div class="form">
        <div class="form-item">
            <span class="from-key">姓名：</span>
            <input class="validate-item validate-item-name" type="text" :value="name">
            <span class="validate-tip"></span>
        </div>
        <div class="form-item">
            <span class="from-key">电话：</span>
            <input class="validate-item validate-item-tel" type="text" :value="tel">
            <span class="validate-tip"></span>
        </div>
        <div class="form-item">
            <span class="from-key">国籍：</span>
            <select class="validate-item validate-item-nation" :value="nation">
                <option value=""></option>
                <option value="1">中国</option>
                <option value="2">美国</option>
                <option value="3">英国</option>
                <option value="4">法国</option>
            </select>
            <span class="validate-tip"></span>
        </div>
        <div class="form-item">
            <span class="from-key">性别：</span>
            <label><input class="validate-item validate-item-sex" type="radio" name="sex" value="0" v-model="sex"><span>男</span></label>
            <label><input class="validate-item validate-item-sex" type="radio" name="sex" value="1" v-model="sex"><span>女</span></label>
            <span class="validate-tip"></span>
        </div>
        <div class="form-item">
            <span class="from-key">爱好：</span>
            <label>
                <input class="validate-item validate-item-hobby" type="checkbox" value="reading" v-model="hobbies">
                <span>看书</span>
            </label>
            <label>
                <input class="validate-item validate-item-hobby" type="checkbox" value="run" v-model="hobbies">
                <span>跑步</span>
            </label>
            <label>
                <input class="validate-item validate-item-hobby" type="checkbox" value="swim" v-model="hobbies">
                <span>游泳</span>
            </label>
            <label>
                <input class="validate-item validate-item-hobby" type="checkbox" value="sleep" v-model="hobbies">
                <span>睡觉</span>
            </label>
            <span class="validate-tip"></span>
        </div>
        <div class="form-item">
            <button class="validate-item validate-item-submit">提交</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            name: '',
            tel: '',
            nation: '',
            sex: '0',
            hobbies: [],
            validateFormConfig: {
                items: [
                    {
                        name: 'name',
                        type: 'text',
                        validators: [{
                            type: 'required',
                            options: {
                                error: '姓名必填'
                            } 
                        }, {
                            type: 'length',
                            options: {
                                min: 4,
                                max: 10,
                                error: '长度在4~10个字符之间'
                            } 
                        }]
                    }, {
                        name: 'tel',
                        type: 'text',
                        validators: [{
                            type: 'required',
                            options: {
                                error: '手机号码必填'
                            }
                        }, {
                            type: 'regexp',
                            options: {
                                regexp: /^1[34578]\d{9}$/,
                                error: '手机号码格式不正确'
                            }
                        }]
                    }, {
                        name: 'nation',
                        type: 'select',
                        validators: [{
                            type: 'required',
                            options: {
                                error: '国籍必选'
                            }
                        }]
                    }, {
                        name: 'sex',
                        type: 'radio',
                        validators: [{
                            type: 'required',
                            options: {
                                error: '性别必选'
                            }
                        }]
                    }, {
                        name: 'hobby',
                        type: 'checkbox',
                        validators: [{
                            type: 'required',
                            options: {
                                error: '爱好必选'
                            }
                        }]
                    }
                ]
            }
        }
    },

    mounted () {
        this.$validateForm('.form', this.validateFormConfig);
    },

    methods: {
        onClick () {
            
        }
    }

}
</script>

<style scoped>
    .form {
        width: 400px;
        border: 1px solid #ccc;
        padding: 10px;
        margin: auto auto;
        font-size: 14px;
    }
    .form-item {
        line-height: 25px;
        margin: 10px 0;
    }
    .form-item span {
        display: inline-block;
        vertical-align: middle;
    }
    .from-key {
        display: inline-block;
        width: 70px;
    }
    .validate-item {
        width: 150px;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #aaa;
        vertical-align: middle;
    }
    select.validate-item {
        width: 172px;
        height: 27px;
    }
    .validate-item[type=radio],
    .validate-item[type=checkbox] {
        width: auto;
        height: auto;
    }
    .validate-tip {
        margin-left: 10px;
        font-size: 12px;
    }
    .validate-tip em {
        margin-right: 5px;
        font-style: normal;
    }
    .validate-tip-error {
        color: #f00;
    }
    .validate-tip-success {
        color: #0f0;
    }
</style>
