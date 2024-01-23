const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'projectList',
        component: () => import('components/ProjectList.vue')
      },
      {
        path: 'projectdetail',
        component: () => import('components/ProjectDetail/IndexPage.vue'),
        // redirect: 'todo',
        children: [
          {
            path: 'todo',
            component: () => import('components/ProjectDetail/Todo.vue')
          },
          {
            path: 'files',
            component: () => import('components/ProjectDetail/Files.vue')
          },
          {
            path: 'planner',
            component: () => import('components/ProjectDetail/Planner.vue')
          }
        ]
      },
      { path: 'dashboard', component: () => import('components/DashBoard.vue') },
      { path: 'projectplan', component: () => import('components/ProjectPlan.vue') }
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
