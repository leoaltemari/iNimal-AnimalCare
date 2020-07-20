<template>
  <div id="app">
    <app-header id="app-header"></app-header>
    <router-view id="app-main" :user="savedUser" :cart="savedCart"/>
  </div>
</template>

<script>
import Bus from './components/bus'
export default {
  name: 'App',
  data: () => {
    return {
      savedUser: {},
      savedCart: [],
    };
  },
  mounted() {
    Bus.$on('logged', (value) => {
      this.savedUser = value;
    });
    Bus.$on('item-in-cart', (value) => {
      this.savedCart = value;
    });
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
