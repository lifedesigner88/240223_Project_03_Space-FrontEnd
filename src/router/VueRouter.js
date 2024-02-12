import {createRouter, createWebHistory} from 'vue-router';
import PostList from "@/components/PostList.vue";
import MySpace from "@/components/space/MySpace.vue";
import TeamSpace from "@/components/space/TeamSpace.vue";
import GroupSpace from "@/components/space/GroupSpace.vue";
import KanbanPage from "@/components/page/KanbanPage.vue";
import CalendarPage from "@/components/page/CalendarPage.vue";
import MessagesPage from "@/components/page/MessagesPage.vue";

const routes = [
    {
        path: '/',               // url 경로 지정
        name: 'HOME',           // 이 라우터 이름
        component: PostList
    },

    {
        path: '/my_space',               // url 경로 지정
        name: 'MySpace',           // 이 라우터 이름
        component: MySpace
    },
    {
        path: '/team_space',               // url 경로 지정
        name: 'TeamSpace',           // 이 라우터 이름
        component: TeamSpace
    },

    {
        path: '/group_space',               // url 경로 지정
        name: 'GroupSpace',           // 이 라우터 이름
        component: GroupSpace
    },

    {
        path: '/kanban',               // url 경로 지정
        name: 'KanbanPage',           // 이 라우터 이름
        component: KanbanPage
    },

    {
        path: '/calendar',               // url 경로 지정
        name: 'CalendarPage',           // 이 라우터 이름
        component: CalendarPage
    },

    {
        path: '/message',               // url 경로 지정
        name: 'MessagesPage',           // 이 라우터 이름
        component: MessagesPage
    },




];

const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default vueRouter;
