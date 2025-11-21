import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'

const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(VueApexCharts)

const authStore = useAuthStore()
await authStore.getMe()

app.use(router)

app.mount('#app')
