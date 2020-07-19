<template>
  <div>
    <main id="user-content">
      <!-- User info -->
      <div id="logged">
        <!-- User config -->
        <aside class="user-info" style="text-align: center;">
          <!-- Logged -->
          <h3>Agende um horário</h3><br/>
          <div class="information" v-if="user.name != undefined">
            <!-- Pet select -->
            <div class="user-data config-data">
              <h1>Selecione seu pet</h1>
              <select v-model="schedule.pet">
                <option v-for="pets in userPets" :key="pets._id">
                  {{pets.name}}
                </option>
              </select>
            </div>

            <!-- Service select -->
            <div class="user-data config-data">
              <h1>Selecione o serviço</h1>
              <select v-model="schedule.service">
                <option v-for="service in services" :key="service._id">
                  {{service.name}}
                </option>
              </select>
            </div>

            <!-- Select DAY -->
            <div class="user-data config-data">
             <h1>Dia</h1>
             <input type="text" placeholder="Digite o dia" v-model="schedule.date.day">
            </div>

            <!-- Select MONTH -->
            <div class="user-data config-data">
              <h1>Mês</h1>
              <input type="text" placeholder="Digite o mes" v-model="schedule.date.month">
            </div>
          </div>

          <!-- Not logged -->
          <div class="information" v-else>
            <div class="message error">
                <h3>Você precisa estar logado para agendar um horário</h3>
            </div>
          </div>

          <!-- Display ERROR messages -->
          <div class="error message" v-if="scheduleError">
            <ul>
              <li v-for="error in scheduleErrors" :key="error.id">
                {{ error }}
              </li>
            </ul>
          </div>

          <!-- Display SUCCESS messages -->
          <div class="success message" v-if="scheduleSuccess">
            <ul>
              <li>
                {{scheduleSuccessMsg}}
              </li>
            </ul>
          </div>

          <!-- CONFIRM button-->
          <div class="user-data config config-data" v-if="user.name != undefined"> 
            <a @click.stop.prevent="scheduleATime()">
              <img src="../assets/img/icons/add_icon.png" alt="">
              Agendar
            </a>
          </div>
        </aside>
        
        <!--  Pets Display -->
        <aside id="my-pets">
          <main id="pet-config">
            <!-- Add a new pet -->
            <div class="pet-data save" >
              <h1>Serviços</h1>
              <div class="grid-items">
                
              </div>
              <!-- Display ERROR messages -->
              <div class="error message" v-if="seeTableError">
                <ul>
                  <li >
                    {{ seeTableErrors }}
                  </li>
                </ul>
              </div>
              <!-- Display SUCCESS messages -->
              <div class="success message" v-if="seeTableSucess">
                <ul>
                  <li >
                    {{ seeTableSuccessMsg }}
                  </li>
                </ul>
              </div>
              <!-- Add pet BUTTON - Config BUTTON -->
              <div class="config">
                <a @click.stop.prevent="searchSchedulingTable()">
                <img src="../assets/img/icons/add_icon.png" alt="">
                  Buscar
                </a>
              </div>
              
            </div>
          </main>
          
          <!-- My pets DISPLAY -->
          <footer id="pets">
            <h1 v-if="userPets.length">Tabela</h1>
            <h1 v-else>Você não possui nenhum pet</h1>
            <!-- Earn table -->
            <div id="earn-table" v-if="showTable === true">
              <h2>Ganhos em : {{date.day}} / {{date.month}} / {{date.year}}</h2>
              <table>
                <tr>
                  <th>Cliente</th>
                  <th>Valor da compra</th>
                  <th>Hora da compra</th>
                  <th>Número do pedido</th>
                </tr>
                <tr v-for="order in earnScreenData" :key="order._id">
                  <td>{{order.customer.name}}</td>
                  <td>{{order.totalPrice}}</td>
                  <td>{{order.hour}}</td>
                  <td>{{order.number}}</td>
                </tr>
              </table>
              <h3 style="margin: 25px;">Total: R${{totalEarned}}</h3>
            </div> 
          </footer>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
'use strict'
import Service from '../scripts/services/services-config';
import Pet from '../scripts/user/pet-config';
import Bus from './bus';

export default {
  name: 'Services',
  props: {
    user: { type: Object }
  },
  data: () => {
    return {
      // Display data
      services: [],
      userPets: [],

      // Scheduling flags
      scheduleErrors: [],
      scheduleError: false,
      scheduleSuccessMsg: '',
      scheduleSuccess: false,

      // Scheduling data
      schedule: {
        date: {},
      },

      // See the schedule data
      seeDay: '',
      seeMonth: '',
      seeYear: '',
      seeTableError: '',
      seeTableErrors: false,
      seeTableSuccess: false,
      seeTableSuccessMsg: '',
    };
  },
  async mounted() {
    try {
      const service = new Service();
      const res = await service.getServices();
      this.getUserPets();
      this.services = res;
    } catch(err) {

    }
  },
  methods: {
    async getUserPets() {
      const pets = new Pet();
      const response = await pets.getPets(this.user._id, this.user.token);
      if(response.status === 0) {
        this.userPets = response.data;
      }
    },
    searchSchedulingTable() {

    },
    async scheduleATime() {
      try {
        const service = new Service();

        if(!this.schedule.service || !this.schedule.pet ||
        !this.schedule.date || !this.schedule.date.day ||
        !this.schedule.date.month) {
          this.scheduleError = true;
          this.scheduleSuccess = false;
          this.scheduleErrors[0] = 'Preencha corretamente os dados';
          return;
        }
        this.schedule.customer = this.user._id;

        for(let i = 0; i < this.services.length;i++) {
          if(this.services[i].name === this.schedule.service) {
            this.schedule.price = this.services[i].price;
          }
        }

        this.schedule.date.year = '2020';
        const res = await service.schedule(this.schedule, this.user.token);
        if(res.message) {
          if(res.message != 'Dia cheio') {
            this.scheduleError = false;
            this.scheduleSuccess = true;
            this.scheduleSuccessMsg = res.message;
          } else {
            this.scheduleError = true;
            this.scheduleSuccess = false;
            this.scheduleErrors[0] = res.message;
          }
        }
      } catch(err) {

      }
    },
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