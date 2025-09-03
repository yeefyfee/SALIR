import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

const bus = new Vue()
Vue.prototype.$bus = bus

Vue.prototype.RequestURL = 'http://salir.nat123.top:8099/'
Vue.prototype.ImgsURL = 'http://imgs.nat123.top:39160/'
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