import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/projects',
    component: () => import('@/views/projects/ProjectsLayout.vue'),
    meta: { title: 'Projects' },
    children: [
      {
        path: '',
        name: 'projects',
        component: () => import('@/views/projects/ProjectsOverview.vue'),
        meta: { title: 'Projects' },
      },
      {
        path: 'year-1',
        name: 'projects-year-1',
        component: () => import('@/views/projects/YearProjectsView.vue'),
        props: { year: 1 },
        meta: { title: '1년차' },
      },
      {
        path: 'year-2',
        name: 'projects-year-2',
        component: () => import('@/views/projects/YearProjectsView.vue'),
        props: { year: 2 },
        meta: { title: '2년차' },
      },
      {
        path: 'year-3',
        name: 'projects-year-3',
        component: () => import('@/views/projects/YearProjectsView.vue'),
        props: { year: 3 },
        meta: { title: '3년차' },
      },
    ],
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Not Found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined
  document.title = title ? `${title} · Portfolio` : 'Portfolio'
})

export default router
