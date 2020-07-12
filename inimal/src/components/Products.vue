<template>
  <div>
    <h2>Products</h2>
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Products',
  data() {
    return {
      // Variaveis aqui
      products: [],
    };
  },
  async mounted() {
    await axios
      .get('http://localhost:8081/products')
      .then((response) => {
        this.products = response.data
      });
  },
  methods: {
    printaAlgo() {
    },

  },
};
</script>
