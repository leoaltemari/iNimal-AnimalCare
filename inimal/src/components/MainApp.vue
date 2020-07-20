<template>
  <div class="main">
    <!-- Main logo -->
    <div class="text-content logo">
      <img src="../assets/img/logos/inimal_logo.jpeg" alt="">
    </div>

    <!-- Who we are -->
    <div class="text-content">
      <h2>Quem somos</h2>
      <img src="../assets/img/icons/osso.png" alt="" class="img1">
      <p>A iNimal é uma das maiores redes de vendas de produtos e serviços 
        voltadas especialmente para os cuidados do animal de estimação.</p>
      <img src="../assets/img/icons/osso.png" alt="" class="img2">
    </div>

    <!-- Our products -->
    <div class="text-content">
      <h2>Confira nossos produtos</h2>
      <img src="../assets/img/icons/osso.png" alt="" class="img1">
      <p>Aqui na iNimal você pode econtrar diversos itens para o seu pet, 
        como coleiras, ração, brinquedos, entre outros. Contamos 
        com um leque de variedades em rações, para qualquer tipo de animal, 
        das melhores marcas.</p>
      <img src="../assets/img/icons/osso.png" alt="" class="img2">
    </div>

    <!-- Our services -->
    <div class="text-content">
      <h2>Confira nossos serviços</h2>
      <img src="../assets/img/icons/osso.png" alt="" class="img1">
      <p>Nos preocupamos sempre com o bem estar do seu pet, por isso possuimos 
        uma vasta gama de serviços que podemos oferecer para o seu pet. Também 
        nos preucupamos com o bem estar dele, por isso oferecemos para você serviços
        de banho e tosa.</p>
      <img src="../assets/img/icons/osso.png" alt="" class="img2">
    </div>

    <!-- Social medias -->
    <div class="text-content">
      <h2>Nossas redes sociais</h2>
      <img src="../assets/img/icons/osso.png" alt="" class="img1">

      <!-- Logos -->
      <div class="logos">
        <!-- FACEBOOK -->
        <a href="https://www.facebook.com" target="blank">
          <img src="../assets/img/logos/fb_logo.png" alt="">
        </a>

        <!-- WHATS APP -->
        <a href="https://www.whatsapp.com/?lang=pt_br" target="blank">
          <img src="../assets/img/logos/wpp_logo.png" alt="">
        </a>

        <!-- INSTAGRAN -->
        <a href="https://www.instagram.com/" target="blank">
          <img src="../assets/img/logos/insta_logo.png" alt="">
        </a>

        <!-- MESSAGER -->
        <a href="https://www.messenger.com" target="blank">
          <img src="../assets/img/logos/msg_logo.png" alt="">
        </a>
      </div>
      <img src="../assets/img/icons/osso.png" alt="" class="img2">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
}
</script>

<style scoped>
  #main {
    text-align: center;
    display: grid;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .text-content {
    text-align: center;
    background-color: rgb(255, 255, 255);
    margin: 40px;
    /* width: 600px; */
    padding: 30px;
    border: 1px solid rgb(0, 0, 255);
    box-shadow: 0px 0px 5px black;
    border-radius: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
  }

  .text-content h2 {
    margin-bottom: 30px;
  }

  .text-content p {
    padding-left:30%;
    padding-right:30%;
  }

  .text-content img {
    width: 100px;
    height: 100px;
  }

  .img1 {
    float: left;
    position: relative;
    top: -80px;
  }

  .img2 {
    float: right;
    position: relative;
    top: -80px;
  }

  .logos {
    position: relative;
    left: -60px;
  }

  .logos  img{
    height: 50px;
    width: 50px;
  }

  .logo img {
    height: 200px;
    width: 300px
  }
</style>
