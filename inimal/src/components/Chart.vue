<template>
  <div>
    <h1>Chart</h1><br><br>
    <ul>
      <li v-for="item in chart" :key="item.product._id">
        {{ item.product.name }}
      </li>
    </ul>
  </div>
 
</template>

<script>
import axios from 'axios';
import Bus from './bus';
export default {
  name: 'Chart',
  props: {
    chart: { type: Array }
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