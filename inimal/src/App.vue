<template>
  <div id="app">
    <app-header id="app-header"></app-header>
    <router-view id="app-main"  :user="user" />
  </div>
</template>

<script>
import Bus from './components/bus'
export default {
  name: 'App',
  data: () => {
    return {
      user: {},
    };
  },
  mounted() {
    Bus.$on('logged', (value) => {
      this.user = value;
    });
  },
  data() {
    return {
      title: 'hallo',
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
