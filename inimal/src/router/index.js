import Vue from 'vue';
import Router from 'vue-router';
import MainContent from '@/components/MainApp';
import Products from '@/components/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainContent',
      component: MainContent,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
    },
  ],
});
