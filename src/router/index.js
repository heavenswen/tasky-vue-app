import { createRouter, createWebHashHistory } from 'vue-router';
import Todo from '../views/Todo.vue';

const routes = [
    {
        path: '/',
        name: 'Todo',
        component: Todo
    },
    {
        path: '/finished',
        name: 'Finished',
        component: () => import(/* webpackChunkName: "finished" */ '../views/Finished.vue')
    },
    {
        path: '/add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
    },
    {
        path: '/demo',
        name: 'Demo',
        component: () => import(/* webpackChunkName: "add" */ '../views/Demo.vue')
    },
    {
        path: '/book',
        name: 'book',
        component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
