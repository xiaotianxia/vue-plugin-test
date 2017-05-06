import $ from 'jquery';

export default {
	install(Vue) {
		Vue.prototype.$validateForm = (selector) => {
            this.$form = $(selector);
            // this.$form.find('.validate')
            console.log(this.$form.find('.validate-item').length);
        }

        Vue.directive("validate", {
            bind () {
                console.log("bind"); 
            },

            update (el, binding, vnode) {
                console.log(el);
                console.log(binding);
                console.log(binding.value, binding.oldValue);
                console.log(vnode);
            },
        })
	}
}
