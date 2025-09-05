import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

const bus = new Vue()
Vue.prototype.$bus = bus

Vue.prototype.RequestURL = 'http://sar.free.idcfengye.com/'
Vue.prototype.ImgsURL = 'http://33100903.nat123.top/'
Vue.prototype.Authorization = 'Basic eWVlOnllZTEyMzQ1Ng=='
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif