import '@/assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import primeVuePreset from '@/config/primevue.preset'
import { createPinia } from 'pinia'

// Import PrimeVue
import PrimeVue from 'primevue/config'

// Import PrimeVue theme and icons

const pinia = createPinia()
const app = createApp(App)

app.use(primeVuePreset).use(PrimeVue).use(pinia).use(router).mount('#app')
