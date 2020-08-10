
<h3 align="center">
    <img alt="logo" title="#logo" width="150px" src=".github/inimal_logo.jpeg">
</h3>

<h3 align="center">iNimal - Animal Care</h3>

<div align="center"> 

  <a href="https://www.linkedin.com/in/leonardo-altemari-008a8017b/">
    <img alt="v-piantoni" src="https://img.shields.io/badge/made%20by-Leonardo%20Altemari-brightgreen" />
  </a>

  <a href="https://github.com/leoaltemari/iNimal/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen" />
  </a>

</div>

---

### 📺 Apresentação:

<strong>iNimal - Animal Care</strong> é uma página web para a venda de produtos e agendamento de serviço para animais.

<h3 align="center">
    <img alt="projeto" title="#demonstration" width="500px" src=".github/inimal_demonstration.gif">
</h3>

#### 📖 Documentação completa da aplicação

```sh
    # Copie o link a seguir no seu navegador e acesse a documentação completa(não há necessidade estar logado em uma conta gmail)
    https://docs.google.com/document/d/1kVf9pxN6TKqckBXM0FgAQYBl8nSYzKLNb7x_u3GaAmU/edit?usp=sharing
```

---

### 🚀 Tecnologias utilizadas

- [Node](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vue.js](https://vuejs.org/)
- [HTML 5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS 3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScritp(ES6)](https://www.javascript.com/)

---

### 🔥 Instalação e inicialização

#### Pré-requisitos

- É <strong>necessário</strong> ter instalado o [Node.js](https://nodejs.org/en/) qualquer versão <strong>acima de 10</strong>.
- O projeto foi desenvolvido utilizando NPM 
- <strong>Não precisa </strong>instalar o banco de dados pois foi utilizado a nuvem(Atlas) para armazenar os dados.
- É necessário colocar uma connection string no arquivo de configuração(/server/config.js) de um banco MongoDB que vc tenha permissão de acesso.

##### 1º ⏩ Faça o clone no repositório:

```sh
    $ git clone https://github.com/leoaltemari/iNimal.git
```

##### 2º ⏩ Instale as dependências usando NPM e execute a aplicação:

- Iniciando a API

```sh
    # Pelo terminal entre na pasta server
    $ cd server/

    # Instale as dependências
    $ npm install

    # Aguarde a instalação das dependencias e em seguida inicie o server
    $ npm start
```

- Iniciando a aplicação

```sh
    # Pelo terminal de comando entre na pasta inimal
    $ cd inimal/

    # Instale as dependências
    $ npm install

    # Aguarde a instalação das dependencias e em seguida inicie o server
    $ npm start

    # Automaticamente será aberta uma janela no seu navegador padrão.
    # Caso isso não ocorra acesse: http://localhost:8080/#/.
```

---

### 🔎 Dependências

#### Backend
- express
- jsonwebtoken
- mongoose
- multer
- md5
- cors
- dotenv
- nodemon
- guid

#### Web Page
- axios
- jquery
- vue
- vue-router
---

### 🔐 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.