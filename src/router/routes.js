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
        path: '/detail/:projectId',
        component: () => import('components/ProjectDetail/IndexPage.vue'),
        children: [
          {
            path: '',
            component: () =>
              import('components/ProjectDetail/ProjectDetailDefault.vue')
          },
          {
            path: '/detail/:projectId/todo',
            component: () => import('components/ProjectDetail/ProjectTodo.vue')
          },
          {
            path: '/detail/:projectId/files',
            component: () => import('components/ProjectDetail/ProjectFiles.vue')
          },
          {
            path: '/detail/:projectId/chat',
            component: () => import('components/ProjectDetail/ProjectChat.vue')
          },
          {
            path: '/detail/:projectId/planning',
            component: () => import('components/ProjectDetail/ProjectPlan.vue')
          },
          {
            path: '/detail/:projectId/more',
            component: () => import('components/ProjectDetail/ProjectMore.vue')
          },
          {
            path: '/detail/:projectId/agreement',
            component: () =>
              import('components/ProjectDetail/ProjectAgreement.vue')
          },
          {
            path: '/detail/:projectId/todo/create',
            component: () =>
              import('src/components/ProjectDetail/ProjectTodoCreate.vue')
          },
          {
            path: '/detail/:projectId/todo/:todoId/update',
            component: () =>
              import('src/components/ProjectDetail/ProjectTodoUpdate.vue')
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
        component: () => import('src/components/userRegistration.vue')
      },
      {
        path: '/login',
        component: () => import('src/components/userLogin.vue')
      },
      {
        path: '/profile/:uid',
        component: () => import('components/User/MyProfile.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    redirect: 'admin-portal',
    children: [
      {
        path: '/admin-portal',
        component: () => import('src/components/Admin/IndexPage.vue')
      },
      {
        path: '/manage-sow',
        component: () => import('src/components/Admin/SowComponents/IndexPage.vue'),
        children: [
          {
            path: '',
            component: () => import('src/components/Admin/SowComponents/ListPage.vue')
          },
          {
            path: '/manage-sow/create',
            component: () => import('src/components/Admin/SowComponents/CreatePage.vue')
          }
        ]
      },
      {
        path: '/manage-projects',
        component: () => import('src/components/Admin/ManageProject.vue')
      },
      {
        path: '/manage-accounts',
        component: () => import('src/components/Admin/ManageAccount.vue')
      },
      {
        path: '/manage-invites',
        component: () => import('src/components/Admin/ManageInvites.vue')
      },
      {
        path: '/whats-new',
        component: () => import('src/components/Admin/WhatsNew.vue')
      }
    ]
  },
  {
    path: '/accept-invite/:projectId',
    component: () => import('layouts/PublicLayout.vue'),
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('src/components/Public/AcceptInvitePage.vue')
      }
    ]
  },
  {
    path: '/reject-invite/:projectId',
    component: () => import('layouts/PublicLayout.vue'),
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('src/components/Public/RejectInvitePage.vue')
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
