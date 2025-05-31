const routes = [
  {
    path: '/',
    name: 'mobile.login',
    component: () => import('src/layouts/MobileLayout.vue'),
    redirect: 'login',
    children: [
      {
        path: '/projects',
        name: 'mobile.projects',
        component: () => import('components/ProjectList.vue')
      },
      {
        path: '/dashboard',
        name: 'mobile.dashboard',
        component: () => import('components/DashBoard.vue')
      },
      {
        path: '/plans',
        name: 'mobile.plans',
        component: () => import('src/components/AllProjectPlan.vue')
      },
      {
        path: '/detail/:projectId',
        name: 'project.details',
        component: () => import('components/ProjectDetail/IndexPage.vue'),
        children: [
          {
            path: '',
            name: 'project.details.default',
            component: () =>
              import('components/ProjectDetail/ProjectDetailDefault.vue')
          },
          {
            path: '/detail/:projectId/todo',
            name: 'project.details.todo',
            component: () => import('components/ProjectDetail/ProjectTodo.vue')
          },
          {
            path: '/detail/:projectId/files',
            name: 'project.details.files',
            component: () => import('components/ProjectDetail/ProjectFiles.vue')
          },
          {
            path: '/detail/:projectId/chat',
            name: 'project.details.chat',
            component: () => import('components/ProjectDetail/ProjectChat/IndexComponent.vue'),
            children: [
              {
                path: '',
                name: 'project.details.chat.default',
                component: () => import('components/ProjectDetail/ProjectChat/ProjectChat.vue')
              },
              {
                path: '/detail/:projectId/chat/:recipientUID',
                name: 'project.details.chat.detail',
                component: () => import('components/ProjectDetail/ProjectChat/ProjectChatDetails.vue')
              }
            ]
          },
          {
            path: '/detail/:projectId/planning',
            name: 'project.details.planning',
            component: () => import('components/ProjectDetail/ProjectPlan.vue')
          },
          {
            path: '/detail/:projectId/more',
            name: 'project.details.more',
            component: () => import('components/ProjectDetail/ProjectMore.vue')
          },
          {
            path: '/detail/:projectId/agreement',
            name: 'project.details.agreement',
            component: () =>
              import('components/ProjectDetail/ProjectAgreement.vue')
          },
          {
            path: '/detail/:projectId/todo/create',
            name: 'project.details.todo.create',
            component: () =>
              import('src/components/ProjectDetail/ProjectTodoCreate.vue')
          },
          {
            path: '/detail/:projectId/todo/:todoId/update',
            name: 'project.details.todo.update',
            component: () =>
              import('src/components/ProjectDetail/ProjectTodoUpdate.vue')
          }
        ]
      },
      {
        path: '/new-project',
        name: 'mobile.new.project',
        component: () => import('components/NewProject.vue')
      },
      {
        path: '/new-member',
        name: 'mobile.new-member',
        component: () => import('components/AddMember.vue')
      },
      {
        path: '/send-invite',
        name: 'mobile.send-invite',
        component: () => import('components/SendInvite.vue')
      },
      {
        path: '/login-register',
        name: 'mobile.login-register',
        component: () => import('src/components/userRegistration.vue')
      },
      {
        path: '/login',
        name: 'mobile.userlogin',
        component: () => import('src/components/userLogin.vue')
      },
      {
        path: '/profile/:uid',
        name: 'mobile.my-profile',
        component: () => import('components/User/MyProfile.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('src/layouts/AdminPortalLayout.vue'),
    redirect: 'admin-login',
    children: [
      {
        path: '/admin-login',
        name: 'Admin Login',
        component: () => import('src/components/Admin/AdminLogin.vue')
      },
      {
        path: '/admin-portal',
        name: 'Dashboard',
        component: () => import('src/components/Admin/IndexPage.vue')
      },
      {
        path: '/manage-sow',
        component: () => import('src/components/Admin/SowComponents/IndexPage.vue'),
        children: [
          {
            path: '',
            name: 'Scope of Works',
            component: () => import('src/components/Admin/SowComponents/ListPage.vue')
          },
          {
            path: '/manage-sow/create',
            name: 'Scope of Works - Create',
            component: () => import('src/components/Admin/SowComponents/CreatePage.vue')
          },
          {
            path: '/manage-sow/:templateId/detail',
            name: 'Scope of Works - Detail',
            component: () => import('src/components/Admin/SowComponents/DetailPage.vue')
          }
        ]
      },
      {
        path: '/manage-projects',
        name: 'Projects',
        component: () => import('src/components/Admin/ManageProject.vue')
      },
      {
        path: '/manage-accounts',
        name: 'Accounts',
        component: () => import('src/components/Admin/ManageAccount.vue')
      },
      {
        path: '/manage-invites',
        name: 'Invites',
        component: () => import('src/components/Admin/ManageInvites.vue')
      },
      {
        path: '/whats-new',
        name: 'Trends',
        component: () => import('src/components/Admin/WhatsNew.vue')
      },
      {
        path: '/manage-reports',
        name: 'Reports',
        component: () => import('src/components/Admin/ReportsView.vue')
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
