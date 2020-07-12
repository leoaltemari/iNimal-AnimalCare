import Vue from 'vue';
import App from './App';
import router from './router';
import Header from './components/Header';
import Products from './components/Products';


Vue.component('app-header', Header);
Vue.component('app-products', Products);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
