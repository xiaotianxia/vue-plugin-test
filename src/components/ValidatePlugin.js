import $ from 'jquery';
//*TODO checkbox
/* ajax
** 提交
** 显示后台错误信息
** 。。。。
*/
let validatePlugin = {};
let EVENT_CONFIG = {
    text: ['input', 'blur'],
    select: ['change'],
    radio: ['change'],
    checkbox: ['change']
};
validatePlugin.install = function (Vue) {
    Vue.prototype.$validateForm = function (formSelector, options) {
        let $form = $(formSelector),
            items = options.items;
        for(let i = 0, len = items.length; i < len; i ++) {
            bindEvent(items[i]);
        }

        function bindEvent (item) {
            let type = EVENT_CONFIG[item.type];
            for(let i = 0, len = type.length; i < len; i ++) {
                let $item = $form.find('.validate-item-' + item.name);
                $item.on(type[i], function() {
                    validateItem($(this), item.validators);
                })
            }
        }

        function validateItem ($item, validators) {
            for(let i = 0, len = validators.length; i < len; i ++) {
                let validator = validators[i],
                    type = validator.type;
                if(type === 'required') {
                    if(!validateRrquired($item, validator)) {
                        return;
                    }
                } else if(type === 'length') {
                    if(!validateLength($item, validator)) {
                        return;
                    }
                } else if(type === 'regexp') {
                    if(!validateRegExp($item, validator)) {
                        return;
                    }
                }
            }
        }

        function validateRrquired ($item, validator) {
            let inputType = $item[0].type;
            if(inputType === 'checkbox') {
                if($item[0].checked) {
                    removeValidateTips($item);
                    return true;
                } else {
                    console.log(11);
                    showValidateTips($item, validator);
                    return false;
                }
            }
            let value = $.trim($item.val());
            if(value === '') {
                console.log('required error');
                showValidateTips($item, validator);
                return false;
            } else {
                removeValidateTips($item);
                return true;
            }
        }

        function validateLength ($item, validator) {
            console.log(this);
            let value = $.trim($item.val()),
                length = value.length,
                options = validator.options;
            if(length > options.max || length < options.min) {
                console.log('length error');
                showValidateTips($item, validator);
                return false;
            } else {
                removeValidateTips($item);
                return true;
            }
        }

        function validateRegExp ($item, validator) {
            let value = $.trim($item.val()),
                options = validator.options;
            if(!options.regexp.test(value)) {
                console.log('regexp error');
                showValidateTips($item, validator);
                return false;
            } else {
                removeValidateTips($item);
                return true;
            }
        }

        function showValidateTips ($item, validator) {
            let $tip = $item.parents('.form-item').find('.validate-tip'),
                tip = '<em class="icon-error" style="margin-right: 5px;font-style: normal;">❌</em>';
            switch(validator.type) {
                case 'required':
                case 'length':
                case 'regexp':
                    tip += validator.options.error;
                    break;
                default: 
                    console.log(33);
            }

            $tip.removeClass('validate-tip-error validate-tip-success')
                .addClass('validate-tip-error')
                .html(tip).show();
        }

        function removeValidateTips ($item) {
            let $tip = $item.parents('.form-item').find('.validate-tip');
            $tip.removeClass('validate-tip-error validate-tip-success')
                .addClass('validate-tip-success').html('<em class="icon-success" style="margin-right: 5px;font-style: normal;">✅</em>').show();
        }
    }
}

//支持 CommonJS
if (typeof exports == "object") {
    module.exports = validatePlugin
// 支持 AMD
} else if (typeof define == "function" && define.amd) {
    define([], function(){ return validatePlugin })
// Vue 是全局变量时，自动调用 Vue.use()
} else if (typeof window !== 'undefined' && window.Vue) {
    window.VueTouch = validatePlugin
    Vue.use(validatePlugin)
}

export default validatePlugin