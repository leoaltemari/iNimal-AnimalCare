<template>
  <div id="app">
    <app-header id="app-header"></app-header>
    <router-view id="app-main"/>
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
    /* grid-template-rows: 100vh; */
    grid-template-areas: "main-header"
                         "app-main"
  }

  #app-header {
    grid-area: main-header;
  }

  body {
    grid-area: app-main;
    background-image: url('assets/img/inimal-bkg.jpg');
    /* background-attachment: */
    /* background-size: cover; */
    background-repeat: repeat-y;
    height: 88vh;
  }

</style>
