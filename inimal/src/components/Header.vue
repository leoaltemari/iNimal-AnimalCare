<template>
  <div id="app-header">
    <header class="main-header">
      <div class="header-items logo">
        <router-link to="/">
          <img src="../assets/img/inimal_logo.jpeg" alt="">
        </router-link>
        
      </div>
      <div class="header-items search-box">
        <input type="text" placeholder="O que você procura?" v-model="search"
        @keyup="searchFor">
        <routerLink tag="tr" :event="['click', 'keypress.enter']" to="/search"></routerLink>
      </div>
      <div class="links">
        <div class="header-items link">
          <router-link to="/products">Produtos</router-link>
        </div>
        <div class="header-items link">
          <router-link to="/services">Serviços</router-link>
        </div>
        <div class="header-items link">
          <router-link to="/login">Login</router-link>
        </div>
        <div class="header-items chart">
          <router-link to="/chart">
            <img src="../assets/img/carrinho_btn.png" alt="">
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      // Variaveis aqui
      search: '',
      searchLink: ''
    };
  },
  methods: {
    searchFor(event) {
      let key = event.which || event.keyCode;
      
    },
  },
};
</script>

<style>
@media (max-width: 1020px) 
{
  .main-header {
    grid-template-columns: 1fr!important;
    grid-template-rows: 10vh 10vh 10vh;
    text-align: center;
   }
   .links {
      grid-row-start: 3;
      grid-row-end: 4;
   }
   .search-box {
      grid-row-start: 2;
      grid-row-end: 3;
   }
   .logo {
     grid-column-start: 1;
     grid-column-end: 2;
   }
}
#app-header {
  box-sizing: border-box;
  background-color: yellow;
}
.main-header {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
}

.search-box {
  text-align: left;
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px; 
}

.search-box input {
  height: 35px;
  width: 100%;
  padding-left: 15px;
  border-radius: 10px;
  border:none;
  box-shadow: 0px 0px 5px black;
  position: relative;
  top: 15px;
  transition: 0.5s;
}

.search-box input:focus {
  outline: none;
  border: 2px solid rgb(137, 137, 255);
  box-shadow: 0px 0px 10px rgb(137, 137, 255);
}

.links {
  display: flex;
}

.link, .chart {
  padding: 10px;
  margin: 20px 40px 10px 40px;
}

.link a { 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: blue;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  transition: 0.2s;
}

.link a:hover {
  color:rgb(138, 138, 255);
  text-decoration: underline;
}

.logo {
  margin-top: 10px;
}

.logo  img {
  height: 70px;
  width: 200px;
  margin-left: 15px;
  box-sizing: border-box;
}

.chart {
  position:relative;
  top: -10px;
  box-sizing: border-box;
}
.chart img {
  height: 40px;
  width: 40px;
  transition: 0.2s;
}

.chart img:hover {
  border-bottom: 2px solid blue;
  transform: rotate(-30deg);
  cursor:pointer;
}
</style>
