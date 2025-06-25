import { createRouter, createWebHistory } from 'vue-router';
import Orders from '../views/Orders.vue';

const routes = [
  {
    path: '/',
    redirect: '/orders', 
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;