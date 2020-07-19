<template>
  <div id="app-products">
    <div id="products-content">
      <!-- Filters -->
      <aside id="filter-menu">
        <!-- ANIMALS -->
        <div class="filter-parent">
          <h2>Animais</h2>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Cachorro</h3>
          </div>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Gato</h3>
          </div>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Pássaro</h3>
          </div>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Roedor</h3>
          </div>
        </div>
        <div class="filter-parent">
          <h2>Categoria</h2>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Ração</h3>
          </div>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Acessório</h3>
          </div>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Brinquedo</h3>
          </div>
          <div class='filter-child'>
            <input type="checkbox">
            <h3>Medicamento</h3>
          </div>
        </div>
      </aside>

      <!-- Products -->
      <main id="products-container">  
        <div class="item" 
        v-for="(product, index) in products" 
        :key="product.id">
          <img src="../assets/img/logos/inimal_logo.jpeg" alt=""
           v-if="product.show === true">
          <h2>{{ product.name }}</h2>
          <h4>{{ product.description }}</h4>
          <h3>Preço: R${{ product.price }}</h3>
          <!-- Select quantity -->
          <div v-if="product.status === true" class="flex-input">
            <input type="number" id="quantity" 
            placeholder="Quantidade" v-model="quantity"/>

            <input type="button" 
            value="Adicionar" 
            @click="addToCart(product._id, index)"
            id="confirm"/>
          </div>

          <!-- Add to Cart -->
          <div v-else>
            <input type="button" 
            value="Adicionar ao carrinho" 
            @click="showQuantity(product._id, index)"
            id="add-Cart"/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Bus from './bus';

export default {
  name: 'Products',
  props: {
    user: { type: Object }
  },
  data() {
    return {
      // Variaveis aqui
      products: [],
      displayQuantityFlag: false,
      quantity: '',
      Cart: [],
    };
  },
  async mounted() {
      this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        await axios
          .get('http://localhost:8081/products')
          .then((response) => {
            this.products = response.data
            for(let i = 0; i < this.products.length; i++) {
              this.products[i].status = false;
              this.products[i].show = true;
            }
          });
      } catch(err) {
        console.log(err);
      }
    },
    showQuantity(productId, index) {
      this.products[index].price += 1;
      this.products[index].price -= 1;
      this.products[index].status = true;
    },
    addToCart(productId, index) {
      this.products[index].price += 1;
      this.products[index].price -= 1;
      this.products[index].status = false;
      
      this.Cart.push({product: this.products[index], quantity: this.quantity});
      this.quantity = '';
      Bus.$emit('item-in-Cart', this.Cart);
    },
  },
};
</script>

<style scoped>
  #products-content {
    display: grid;
    grid-template-columns: 1fr 4fr;
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
    width: 230px;
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

  #add-Cart {
    height: 40px;
    margin: 5px 0px;
    font-weight: bold;
    padding: 5px 10px 5px 10px;
    border: 1px solid rgb(177, 177, 177);
    background-color:rgb(0, 255, 0);
    border-radius: 10px;
    transition: 0.3s;
  }

  #add-Cart:hover {
    cursor:pointer;
    background-color:rgb(0, 160, 0);
    transform: scale(1.05);
  }

  .item input:focus {
    outline: none;
  }

  .flex-input {
    display: flex;
    margin: 10px 15px;
  }

  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  #quantity {
    width: 100px;
    height: 35px;
    border:1px solid rgb(170, 170, 170);
    text-align: center;
    transition: 0.5s;
  }

  #quantity:focus {
    outline: none;
    box-shadow: 0px 0px 2px black;
  }

  #confirm {
    padding: 5px;
    border:1px solid rgb(170, 170, 170);
    background-color: rgb(0, 255, 0);
    color: white;
    font-weight: bold;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: 0.3s ease-out;
  }

  #confirm:hover {
    cursor: pointer;
    background-color: rgb(0, 160, 0);
  }

  #confirm:focus {
    outline:none;
  }

  #filter-menu {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: white;
    max-height: 500px;
    min-width: 245px;
    max-width: 250px;
    padding: 5px;
    border: 1px solid rgb(177, 177, 177);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .filter-parent {
    margin: 10px;
  }

  .filter-parent h2 {
    text-align: center;
    padding: 5px;
    margin: 5px;
    border-bottom: 1px solid rgb(177, 177, 177);
  }

  .filter-child {
    padding: 10px 30px;
    display: flex;
  }

  .filter-child input {
    height: 15px;
    width: 15px;
    background-color: blue;
  }

  .filter-child h3 {
    margin: 0px 10px;
    position:relative;
    top: -4px;
  }
  
</style>