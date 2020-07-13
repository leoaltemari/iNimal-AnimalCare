<template>
  <div id="login">
    <div id="login-content">
      <div class="login-page login">
        <h1>Login</h1>
        <div class="login-field"> 
            <h2>Email</h2>
            <input type="text" placeholder="Digite seu email" v-model="loginFields.email">
        </div>
        <div class="login-field"> 
            <h2>Senha</h2>
            <input type="password" placeholder="Digite sua senha" v-model="loginFields.password"
            @keyup="sendLoginWithEnter">
        </div>
        <div class="login-field error" v-show="loginErrors">
            <h3>{{loginErrors }}</h3>
        </div>
        <router-link to="/login/user" id="login-success"></router-link>
        <div class="login-submit"> 
            <input type="button" value="Entrar" @click="authenticate" id="login-btn">
        </div>
      </div>
      <div class="login-page">
        <h1>Cadastro</h1>
        <div class="cadastro">
          <div class="login-field"> 
              <h2>Nome</h2>
              <input type="text" placeholder="Digite seu nome" v-model="registerFields.name">
          </div>
          <div class="login-field"> 
              <h2>Email</h2>
              <input type="text" placeholder="Digite seu email" v-model="registerFields.email">
          </div>
          <div class="login-field"> 
              <h2>Endereço</h2>
              <input type="text" placeholder="Digite seu endereço" v-model="registerFields.address">
          </div>
          <div class="login-field"> 
              <h2>Telefone</h2>
              <input type="text" placeholder="Digite seu telefone (dd) 9 9999-9999" v-model="registerFields.phone">
          </div>
          <div class="login-field senha"> 
              <h2>Senha</h2>
              <input type="password" placeholder="Digite sua senha" v-model="registerFields.password">
          </div>
          <div class="login-field senha"> 
              <h2>Confirme sua senha</h2>
              <input type="password" placeholder="Confirme a senha" v-model="confirmPassword" @keyup="sendRegisterWithEnter">
          </div>
        </div>
        <div class="login-field error" v-show="registerErrors">
            <ul>
              <li v-for="error in registerErrors" :key="error">-> {{ error }}</li>
            </ul>
        </div>
        <div class="login-field success" v-show="registerSuccess.length">
            <h3>{{ registerSuccess }}</h3>
        </div>
        <div class="login-submit"> 
              <input type="button" value="Cadastrar" @click="register" id="register-btn" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
name: 'Login',
  data() {
    return {
      // Variaveis aqui
      loginFields: {
        email: "",
        password: ""
      },
      registerFields: {
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
      },
      confirmPassword: '',
      loginErrors: '',
      registerErrors: [],
      registerSuccess: "",
      user: {},
      logged: false,
    };
  },
  methods: {
    async authenticate(event) {
      this.loginErrors = [];
      try {
        await axios.get(`http://localhost:8081/customers/authenticate/${this.loginFields.email}/${this.loginFields.password}`)
        .then(response => {
          if(response.data.message) {
            this.loginErrors = response.data.message;
          } else {
            this.user = response.data.data;
            this.token = response.data.token;
            const loginSuccess = document.getElementById('login-success').click();
          }
        });
      } catch(err) {
        console.log(err);
      }     
    },
    async register() {
        this.registerErrors = [];
        const data = this.registerFields;
        
        if(data.password != this.confirmPassword) {
          this.registerErrors.push("Senha confirmada está diferente da senha");
          return;
        }

        try {
          const url = "http://localhost:8081/customers/";
          const data = this.registerFields;
          const headers = {};
          await axios.post(url, data, headers)
          .then(response => {
            if(response.data.message) {
              this.registerSuccess = response.data.messaage;
            }
            else if(response.data[0].message) {
              for(let i = 0; i < response.data.length;i++) 
                this.registerErrors.push(response.data[i].message);
            }
          });
      } catch(err) {
        console.log(err);
      } 
    },
    sendLoginWithEnter(event) {
      // Change to search page pressing ENTER
      let key = event.which || event.keyCode;
      
      if(key === 13) {
        const btn = document.getElementById('login-btn');
        btn.click(); 
      } 
    },
    sendRegisterWithEnter(event) {
      // Change to search page pressing ENTER
      let key = event.which || event.keyCode;
      
      if(key === 13) {
        const btn = document.getElementById('register-btn');
        btn.click(); 
      } 
    }
  }
}
</script>

<style>
  @media (max-width: 1250px) {
    #login-content {
      grid-template-columns: 1fr!important;
    }

    .login-page {
      text-align: center;
    }
  }
  #login-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 20px;
    background-color: white;
    padding: 30px;
    margin: 50px;
    border: 1px solid rgb(223, 223, 223);
    border-radius: 20px;
  }

  .login-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 30px;
    padding: 20px;
    border: 1px solid rgb(192, 192, 192);
    border-radius: 20px;
  }
  .login-page h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .login-page h2 {
    margin-bottom: 5px;
  }

  .login-page input[type=text], input[type=password] {
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    min-width: 300px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgb(170, 170, 170);
    box-sizing: border-box;
    transition: 0.4s;
  }

  .login-page input[type=text]:focus, input[type=password]:focus {
    outline: none;
    border: 1.5px solid rgb(131, 131, 255);
    box-shadow: 0px 0px 3px rgb(131, 131, 255);
  }

  .login-submit {
    text-align: center;
  }
  .login-page input[type=button] {
    padding: 10px;
    width: 100px;
    border: 1px solid rgb(180, 180, 180);
    background-color: rgb(108, 172, 255);
    border-radius: 10px;
    transition: 0.5s;
    font-weight: bold;
  }

  .login-page input[type=button]:hover {
    cursor: pointer;
    background-color: rgb(65, 145, 250);
    border: 1px solid rgb(0, 0, 0);
    color: white;
  }
  .login-page input[type=button]:focus {
    outline: none;
  }

  .cadastro {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .error {
    color: rgb(255, 143, 143);
    font-size: 15px;
    margin-bottom: 15px;
    transition: 1s;
  }

  .success {
    color: rgb(101, 253, 152);
    font-size: 15px;
    margin-bottom: 15px;
    transition: 1s;
  }

  ul {
    list-style-type: none;
  }


</style>