<template>
  <div>
    <h1>Cart</h1><br><br>
    <ul>
      <li v-for="item in Cart" :key="item.product._id">
        {{ item.product.name }}
      </li>
    </ul>
  </div>
 
</template>

<script>
import axios from 'axios';
import Bus from './bus';
export default {
  name: 'Cart',
  props: {
    Cart: { type: Array }
  },
  mounted() {

  },
  data: () => {
    return {

    };
  },
  methods: {
    
  }
}
</script>

<style>

</style>