import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";

// Import Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Ensure you import the Vuetify styles
import { VApp, VBtn, VCard, VToolbar } from 'vuetify/components' // Importing Vuetify components as needed
import { aliases, mdi } from 'vuetify/iconsets/mdi' // For Material Design Icons
// main.js
import '@mdi/font/css/materialdesignicons.min.css';


// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    VApp,
    VBtn,
    VCard,
    VToolbar
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

const app = createApp(App)

// Optional: configure toast options
const toastOptions = {
  position: "top-right", // You can customize this
  timeout: 3000, // Toast will auto-dismiss after 3 seconds
};

app.use(Toast, toastOptions)
app.use(router)

// Use Vuetify in the app
app.use(vuetify)

app.mount('#app')
