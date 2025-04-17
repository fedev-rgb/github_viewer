import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import './style.css'
import 'vant/lib/index.css';
import App from './App.vue'

import { Card } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(Card).use(Button).use(Toast).mount('#app')
