import Vue from 'vue'
import App from './App'
// 引入封装的请求库并挂载在Vue原型上，使用时:this.$H
// Vue.prototype.$appName = 'My App'，这样各个Vue实例就可以通过$appName的方式应用
// 这样做不会污染全局作用域
import $H from './common/request.js'
Vue.prototype.$H = $H
// 引入Vuex并挂载在Vue原型上
import store from './store/index.js'
Vue.prototype.$store = store

// 权限验证，必须登陆后才能进入页面
Vue.prototype.authJump = (options) => {
	if (!store.state.token) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login-change/login-change'
		});
	}
	uni.navigateTo(options);
} 

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
