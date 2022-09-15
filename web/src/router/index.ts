import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/list/ads/:id',
      name: 'list.ads',
      component: () => import('../views/ListAds.vue'),
    },
  ],
});

export default router;
