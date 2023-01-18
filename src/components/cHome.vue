<script>

import axios from 'axios';
import { GoogleMap, Marker } from 'vue3-google-map';

export default{
    components: {
    GoogleMap,
    Marker
    },
    data: function(){
        return{
            //Datos necesarios
            aparcamientos: null,
            token: localStorage.getItem('Token')
        };
    },
    created(){
      axios.get("https://examenwebbackend.deta.dev/appEntity/entities/" + 36.7201600 + "/" + -4.4203400).then(response => this.aparcamientos = response.data);
    },
    methods: {
    mapCenter() {
      return {
        lat: 36.7201600,
        lng: -4.4203400,
      }
    }
    }
  
};

</script>


<template>
 
    <div>
        <h1>Examen enero</h1>
    </div>

    <div v-if="token">

    <div class="bot">
      <RouterLink to="/formulario">
        <a class="boton_personalizado" href="">Formulario</a>
      </RouterLink>
    </div>

    <div class="mapa">
      <GoogleMap api-key="AIzaSyAVotfCRyxA9y3yBiOafDlwoessHlHleJk"
        style="width: 400px; height: 400px; align: center; padding-left: 36%; padding-right: 25%; padding-top: 5%;"
        :center="this.mapCenter()" :zoom="16">
        <Marker :options="{ position: this.mapCenter() }" />
      </GoogleMap>
    </div>

    <h2 v-if="!this.aparcamientos">
        No existen aparcamientos cerca
      </h2>

      <table v-else class="tabla-Todo">
        <tr class="fila-encabezado">

   
            <td class="celda-text" >Nombre</td>
            <td class="celda-text" >Direccion</td>
            <td class="celda-text" >Capacidad</td>
            <td class="celda-text" >Libres</td>
            <td class="celda-text" >Correo</td>
        </tr>

        <tr class="fila" v-for="aparcamiento in aparcamientos" :key="aparcamiento.poiID" >

          <td class="celda-text" > {{aparcamiento.nombre}} </td>

          <td class="celda-text" >{{aparcamiento.direccion}}</td>

          <td class="celda-text" >{{aparcamiento.capacidad}}</td>

          <td class="celda-text" >{{aparcamiento.libres}}</td>

          <td class="celda-text" >{{aparcamiento.correo}}</td>

        </tr>
      </table>
    </div>

    <div v-else>
      <h2>Inicia sesion primero</h2>
    </div>


</template>

<style setup>
@import '../assets/componenteHomeStyle.css';
</style>