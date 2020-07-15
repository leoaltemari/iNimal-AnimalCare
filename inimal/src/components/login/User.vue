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
          <!-- CONFIG -->
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
            <input type="file">
          </div>
          <!-- Change NAME -->
           <div class="user-data config-data">
            <h2>Nome</h2>
            <input type="text" placeholder="Digite um novo nome">
          </div>
          <!-- Change EMAIL -->
          <div class="user-data config-data">
            <h2>Email</h2>
            <input type="text" placeholder="Digite um novo email">
          </div>
          <!-- change PHONE -->
          <div class="user-data config-data">
            <h2>Telefone</h2>
            <input type="text" placeholder="Digite um novo telefone">
          </div>
          <!-- Change ADDRESS -->
          <div class="user-data config-data">
            <h2>Endereço</h2>
            <input type="text" placeholder="Digite um novo endereço">
          </div>
          <!-- Change PASSWORD -->
          <div class="user-data config-data change-password">
            <div>
              <h2>Alterar senha</h2>
              <input type="text" placeholder="Digite a senha">
            </div>
            <div>
              <h2>Confirme a senha</h2>
              <input type="text" placeholder="Confirme a senha">
            </div>
          </div>
          <!-- Save changes -->
          <div class="user-data config config-data"> 
            <a @click.stop.prevent="enableConfig()">
              <img src="../../assets/img/icons/config_icon.png" alt="">
              Salvar alterações
            </a>
          </div>
        </aside>
        
        <!--  Pets Display -->
        <aside class="pets-display">
          <main id="add-pet">
              <h1>add pet</h1>
          </main>
          <footer id="pets">
              <h1>my pets</h1>
          </footer>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import Bus from '../bus';

export default {
  name: 'User',
  props: {
    user: { type: Object }
  },
  data() {
    return {
      configEnable: false,
    }
  },
  methods: {
    enableConfig() {
      this.configEnable = !this.configEnable;
    }
  }
}
</script>

<style scoped>
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
}
#user-content {
  background-color: white;
  margin: 30px 100px 20px 100px;
  border: 1px solid rgb(179, 179, 179);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
}

#no-logged {
  color: red;
  text-align: center;
  height: 80vh;
}

span {
  font-size: 50px;
}

#logged {
  display: grid;
  grid-template-columns: 2fr 4fr;
}

.user-info {
  display: grid;
  border-right: 1px solid rgb(179, 179, 179);
  padding: 30px;
}

.user-data h3, input[type=text] {
  padding: 5px 0px 5px 20px;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.5s;
}

input[type=text] {
  height: 30px;
  width: 100%;
  margin: 5px 0px 5px 0px;
}

input[type=text]:focus {
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

.config {
  margin-top: 20px;
}

.config img {
  height: 30px;
  width: 30px;
  margin-right: 5px;
  position: relative;
  top:5px;
  transition: 3s;
}

.config a {
  font-size: 18px;
  text-decoration: none;
  color: rgb(107, 107, 206);
  transition: 0.5s;
}

.config a:hover {
  text-decoration: underline;
  cursor: pointer;
}
.config a:hover  img{
  transform: rotate(360deg);
}

.config-data {
  font-size: 10px;
}

.change-password {
  display: grid;
  grid-template-columns: 1fr 1fr;
}


</style>