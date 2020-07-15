<template>
  <div id="app-products">
    <div id="products-content">
      <main id="products-container">  
        <div class="item" v-for="product in products" :key="product.id">
          <img src="../assets/img/logos/inimal_logo.jpeg" alt="">
          <h2>{{ product.name }}</h2>
          <h4>{{ product.description }}</h4>
          <h3>Preço: R${{ product.price }}</h3>
          <input type="button" value="Adicionar ao carrinho"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Products',
  props: {
    user: { type: Object }
  },
  data() {
    return {
      // Variaveis aqui
      products: [],
    };
  },
  async beforeCreate() {
    try {
      await axios
        .get('http://localhost:8081/products')
        .then((response) => {
          this.products = response.data
        });
    } catch(err) {
      console.log(err);
    }
  },
  methods: {

  },
};
</script>

<style scoped>
  #products-content {
    display: flex;
    grid-template-areas: "main";
    position: relative;
    top: 70px;               
  }

  /* Products */
  /* Media queries for products */
  @media (max-width: 1400px) {
    #products-container {
      grid-template-columns: 1fr 1fr 1fr!important;
    }
  }

  @media (max-width: 1150px) {
    #products-container {
      grid-template-columns: 1fr 1fr!important;
    }
  }
  @media (max-width: 870px) {
    #products-container {
      grid-template-columns: 1fr!important;
    }
  }

  #products-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-left: 20px;
    width: 100%;
    text-align: center;
  }

  #products-container h1 {
    border-radius: 50px;
    background-color: white;
    height: 100px;
    text-align: center;
  }

  .item {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif ;
    margin: 0px 10px 10px 10px;
    width: 290px;
    background-color: white;
    text-align: center;
    padding: 15px;
    border: 2px solid rgb(170, 170, 170);
    border-radius: 20px;
    box-shadow: 0px 0px 2px black;
    color:rgb(102, 102, 255);
    max-height: 400px;
  }

  .item img {
    height: 100px;
    width: 150px;
    /* border: 2px solid black; */
  }

  .item h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
  }

  .item h4 {
    text-align: left;
    height: 80px;
    font-size: 10px;
    overflow: hidden;
  }
  
  .item h3 {
    text-align: left;
    margin-bottom:10px;
  }

  .item input {
    height: 40px;
    font-weight: bold;
    padding: 5px 10px 5px 10px;
    border: 1px solid rgb(177, 177, 177);
    background-color:rgb(0, 255, 0);
    border-radius: 10px;
    transition: 0.3s;
  }

  .item input:hover {
    cursor:pointer;
    background-color:rgb(0, 160, 0);
    transform: scale(1.05);
  }

  .item input:focus {
    outline: none;
  }

  
</style>