

const routes = [
  {
    path: '/',
    component: () => import('pages/main/HomePage.vue')
  }
  ,
  {
    path: '/MyPage',
    component: () => import('pages/main/MyPage.vue')
  }
  ,
  {
    path: '/MySpace',
    component: () => import('pages/space/MySpace.vue')
  }
  ,
  {
    path: '/TeamSpace',
    component: () => import('pages/space/TeamSpace.vue')
  }
  ,
  {
    path: '/GroupSpace',
    component: () => import('pages/space/GroupSpace.vue')
  }
  ,
  {
    path: '/Kanban',
    component: () => import('pages/schedule/KanbanPage.vue')
  }
  ,
  {
    path: '/Calendar',
    component: () => import('pages/schedule/CalendarPage.vue')
  }
  ,
  {
    path: '/Messages',
    component: () => import('pages/chat/MessagesPage.vue')
  }
  ,
  {
    path: '/Register',
    component: () => import('pages/main/RegisterPage.vue')
  }
]

export default routes
