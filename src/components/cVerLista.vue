<script>
import axios from 'axios';

export default {
  name: "get-request",
  data() {
    return {
      //Viviendas en null, luego se inicializa
      logs: null
    };
  },

  //Cuando se crea la pagina
  created() {
      axios.get("https://examenwebbackend.deta.dev/appLog/entities").then(response => this.logs = response.data);
  }
};

</script>


<template>
      <!--
        Si no hay viviendas no se muestra nada
      -->
      <h2 v-if="!this.logs">
        No existen logs
      </h2>

      <table v-else class="tabla-Todo">
        <tr class="fila-encabezado">

          <!--
            Tipos de la tabla
          -->
            <td class="celda-log" >Nombre</td>
            <td class="celda-log" >Email</td>
            <td class="celda-log" >Timestamp</td>
            <td class="celda-log" >Caducidad</td>
            <td class="celda-log" >Token</td>
        </tr>

        <!--
          v-for: para mostrar todas los items por key
          item.loquesea
          botón con param _id
        -->
        <tr class="fila" v-for="log in logs" :key="log._id">

          <td class="celda-log" > {{log.nombre}} </td>

          <td class="celda-log" >{{log.email}}</td>

          <td class="celda-log" >{{log.timestamp}}</td>

          <td class="celda-log" >{{log.expedicion}}</td>

          <td class="celda-log" >{{log.token}}</td>

        </tr>
      </table>

</template>

<style>
@import '../assets/listasStyle.css';
</style>