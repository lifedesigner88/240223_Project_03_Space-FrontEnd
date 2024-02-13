import {createRouter, createWebHistory} from 'vue-router';
import PostList from "@/pages/post/PostList.vue";
import MySpace from "@/pages/space/MySpace.vue";
import TeamSpace from "@/pages/space/TeamSpace.vue";
import GroupSpace from "@/pages/space/GroupSpace.vue";
import KanbanPage from "@/pages/schedule/KanbanPage.vue";
import CalendarPage from "@/pages/schedule/CalendarPage.vue";
import MessagesPage from "@/pages/chat/MessagesPage.vue";

// Vue Router의 주요 설정 파일로, 라우트 정의 및 라우터 인스턴스를 생성하는 파일


// routes 애플리케이션의 라우트 정의를 담당, 경로에 대한 컴포넌트와 연결되는 경로와 컴포넌트 매핑
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

const mainRouter = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default mainRouter;
