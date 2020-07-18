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
        
        <!--  Pets Display -->
        <aside id="my-pets">
          <main id="pet-config">
            <!-- Add a new pet -->
            <div class="pet-data save" v-if="addPetDisplay === true">
              <h1>Adicione um novo pet</h1>
              <div class="grid-items">
                <!-- PHOTO -->
                <div>
                  <h4>Foto</h4>
                  <input type="file" id="pet-upload-img">
                </div>
                <!-- NAME -->
                <div class="config-data">
                  <h2>Nome</h2>
                  <input type="text" placeholder="Digite o nome do pet" v-model="newPet.name">
                </div>
                <div class=" config-data">
                  <h2>Raça</h2>
                  <input type="text" placeholder="Digite a raça do pet" v-model="newPet.race">
                </div>
                <div class="config-data">
                  <h2>Idade</h2>
                  <input type="text" placeholder="Digite a idade do pet" v-model="newPet.age">
                </div>
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="addPetError">
                <ul><li v-for="error in addPetErrors" :key="error.id">{{ error }}
                  </li></ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="addPetSuccess">
                <ul><li>{{ addPetSuccessMsg }}
                  </li></ul>
              </div>
              <!-- Add pet BUTTON - Config BUTTON -->
              <div class="config">
                <a @click.stop.prevent="addNewPet()">Salvar pet</a>
                <a @click.stop.prevent="enablePetConfig()">
                <img src="../../assets/img/icons/config_icon.png" alt="">
                  Gerenciar pets
                </a>
              </div>
              
            </div>
            <!-- Change a pet -->
            <div class="pet-data" v-else>
              <h1>Altere algum pet</h1>
              <div class="config-data select-pet">
                  <h2>Selecione um pet para alterar as informações</h2>
                  <select name="" id="" v-model="updatePetName">
                    <option value=""
                     disabled selected hidden
                     v-if="userPets.length > 0">Selecione um pet</option>
                    <option value="" disabled selected hidden v-else>Você não possui nenhum pet</option>
                    <option v-for="pet in userPets"
                     :key="pet._id">{{pet.name}}</option>
                  </select>
                </div>
              <div class="grid-items" v-if="userPets.length > 0">
                <div>
                  <h4>Foto</h4>
                  <input type="file" id="pet-update-img" name="file">
                </div>
                <div class="config-data">
                  <h2>Nome</h2>
                  <input type="text" placeholder="Digite o nome do pet" v-model="updatePetData.name">
                </div>
                <div class="config-data">
                  <h2>Raça</h2>
                  <input type="text" placeholder="Digite a raça do pet" v-model="updatePetData.race">
                </div>
                <div class="config-data">
                  <h2>Idade</h2>
                  <input type="text" placeholder="Digite a idade do pet" v-model="updatePetData.age">
                </div>
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="updatePetError">
                <ul><li v-for="error in updatePetErrors" :key="error.id">{{ error }}
                  </li></ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="updatePetSuccess">
                <ul><li>{{ updatePetSuccessMsg }}
                  </li></ul>
              </div>
              <div class="user-data config config-data"> 
                <a @click.stop.prevent="enablePetConfig()">
                  <img src="../../assets/img/icons/return_icon.png" alt="">
                   Voltar
                </a>
              </div>
              <div class="config">
                <a @click.stop.prevent="removePet()" style="color:red;">
                  <img src="../../assets/img/icons/remove_icon.png" alt="">
                   Remover pet
                </a>
                <a @click.stop.prevent="updatePet()" class="rotate">
                <img src="../../assets/img/icons/config_icon.png" alt="">
                  Salvar alterações
                </a>
              </div>
            </div>
          </main>
          
          <!-- My pets DISPLAY -->
          <footer id="pets">
            <h1 v-if="userPets.length">Meus Pets</h1>
            <h1 v-else>Você não possui nenhum pet</h1>
            <div class="pets-display">
              <div class="pet-info" v-for="pet in userPets" :key="pet._id">
                <img src="../../assets/img/pets/pet_default.jpg" alt="">
                <h3>{{ pet.name }}</h3>
                <h4>Raça: {{ pet.race }}</h4>
                <h4>Idade: {{ pet.age }}</h4>
              </div>
            </div>
          </footer>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
'use strict'
import Bus from '../bus';
import User from '../../scripts/user/user-config';
import Pet from '../../scripts/user/pet-config';

export default {
  name: 'User',
  props: {
    user: { type: Object }
  },
  async mounted() {
    this.getUserPets();
  },
  data() {
    return {
      // Flags
      configEnable: false,
      addPetDisplay: true,
      
      // Update user data
      confirmPassword: '',
      updateUserData: {},
      updateUserErrors: [],
      updateUserSuccess: [],
      userErrors: false,

      // Pets
      userPets: [],

      // New Pet
      newPet: {},
      addPetErrors: [],
      addPetSuccessMsg: '',
      addPetError: false,
      addPetSuccess: false,

      // Update Pet
      updatePetName: '',
      updatePetData: {},
      updatePetErrors: [],
      updatePetSuccessMsg: '',
      updatePetError: false,
      updatePetSuccess: false,
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

    // Pet methods
    enablePetConfig() {
      this.addPetDisplay = !this.addPetDisplay;
      this.cleanPetVariables();
    },
    cleanPetVariables() {
      // ADD pet variables
      this.newPet.name = '';this.newPet.race = '';this.newPet.age = '';
      this.addPetSuccessMsg = '';
      this.addPetErrors = [];
      this.addPetError = false;
      this.addPetSuccess = false;

      // UPDATE pet variables
      this.updatePetName = '';
      this.updatePetData.name = '', this.updatePetData.race = ''; this.updatePetData.age = '';
      this.updatePetSuccessMsg = '';
      this.updatePetErrors = [];
      this.updatePetError = false;
      this.updatePetSuccess = false;
    },
    async getUserPets() {
      const pets = new Pet();
      const response = await pets.getPets(this.user._id, this.user.token);
      if(response.status === 0) {
        this.userPets = response.data;
      }
    },
    async addNewPet() {
      const pet = new Pet();
      // Reset bariables
      this.addPetSuccessMsg = '';
      this.addPetErrors = [];
      this.addPetError = false;
      this.addPetSuccess = false;

      const res = await pet.addNewPet(this.user._id, this.user.token, this.newPet);
      if(res.status === 1) {
        for(let i = 0; i < res.data.length; i++) {
          this.addPetErrors[i] = res.data[i].message;
        }
        this.addPetError = true;
        this.addPetSuccess = false;
      } else {
        this.addPetSuccessMsg = res.data.message;
        this.addPetError = false;
        this.addPetSuccess = true;

        this.getUserPets();
      }
    },
    async updatePet() {
      if(!this.updatePetName) {
        this.updatePetErrors[0] = 'Nenhum pet foi selecionado!'
        this.updatePetError = true;
        this.updatePetSuccess = false;
        return;
      };
      
      let petId;
      for(let i = 0; i < this.userPets.length; i++) {
        if(this.userPets[i].name === this.updatePetName) {
          petId = this.userPets[i]._id;
        }
      }

      const pet = new Pet();
      const res = await pet.updatePetData(this.user._id, 
                                          this.updatePetData, 
                                          petId, this.user.token);
      
      if(res.status === 1) {
        for(let i = 0; i < res.data.length; i++) {
          this.updatePetErrors[i] = res.data[i].message;
        }
        this.updatePetError = true;
        this.updatePetSuccess = false;
      } else {
        this.updatePetSuccessMsg = res.data.message;
        this.updatePetError = false;
        this.updatePetSuccess = true;

        this.getUserPets();
      }
    },
    async removePet() {
      if(!this.updatePetName) {
        this.updatePetErrors[0] = 'Nenhum pet foi selecionado!'
        this.updatePetError = true;
        this.updatePetSuccess = false;
        return;
      };

      // Getting the id of the selected pet
      let petId;
      for(let i = 0; i < this.userPets.length; i++) {
        if(this.userPets[i].name === this.updatePetName) {
          petId = this.userPets[i]._id;
        }
      }

      const pet = new Pet();
      try {
        let res = await pet.deletePet(petId, this.user.token);

        if(res.data.message) {
          this.updatePetSuccessMsg = res.data.message;
          this.updatePetError = false;
          this.updatePetSuccess = true;

          this.getUserPets();
        }
      } catch(err) {
        console.log(err);
      }
      return;
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
  #pet-config {
    padding: 20px 40px!important;
  }
  .pet-info {
    margin: 25px 60px!important;
  }
}

@media (max-width: 710px) {
  .config a {
    font-size: 15px!important;
    margin: 10px!important;
  }

  .pet-info {
    margin: 25px 40px!important;
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

input, select {
  overflow: hidden;
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

/* Pet information display */
#pet-config {
  padding: 20px 20px;
  border-bottom: 1px solid grey;
}

.pet-data {
  margin: 10px;
  padding: 0px 20px;
}

.pet-data h1 {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
}
input[type="file"] {
  margin-bottom: 10px;
  overflow: hidden;
  width: 120px;
}

.grid-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Pet condfiguration display */
.select-pet {
  text-align: center;
}

.select-pet select {
  width: 40%;
}

/* Pet media queries */
@media(max-width: 1110px) {
  #pets h1 {
    width: 450px;
  }
  
  .pets-display {
    grid-template-columns: 1fr 1fr!important;
    overflow-x: hidden!important;
  }

  ::-webkit-scrollbar {
    display: inherit!important;
  }   
  
}

@media(max-width: 1130px) {
   .pets-display {
    grid-template-columns: 1fr 1fr!important;
  }
}

@media(max-width: 900px) {
   .pets-display {
    grid-template-columns: 1fr 1fr!important;
  }
}

/* Pet grid display */

#pets {
  max-height: 350px;
  overflow: scroll;
  overflow-x: hidden;
}

#pets h1 {
  text-align: center;
  padding: 10px 0px;
}

.pets-display {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.pet-info {
  width: 200px;
  margin: 25px;
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 10px;
  color: rgb(162, 162, 253);
}

.pet-info img {
  text-align: center;
  background-color: white;
  height: 100px;
  width: 100px;
  border-radius:50%;
  margin: 5px;
}

.pet-info h3 {
  font-weight: bold;
  margin: 10px 0px;
  padding: 5px 0px;
  border-bottom: 1px solid rgb(162, 162, 253);
}

.pet-info h4 {
  font-weight: 100;
  text-align: left;
  height: 30px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(177, 177, 177);
  border-radius: 5px;
}

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