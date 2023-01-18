<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';

export default{
  //Guardamos el token si existe
  data() {
    return {
      token : localStorage.getItem('Token')
    };
  },
  created() {
         // Axios
         if(this.token != null){
      var objeto = {};
            objeto = { 
                "nombre"    : localStorage.getItem("Nombre"),
                "email"  : localStorage.getItem("Email"),
                "timestamp" : localStorage.getItem("Time"),
                "expedicion" :  localStorage.getItem("Exp"),
                "token" : this.token
            };
        console.log(objeto);
        axios.post("https://examenwebbackend.deta.dev/appLog/entity", objeto);
    }
  },

  //Al reload
  beforeUpdate() { 
        // Axios
    if(this.token != null){
      var objeto = {};
            objeto = { 
            "nombre": localStorage.getItem("Nombre").toString(),
            "email": localStorage.getItem("Email").toString(),
            "timestamp": localStorage.getItem("Time").toString(),
            "expedicion": localStorage.getItem("Exp").toString(),
            "token": localStorage.getItem("Token").toString()
            };
            console.log(objeto);
        axios.post("https://examenwebbackend.deta.dev/appLog/entity", objeto).then((result) => {
            console.log(this.id);
            });
    }
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
        alert("Timestamp: " + this.getTime() + "\nEmail: " + this.getEmail() + "\nCaducidad: " + this.getExp() + "\nID: " + this.getId() + "\nImagen: " + localStorage.getItem("Img"));
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

<div></div>

    <nav>
      <router-link to="/"> Inicio </router-link>
      <router-link to="/formulario" v-if="token"> Formulario </router-link>
      <router-link to="/verLista" v-if="token"> LOGS </router-link>
      
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
      <a class="boton_personalizado" v-on:click="mostrarUsuario();">Perfil</a>
    </div>

    <div class="logo" v-if="token" >
        <router-link to="/"  v-if="token" v-on:click="cerrarSesion();" ><a class="boton_personalizado" href="">Cerrar sesion</a></router-link>
    </div>
    <div></div>
  </header>
  <div padding-top="20px">
    <router-view/>
  </div>

</template>

<style>
@import './assets/header_style.css';
</style>
