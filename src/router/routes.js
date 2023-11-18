const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/projects', component: () => import('components/ProjectList.vue') },
      { path: '/dashboard', component: () => import('components/DashBoard.vue') },
      { path: '/projectplan', component: () => import('components/ProjectPlan.vue') }
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
