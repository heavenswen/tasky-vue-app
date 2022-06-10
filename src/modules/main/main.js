import { createApp } from 'vue';
import App from './Main.vue';
import router from '../../router';
import store from '../../store';
import UiInit from '@/componets/'
const app = createApp(App);
app.use(store).use(router).mount('#app');
UiInit(app)
