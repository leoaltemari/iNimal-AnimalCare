<template>
  <div id="app">
    <header >
      <input type="text" v-model="msg">
      <p> {{msg}} </p>
    </header>
    <router-link to="/products" @click="printaAlgo()">Products</router-link>
    <router-link to="/">Home</router-link>
    <router-view/>
    <footer>Meu footer</footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: '',
    };
  },
  methods: {
    printaAlgo() {
      console.log('aaaaaa');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
