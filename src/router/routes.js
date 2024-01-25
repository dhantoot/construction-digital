const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'projectList',
    children: [
      { path: 'projectList', component: () => import('components/ProjectList.vue') },
      { path: 'dashboard', component: () => import('components/DashBoard.vue') },
      { path: 'projectplan', component: () => import('components/ProjectPlan.vue') },
      {
        path: 'projectdetails',
        component: () => import('components/ProjectDetail/IndexPage.vue'),
        redirect: 'todo',
        children: [
          {
            path: 'projectdetails/todo',
            component: () => import('components/ProjectDetail/ProjectTodo.vue')
          },
          {
            path: 'files',
            component: () => import('components/ProjectDetail/ProjectFiles.vue')
          },
          {
            path: 'chat',
            component: () => import('components/ProjectDetail/ProjectChat.vue')
          },
          {
            path: 'plans',
            component: () => import('components/ProjectDetail/ProjectPlan.vue')
          },
          {
            path: 'more',
            component: () => import('components/ProjectDetail/ProjectMore.vue')
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
