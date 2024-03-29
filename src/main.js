import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// import './assets/main.css'

const app = createApp(App)

app.use(bootstrap);
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon) 
app.mount('#app')
