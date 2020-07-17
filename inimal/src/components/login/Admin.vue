<template>
  <div>
    <main id="user-content">
      <!-- Page not found -->
      <div v-if="!user || user.name === undefined" id="no-logged">
        <img src="../../assets/img/icons/error_icon.png" alt="">
        <h1><span>ERRO</span></h1>
        <h3>Página indisponível, você precisa estar logado para acessá-la!</h3>
      </div>

      <!-- User info -->
      <div id="logged" v-else>
        <!-- Data from user -->
        <aside class="user-info" v-if="!configEnable">
          <div class="user-data user-img">
            <img src="../../assets/img/icons/user_icon.png" alt="">
          </div>
          <div class="information">
          <!-- NAME -->
            <div class="user-data">
              <h2>Nome</h2>
              <h3>{{ user.name }}</h3>
            </div>
            <!-- EMAIL -->
            <div class="user-data">
              <h2>Email</h2>
              <h3>{{ user.email }}</h3>
            </div>
            <!-- PHONE -->
            <div class="user-data">
              <h2>Telefone</h2>
              <h3>{{ user.phone }}</h3>
            </div>
            <!-- ADDRESS -->
            <div class="user-data">
              <h2>Endereço</h2>
              <h3>{{ user.address }}</h3>
            </div>
          </div>
          <!-- CONFIG button -->
          <div class="user-data config"> 
            <a @click.stop.prevent="enableConfig()">
              <img src="../../assets/img/icons/config_icon.png" alt="">
              Configurações
            </a>
          </div>
        </aside>
        <!-- User config -->
        <aside class="user-info" v-else>
          <!-- Change image -->
          <div class="user-data user-img config-data">
            <img src="../../assets/img/icons/user_icon.png" alt="">
            <input id="file-img" type="file" name="file"/>
          </div>
          <!-- User data fields -->
          <div class="information">
            <!-- Change NAME -->
            <div class="user-data config-data">
              <h2>Nome</h2>
              <input type="text" placeholder="Digite um novo nome"
               v-model="updateUserData.name">
            </div>
            <!-- Change EMAIL -->
            <div class="user-data config-data">
              <h2>Email</h2>
              <input type="text" placeholder="Digite um novo email"
               v-model="updateUserData.email">
            </div>
            <!-- change PHONE -->
            <div class="user-data config-data">
              <h2>Telefone</h2>
              <input type="text" placeholder="Digite um novo telefone"
               v-model="updateUserData.phone">
            </div>
            <!-- Change ADDRESS -->
            <div class="user-data config-data">
              <h2>Endereço</h2>
              <input type="text" placeholder="Digite um novo endereço"
               v-model="updateUserData.address">
            </div>
            <!-- Change PASSWORD -->
              <!-- password -->
            <div class="user-data config-data">
              <h2>Alterar senha</h2>
              <input type="password" placeholder="Digite a senha"
              v-model="updateUserData.password">
            </div>
              <!-- confirm password -->
            <div class="user-data config-data">
              <h2>Confirme a senha</h2>
              <input type="password" placeholder="Confirme a senha"
              v-model="confirmPassword">
            </div>
          </div>
          <!-- Display ERROR messages -->
          <div class="error message" v-if="userErrors">
            <ul><li v-for="error in updateUserErrors" :key="error.id">{{ error }}
              </li></ul>
          </div>
          <!-- Display SUCCESS messages -->
          <div class="success message" v-if="updateUserSuccess.length > 0">
            <ul><li>{{updateUserSuccess}}
              </li></ul>
          </div>

          <!-- RETURN button-->
          <div class="user-data config config-data"> 
            <a @click.stop.prevent="enableConfig()">
              <img src="../../assets/img/icons/return_icon.png" alt="">
              Voltar
            </a>
          </div>
          <!-- SAVE button -->
          <div class="user-data config config-data"> 
            <a @click.stop.prevent="updateUser()" class="rotate">
              <img src="../../assets/img/icons/config_icon.png" alt="">
              Salvar alterações
            </a>
          </div>
        </aside>
        
        <!-- Stock manager -->
        <aside id="stock-manager">
          <!-- PUT admin -->
          <div id="put-admin" class="stock-content"
          v-if="!productManager && !earnScreen && !serviceManager">
            <!-- make ADMIN -->
            <h2>Torne um usuário um administrador</h2>
            <div>
              <input type="text" placeholder="Digite o email do usuário"
              v-model="putAdminEmail">
              <h6>Se o usuário já for um administrador você removerá o status dele</h6>
              <div class="message success" v-if="putAdminSuccessFlag">
                <h5>{{ putAdminMsg }}</h5>
              </div>
              <div class="message error" v-if="putAdminErrorFlag">
                <h5>{{ putAdminError }}</h5>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="putAdmin()" class="rotate">
                  <img src="../../assets/img/icons/config_icon.png" alt="">
                  Tornar administrador
                </a>
              </div>
            </div>
          </div>

          <!-- LINKS to other pages -->
          <div id="links" class="stock-content"
          v-if="!productManager && !earnScreen && !serviceManager">
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableProductManager()">
                <img src="../../assets/img/icons/product_icon.png" alt="">
                  Gerenciar produtos
              </a>
            </div>
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableServiceManager()">
                <img src="../../assets/img/icons/service_icon.png" alt="">
                  Gerenciar serviços
              </a>
            </div>
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableEarnScreen()">
                <img src="../../assets/img/icons/earn_icon.png" alt="">
                  Tabela de ganhos
              </a>
            </div>
          </div>

          <!-- PRODUCT manager -->
          <div id="product-manager" class="stock-content"
          v-if="productManager && !earnScreen && !serviceManager">
            <!-- page title -->
            <h1>Gerenciamento de Produtos</h1>

            <!-- Go back link -->
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableProductManager()">
                <img src="../../assets/img/icons/return_icon.png" alt="">
                  Voltar
              </a>
            </div>
            
            <div>
              <h2 style="margin:10px; text-decoration:underline;">Adicionar Produto</h2>
              <input type="file" name="file">
              <div class="manager-item">
                <input type="text" placeholder="Nome do produto" v-model="postProduct.name">
                <input type="text" placeholder="Slug do produto(eg:nome-produto)" v-model="postProduct.slug">
                <input type="text" placeholder="Descrição do produto" v-model="postProduct.description">
                <input type="number" placeholder="Preço do produto(eg: 99.99)" v-model="postProduct.price">
                <input type="number" placeholder="Quantidade do produto(eg: 10)" v-model="postProduct.quantity">
                <select v-model="postProduct.animal">
                  <option disabled selected hidden>Selcione um animal</option>
                  <option>Cachorro</option>
                  <option>Gato</option>
                  <option>Pássaro</option>
                  <option>Roedor</option>
                </select>
                <select v-model="postProduct.category">
                  <option disabled selected hidden>Selcione uma categoria</option>
                  <option>Ração</option>
                  <option>Acessório</option>
                  <option>Brinquedo</option>
                  <option>Medicamento</option>
                </select>
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="postProductError">
                <ul>
                  <li v-for="error in postProductErrors" :key="error.id">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="postProductSuccess">
                <ul>
                  <li>
                    {{ postProductMsg }}
                  </li>
                </ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="postProductFunc()">
                  Adicionar
                </a>
              </div>
            </div>
          </div>

          <!-- SERVICE manager -->
          <div id="service-manager" class="stock-content"
          v-if="!productManager && !earnScreen && serviceManager">
            <!-- page title -->
            <h2>Gerenciamento de Serviços</h2>
            <!-- Go back link -->
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableServiceManager()">
                <img src="../../assets/img/icons/return_icon.png" alt="">
                  Voltar
              </a>
            </div>
          </div>

          <!-- EARN screen -->
          <div id="earn-screen" class="stock-content"
          v-if="!productManager && earnScreen && !serviceManager">
            <!-- page title -->
            <h2>Tabela de ganhos</h2>
            <!-- Go back link -->
            <div class="user-data config config-data"> 
              <a @click.stop.prevent="enableEarnScreen()">
                <img src="../../assets/img/icons/return_icon.png" alt="">
                  Voltar
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
'use strict'
import Bus from '../bus';
import User from '../../scripts/user/user-config';
import Admin from '../../scripts/admin/admin-config';

export default {
  name: 'User',
  props: {
    user: { type: Object }
  },
  data() {
    return {
      // Flags
      configEnable: false,
      
      // Update user data
      confirmPassword: '',
      updateUserData: {},
      updateUserErrors: [],
      updateUserSuccess: [],
      userErrors: false,

      // Admin
      putAdminEmail: '',
      removeAdminEmail: '',
      putAdminMsg: '',
      putAdminSuccessFlag: false,
      putAdminErrorFlag: false,
      putAdminError: '',

      // Flags
      productManager: false,
      serviceManager: false,
      earnScreen: false,
      postProductSuccess: false,
      postProductError: false,

      // Post product;
      postProduct: {},
      postProductMsg: '',
      postProductErrors: [],


    }
  },
  methods: {
    // Change screens methods
    enableConfig() {
      this.configEnable = !this.configEnable;
      this.updateUserErrors =  [];
      this.updateUserSuccess = [];
      this.userErrors = false;
    },
    cleanManagerVariables() {
      // Cleaning product field
      this.postProductSuccess = false;
      this.postProductError = false;
      this.postProduct = {};
    },
    enableProductManager() {
      this.productManager = !this.productManager;
      this.cleanManagerVariables();
    },
    enableServiceManager() {
      this.serviceManager = !this.serviceManager;
      this.cleanManagerVariables();
    },
    enableEarnScreen() {
      this.earnScreen = !this.earnScreen;
      this.cleanManagerVariables();
    },

    // User methods
    async updateUser() {
      // Cleaning variables
      const user = new User();
      user.clear();
      this.updateUserErrors =  [];
      this.updateUserSuccess = [];
      this.userErrors = false;

      // Checking if the passwords are equal
      if(this.updateUserData.password) {
        if(this.updateUserData.password != this.confirmPassword) {
          this.updateUserErrors[0] = 'As senhas são diferentes!';
          this.userErrors = true;
          return;
        }
      }

      try {
        // Update user data('res' keeps the new user information)
        const res = await user.updateUserData(this.updateUserData, 
                                        this.user._id, this.user.token);
        // If there is any error in the data 
        if(res.status === 1) {
          for(let i = 0; i < res.data.length; i++) {
            this.updateUserErrors[i] = res.data[i].message;
            this.userErrors = true;
          }
        } else {  // No error
          this.updateUserSuccess = res.data.message;
          this.user = res.user;
          
          // Clean the interface fields and emit the new user data to other components
          this.cleanUserVariables();
          Bus.$emit('logged', this.user);
        }
      } catch(err) {
        console.log(err);
      }
    },
    cleanUserVariables() {
      // Clean every user fields in the interfece by reativity
      this.updateUserData.name = '';
      this.updateUserData.phone = '';
      this.updateUserData.email = '';
      this.updateUserData.address = '';
      this.updateUserData.password = '';
      this.confirmPassword = '';
    },

    // Admin
    async putAdmin() {
      const admin = new Admin();

      if(!this.putAdminEmail) {
        this.putAdminErrorFlag = true;
        this.putAdminSuccessFlag = false;
        this.putAdminError = 'O campo email está em branco';
        return;
      }

      try {
        const res = await admin.putAdmin(this.putAdminEmail, this.user.token);
        if(res != null) {
          if(res.data.message === 'Usuário não encontrado') {
            this.putAdminErrorFlag = true;
            this.putAdminSuccessFlag = false;
            this.putAdminError = res.data.message;
          } else {
            this.putAdminSuccessFlag = true;
            this.putAdminErrorFlag = false;
            this.putAdminMsg = res.data.message;
            this.putAdminEmail = '';
          }
        }
      } catch(err) {
        console.log(err);
      }
    }, 

    // Stock Manager
      // POST product
    async postProductFunc() {
      const admin = new Admin();
      try {
        // Parse number variables
        this.postProduct.price = parseInt(this.postProduct.price, 10);
        this.postProduct.quantity = parseInt(this.postProduct.quantity, 10);

        // Make the post
        const res = await admin.postProduct(this.postProduct, this.user.token);
        if(res.status === 0) {
          this.postProductMsg = res.data;
          this.postProductError = false;
          this.postProductSuccess = true;
        } else {
          this.postProductErrors = res.data;
          this.postProductError = true;
          this.postProductSuccess = false;
        }
      } catch(err) {
        console.log(err); 
      }
    }

  }
}
</script>

<style scoped>
/* Media queries */
@media (max-width: 1050px) {
  #logged {
    display: grid;
    grid-template-columns: 4fr!important;
  }
  .change-password {
    display: grid;
    grid-template-columns: 1fr 1fr!important;
  }

  .config {
    text-align: center;
  }

  .information {
    display:grid;
    grid-template-columns: 1fr 1fr; 
  }
  
  .user-info {
    border-right: none!important;
    border-bottom: 2px solid rgb(179, 179, 179);
    padding: 20px 40px!important;
    margin: 0px 20px;
  }

  .user-data {
    margin:  0px 10px!important;
    padding: 0px 20px;
  }
}

@media (max-width: 710px) {
  .config a {
    font-size: 15px!important;
    margin: 10px!important;
  }
}

/* General config */
#user-content {
  background-color: white;
  margin: 30px 100px 20px 100px;
  border: 1px solid rgb(179, 179, 179);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
}
  /* error msg */
#no-logged {
  color: red;
  text-align: center;
  height: 80vh;
}

span {
  font-size: 50px;
}
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* User display condig */
#logged {
  display: grid;
  grid-template-columns: 2fr 4fr;
}

.user-info {
  display: grid;
  border-right: 1px solid rgb(179, 179, 179);
  padding: 30px;
  min-width: 280px;
}

.user-data h3, input[type=text],
 input[type=password], select, input[type=number] {
  padding: 5px 0px 5px 20px;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.5s;
}

.user-data h2 {
  font-size: 15px;
}

input[type=text], input[type=password],
 select, input[type=number] {
  height: 30px;
  width: 100%;
  margin: 5px 0px 5px 0px;
}

input[type=text]:focus, input[type=password]:focus,
 select:focus, input[type=number]:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgb(115, 115, 255);
}

.user-img {
  text-align: center;
}
.user-img img {
  text-align: center;
  height: 150px;
  width: 150px;
  padding: 10px;
  background-color: white;
  border: 1px solid  blue;
  border-radius: 50%;
}


/* User configuration display */
.config {
  margin-top: 20px;
  text-align: center;
}

.config img {
  height: 25px;
  width: 25px;
  margin-right: 5px;
  position: relative;
  top:5px;
  transition: 3s;
}

.config a {
  font-size: 15px;
  text-decoration: none;
  color: rgb(107, 107, 206);
  transition: 0.5s;
  margin: 0px 30px;
}

.config a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.rotate:hover img{
  transform: rotate(360deg);
}

.config-data {
  font-size: 10px;
  margin: 0px 10px 0px 0px;
}

.change-password {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Stock information display */
input[type="file"] {
  margin-bottom: 10px;
  overflow: hidden;
  width: 120px;
}

/* Pet grid display */
/* Scroll bar css */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(177, 177, 177);
  border-radius: 5px;
}


/* Messages from the server */
.message {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  transition: 1s;
}

.error ul, .success ul {
  list-style-type: none;
}
.error li, .succes li {
  font-size: 15px;
}

.error {
    color: rgb(255, 122, 122);
}
.success {
    color: rgb(80, 255, 138);
}

/* Stock config */
.stock-content {
  text-align: center;
  padding: 20px 0px;
  overflow-y: scroll;
}
.stock-content h1 {
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(179, 179, 179);
}

.stock-content h2 {
  font-size: 15px;
}

#put-admin {
  border-bottom: 1px solid rgb(179, 179, 179);
}

#put-admin h2{
  margin: 0px 0px 10px 0px;
}

#put-admin input {
  margin: 5px 100px;
  width: 300px;
  padding: 0px;
  text-align: center;
}
#put-admin h6 {
  font-size: 10px;
  font-weight: 150;
  color:rgb(179, 179, 179);
}


.manager-item {
  padding:5px;
  margin: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#links {
  margin: 100px 0px;
}

#links a {
  font-size: 20px;
}


</style>