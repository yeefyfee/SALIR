import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

const bus = new Vue()
Vue.prototype.$bus = bus

Vue.prototype.RequestURL = 'http://65e72656.r32.cpolar.top/'
Vue.prototype.ImgsURL = 'http://632c5e55.r32.cpolar.top/'
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