<script>
//Imports
import axios from 'axios';
import { GoogleMap, Marker } from 'vue3-google-map';

export default {
  name: "get-request",
  //Google y marker
  components: {
    GoogleMap,
    Marker
  },
  
  //Datos necesarios
  data() {
    return {
      vivienda: null,
      reservas: null,
      token: null,
      nombreUsuario: ""
    };
  },
  //Al crear
  created() {
    //recogemos nombre de usuario y token
    this.token = localStorage.getItem('Token');
    if(this.token != null){
      let nombre = localStorage.getItem('NombreUsuario');
      console.log(nombre)
      let indice = nombre.indexOf("@");
      // Cortar desde 0 hasta la aparición del @
      this.nombreUsuario = nombre.substring(0, indice);
    }

    //recogemos parametros en axios
    var parametro = this.$route.params.id;
    axios.get("https://examenwebbackend.deta.dev/appVivienda/vivienda", { params: { id: parametro } }).then(response => this.vivienda = response.data);
    axios.get("https://examenwebbackend.deta.dev/appReservas/reservas/viviendasAsociada/" + parametro).then(res => this.reservas = res.data);
  },
  methods: {
    //Map center de vivienda
    mapCenter() {
      return {
        lat: parseFloat(this.vivienda.latitud),
        lng: parseFloat(this.vivienda.longitud),
      }
    }
  }
}

</script>

<template>

  <!--
    Datos de la vivienda
  -->
  <div>
    <table class="tabla-Grande" v-if="vivienda">
      <tr>

        <td class="celda-Anuncio"><img :src='vivienda.foto' width="375" /></td>

        <td class="celda-Anuncio">

          <table class="tabla-Info">
            <tr>
              <td class="bold-text">Direccion:&nbsp;</td>
              <td>{{ vivienda.direccion }}</td>
            </tr>

            <tr>
              <td class="bold-text">Localidad:&nbsp;</td>
              <td>{{ vivienda.localidad }}</td>
            </tr>

            <tr>
              <td class="bold-text">Provincia:&nbsp;</td>
              <td>{{ vivienda.provincia }}</td>
            </tr>

            <tr>
              <td class="bold-text">Características:&nbsp;</td>
              <td>{{ vivienda.caracteristicas }}</td>
            </tr>

            <tr>
              <td class="bold-text">Capacidad:&nbsp;</td>
              <td>{{ vivienda.capacidad }}</td>
            </tr>

            <tr>
              <td class="bold-text">Precio/día:&nbsp;</td>
              <td>{{ vivienda.precio }}</td>
            </tr>

            <tr>
              <td class="bold-text">Vendedor:&nbsp;</td>
              <td>{{ vivienda.vendedor }}</td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

    <!--
      Muestra el mapa, con marcador y centrado en el mismo
    -->
    <div class="mapa" v-if="vivienda">
      <GoogleMap api-key="AIzaSyAVotfCRyxA9y3yBiOafDlwoessHlHleJk"
        style="width: 400px; height: 400px; align: center; padding-left: 25%; padding-right: 25%;"
        :center="this.mapCenter()" :zoom="16">
        <Marker :options="{ position: this.mapCenter() }" />
      </GoogleMap>
    </div>

    <!--
      Muestra comentarios
    -->

<!--
    <table class="tabla-Grande">
      <tr>
        <td>
          <div id="comentarios">
            <div>
              <label for="escribirComentario" class="comentario"> Comentarios </label><br />
              <textarea type="text" class="comentarioInput" v-model="comentario"
                placeholder="Escribe un comentario" id="textAreaComentario"></textarea>
            </div>

            <div id="botonComentario">
              <input v-if="token != null" type="button" class="botonPersonalizadoEnviarComentario" value="Enviar"
                v-on:click="comentar(comentario)" />
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <table v-for="comentario in vivienda.comentarios" class="tabla-Grande">
            <tr  class="fila-comentario"> 
              <td class="celda-Nombre"> 
                <div class="recuadro-nombre">
                  {{ comentario.usuario }}
                </div>
              </td>
              <td class="recuadro-texto"> 
                <div>
                  {{ comentario.texto }}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
-->
  </div>
</template>

<style scoped>
@import '../assets/mostrarInformacionStyle.css';
</style>