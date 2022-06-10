/*
 * @Author: qiuwt
 * @Email: 423822728@qq.com
 * @Date: 2022-06-10 17:00:44
 * @Description: 引入按需引入
 * @Route: Route
 */
import { Button } from 'ant-design-vue';
import fetch from '@/utils/fetch.js';

const init = app => {
    app.use(Button)
    app.config.globalProperties.$fetch = fetch;
}

export default init
