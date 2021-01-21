import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faChevronDown, faChevronUp, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import config from './store/index'

import '@/assets/todo.css'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Vuex)

// Add font awesome icon
library.add(faAngleDown)
library.add(faAngleUp)
library.add(faChevronDown)
library.add(faChevronUp)
library.add(faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const store = new Vuex.Store(config)

new Vue({
    render: h => h(App),
    store
}).$mount('#app')