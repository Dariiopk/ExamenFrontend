<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
  //Guardamos el token si existe
  data() {
    return {
      token : localStorage.getItem('Token')
    };
  },
  methods: {

    //Recogemos el email
    getEmail(){
        return localStorage.getItem('Email');
    },
    //Recogemos el tiempo de expiracion
    getExp(){
        return localStorage.getItem('Exp');
    },
    //Recogemos el timestamp
    getTime(){
        return localStorage.getItem('Time');
    },
    //Recogemos el id 
    getId(){
        return localStorage.getItem('Id');
    },
    //Mostramos un alert con la información
    mostrarUsuario(){
        alert("Timestamp: " + this.getTime() + " -- Email: " + this.getEmail() + "    Caducidad: " + this.getExp() + " -- ID: " + this.getId());
    },
    //Borramos los datos guardados
    cerrarSesion(){
      localStorage.clear();
      this.token = undefined;
      location.reload();
    }
    }
}

</script>


<template>
  
  <header>
    <!--
      HEADER
    -->
    <div class="logo">
      <h2 class="logo-nombre">
        <router-link to="/"> Examen enero </router-link>
      </h2>
    </div>

    <nav>
      <router-link to="/"> Inicio </router-link>
      <router-link to="/verLista" > Ver </router-link>
      <router-link to="/formulario" v-if="token"> Formulario </router-link>
    </nav>

    <!--
      Boton inicio de sesión
    -->
    <div class="logo" v-if="!token">
      <a class="g_id_signin" data-type="standard" data-shape="pill" data-size="large" ></a>
    </div>
    
    <!--
      Si se ha iniciado sesion, boton con info y cerrar sesion
    -->
    <div class="logo" v-if="token" >
        <button class="email" v-if="token" v-on:click="mostrarUsuario();" > Usuario </button>
    </div>

    <div class="logo" v-if="token" >
        <button class="cerrar" v-if="token" v-on:click="cerrarSesion();" > Cerrar Sesion</button>
    </div>

  </header>
  <div padding-top="20px">
    <router-view/>
  </div>

</template>

<style>
@import './assets/header_style.css';
</style>
