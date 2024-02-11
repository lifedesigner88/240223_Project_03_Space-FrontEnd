import { createApp } from 'vue'
import App from './App.vue'
import './css/normalize.css'
import './css/color.css';
import './css/style.css'

import VueRouter from './router/VueRouter'


createApp(App)
    .use(VueRouter)
    .mount('#app')
