import { createApp } from 'vue';
import App from './Remind.vue';
import UiInit from '@/componets/'

const app = createApp(App)
app.mount('#app');
UiInit(app)
