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

        </aside>
      </div>
    </main>
  </div>
</template>

<script>
'use strict'
import Bus from '../bus';
import User from '../../scripts/user/user-config';

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

    }
  },
  methods: {
    // User methods
    enableConfig() {
      this.configEnable = !this.configEnable;
      this.updateUserErrors =  [];
      this.updateUserSuccess = [];
      this.userErrors = false;
    },
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
 input[type=password], select {
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

input[type=text], input[type=password], select {
  height: 30px;
  width: 100%;
  margin: 5px 0px 5px 0px;
}

input[type=text]:focus, input[type=password]:focus, select:focus {
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

</style>