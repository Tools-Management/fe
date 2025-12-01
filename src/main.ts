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

// Import PrimeVue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// Import PrimeVue theme and icons
import 'primeicons/primeicons.css'

const pinia = createPinia()
const app = createApp(App)

// Setup PrimeVue and ToastService
app.use(PrimeVue)
app.use(ToastService)

app.use(pinia)
app.use(VueApexCharts)

const authStore = useAuthStore()
await authStore.getMe()

app.use(router)

app.mount('#app')
