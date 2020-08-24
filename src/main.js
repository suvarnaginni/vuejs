import Vue from 'vue'
import App from './App.vue'
//import axios from "axios"
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Register from './components/Register.vue'
import GiftCardOrder from './components/GiftCardOrder.vue'
import ViewGiftCard from './components/ViewGiftCard.vue'
import Login from './components/Login.vue'
import MonthlyReport from './components/MonthlyReport.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

window.localStorage.clear()
//Vue.prototype.$http = axios
localStorage.UserRole='admin'

const giftroutes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/giftcardorder', component: GiftCardOrder },
  { path: '/viewgiftcard', component: ViewGiftCard },
  { path: '/monthlyreport', component: MonthlyReport}
]

const router = new VueRouter({
  routes: giftroutes,
  mode: 'history'
})


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
