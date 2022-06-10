import { createApp } from 'vue'
import App from './Main.vue'
import router from '../../router'
import store from '../../store'
import { Button } from 'ant-design-vue'
import fetch from '@/utils/fetch'
const app = createApp(App)
app.use(store).use(router).mount('#app')
app.use(Button)
app.config.globalProperties.$fetch = fetch
