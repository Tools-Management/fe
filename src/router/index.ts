// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/components/layout/Admin.vue'
import UserLayout from '@/components/layout/UserLayout.vue'
import { useAuthStore } from '@/store/auth'
import { USER_ROLES } from '@/constants'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // ====================== ADMIN ROUTES ======================
    {
      path: '/administrators',
      component: Admin,
      children: [
        {
          path: '',
          name: 'Ecommerce',
          component: () => import('@/views/Ecommerce.vue'),
          meta: {
            title: 'eCommerce Dashboard',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN, USER_ROLES.ROLE_USER],
          },
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('@/views/Others/UserProfile.vue'),
          meta: { title: 'Profile', requiresAuth: true, roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN, USER_ROLES.ROLE_USER] },
        },
        {
          path: '/tools',
          name: 'Tools',
          component: () => import('@/views/Tools/Tool.vue'),
          meta: { title: 'Tools', requiresAuth: true, roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN, USER_ROLES.ROLE_USER] },
        },
        {
          path: 'keys',
          name: 'KeyManagement',
          component: () => import('@/views/Keys/KeyManagement.vue'),
          meta: {
            title: 'Key Management',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN],
          },
        },
        {
          path: 'tools-management',
          name: 'ToolsManagement',
          component: () => import('@/views/Tools/ToolsManagement.vue'),
          meta: {
            title: 'Tools Management',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN],
          },
        },
        {
          path: 'tickets',
          name: 'TicketManagement',
          component: () => import('@/views/Tickets/TicketManagement.vue'),
          meta: {
            title: 'Ticket Management',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN],
          },
        },
        {
          path: 'permissions',
          name: 'PermissionManagement',
          component: () => import('@/views/Users/PermissionManagement.vue'),
          meta: { requiresAuth: true, roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN] },
        },
        {
          path: 'users',
          name: 'UserManagement',
          component: () => import('@/views/Users/UserManagement.vue'),
          meta: { requiresAuth: true, roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN] },
        },
        {
          path: '/ticket-support',
          name: 'Ticket Support',
          component: () => import('@/views/Forms/ListTicket.vue'),
          meta: {
            title: 'Ticket Support',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN, USER_ROLES.ROLE_USER],
          },
        },
        {
          path: '/ticket-support/create',
          name: 'Open Ticket',
          component: () => import('@/views/Forms/CreateTicket.vue'),
          meta: {
            title: 'Open Ticket',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_SUPER_ADMIN, USER_ROLES.ROLE_USER],
          },
        },
        {
          path: '/basic-tables',
          name: 'Basic Tables',
          component: () => import('@/views/Tables/BasicTables.vue'),
          meta: { title: 'Basic Tables', requiresAuth: true },
        },
        {
          path: '/alerts',
          name: 'Alerts',
          component: () => import('@/views/UiElements/Alerts.vue'),
          meta: { title: 'Alerts', requiresAuth: true },
        },
      ],
    },

    // ====================== USER ROUTES (không Sidebar) ======================
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Pages/Home.vue'),
          meta: { title: 'Home Page' },
        },
      ],
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('@/views/Auth/Signin.vue'),
      meta: { title: 'Sign In' },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/Auth/Signup.vue'),
      meta: { title: 'Sign Up' },
    },
    // ====================== 404 ======================
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/Errors/FourZeroFour.vue'),
      meta: { title: '404 - Not Found' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

// Cập nhật title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `AIRemake ${to.meta.title}` : 'AIRemake Pro'

  const authStore = useAuthStore()

  // Route yêu cầu đăng nhập
  if (to.meta.requiresAuth) {
    if (!authStore.user) {
      return next('/signin')
    }

    // Route giới hạn roles
    if (to.meta.roles && Array.isArray(to.meta.roles)) {
      const userRole = authStore.user?.role

      const allowedRoles = to.meta.roles

      if (!allowedRoles.includes(userRole)) {
        // alert('Bạn không có quyền truy cập trang này!')
        return next('/404')
      }
    }
  }

  next()
})

// beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem('current_user') || '{}')
//   const role = user.role

//   if (role?.startsWith('ROLE_STAFF')) {
//     const perms = JSON.parse(localStorage.getItem('permission_system') || '{}')
//     const rolePerms = perms[role]
//     if (rolePerms && !rolePerms[to.path]?.view) {
//       alert('Bạn không có quyền truy cập trang này!')
//       return next('/dashboard')
//     }
//   }
//   next()
// })

export default router
