/*
 * @Author: qiuwt
 * @Email: qiuwt@hxmec.com
 * @Date: 2022-06-10 13:36:10
 * @Description: 请求
 * @Route: /demo
 */
<template>
    <div>
        <a-button :loading='page.loading'
                  @click="fetchPage"> 点击发起请求</a-button>
    </div>
    <ul>
        <li v-for="item in page.data"
            :key="item.index">{{ item }}</li>
    </ul>
</template>
<script>
import { reactive, getCurrentInstance } from 'vue';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const page = reactive({
            loading: false,
            data: []
        });
        function fetchPage () {
            page.loading = true;
            proxy
                .$fetch({
                    url: '/api/list'
                })
                .then(res => {
                    page.loading = false;
                    page.data = res.data.records;
                });
        }
        return {
            page,
            fetchPage
        };
    }
};
</script>
