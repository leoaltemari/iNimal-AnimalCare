<template>
  <div id="app">
    <app-header id="app-header"></app-header>
    <router-view/>
    <!-- <footer>Meu footer</footer> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  #app {
    display: grid;
    /* grid-template-columns: 3fr 1fr; */
    /* grid-template-rows: 12vh 70vh 18vh; */
    grid-template-areas: "main-header main-header"
                         "main aside-app"
                         "footer-app footer-app"
  }

  #app-header {
    grid-area: main-header;
  }

  main {
    background-color: blue;
    grid-area: main;
  }

  aside {
    background-color: green;
    grid-area: aside-app;
    min-width: 200px;
  }

  footer {
    background-color: red;
    grid-area: footer-app;

  }
</style>
