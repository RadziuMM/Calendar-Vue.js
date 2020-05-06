import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from '../views/SignIn.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/frontpage',
    name: 'FrontPage',
    component: () => import('../views/FrontPage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
