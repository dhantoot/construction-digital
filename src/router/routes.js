const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'login',
    children: [
      {
        path: '/projects',
        component: () => import('components/ProjectList.vue')
      },
      {
        path: '/dashboard',
        component: () => import('components/DashBoard.vue')
      },
      {
        path: '/plans',
        component: () => import('components/ProjectPlan.vue')
      },
      {
        path: '/detail',
        component: () => import('components/ProjectDetail/IndexPage.vue'),
        // redirect: 'todo',
        children: [
          {
            path: '',
            component: () => import('components/ProjectDetail/ProjectDetailDefault.vue')
          },
          {
            path: '/todo',
            component: () => import('components/ProjectDetail/ProjectTodo.vue')
          },
          {
            path: '/files',
            component: () => import('components/ProjectDetail/ProjectFiles.vue')
          },
          {
            path: '/chat',
            component: () => import('components/ProjectDetail/ProjectChat.vue')
          },
          {
            path: '/planning',
            component: () => import('components/ProjectDetail/ProjectPlan.vue')
          },
          {
            path: '/more',
            component: () => import('components/ProjectDetail/ProjectMore.vue')
          },
          {
            path: '/agreement',
            component: () => import('components/ProjectDetail/ProjectAgreement.vue')
          },
          {
            path: '/createtodo',
            component: () => import('components/ProjectDetail/ProjectCreateTodo.vue')
          }
        ]
      },
      {
        path: '/new-project',
        component: () => import('components/NewProject.vue')
      },
      {
        path: '/new-member',
        component: () => import('components/AddMember.vue')
      },
      {
        path: '/send-invite',
        component: () => import('components/SendInvite.vue')
      },
      {
        path: '/login-register',
        component: () => import('components/loginRegister.vue')
      },
      {
        path: '/login',
        component: () => import('src/components/userLogin.vue')
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
