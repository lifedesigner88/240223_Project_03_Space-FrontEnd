import {createRouter, createWebHistory} from 'vue-router';
import PostList from "@/components/PostList.vue";

const routes = [
    {
        path: '/',               // url 경로 지정
        name: 'HOME',           // 이 라우터 이름
        component: PostList
    },
];

const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default vueRouter;
