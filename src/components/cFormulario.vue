<script>

import axios from 'axios';
/* eslint-disable no-undef */
import {computed, ref} from 'vue'
import {useGeolocation} from './useGeolocation'
import {Loader} from '@googlemaps/js-api-loader'

//Poner su propia API KEY de Google
const GOOGLE_MAPS_API_KEY = 'AIzaSyAVotfCRyxA9y3yBiOafDlwoessHlHleJk'

export default {
    name: "get-request",
    data(){
        return{
            aparcamientos: null,
            latitud: this.resul_lat,
            longitud: this.resul_lng,
            token : jwt_decode(localStorage.getItem('Token'))
        }
    },
    created() {
    // Si llega por parametros un filtro
    if(sessionStorage.getItem('placeInput') != null){
        axios.get("https://examenwebbackend.deta.dev/appEntity/entities/" + 36.7201600 + "/" + -4.4203400).then(response => this.aparcamientos = response.data);
    }
},
methods: {
    actualizarMapa(){
        axios.get("https://examenwebbackend.deta.dev/appEntity/entities/" + this.latitud + "/" + this.longitud).then(response => this.aparcamientos = response.data).then(console.log(this.aparcamientos));
    }
    },

    //PARA EL MAPA
    setup() {
        //Recojo localizacion actual
        //const {coords} = useGeolocation()
        const currPos = computed(() => ({
            lat: 36.7201600,
            lng: -4.4203400
        }))
        
        //Carga de la key
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY, libraries: ['places']
        });
        let mapDiv = ref(null)
        let map = ref(null)
        let marker = ref(null)
        let resul_lat = ref(null);
        let resul_lng = ref(null);
        let resul_dir = ref(null);
        
        //Inicializar mapa
        loader.load().then(() => {
            let center;
            if (sessionStorage.getItem('center')) {
                console.log('session')
                center = JSON.parse(sessionStorage.getItem('center'))
                document.getElementById('place-input').value = sessionStorage.getItem('placeInput')
                resul_lng.value = center.lng;
                resul_lat.value = center.lat;
                
            } else {
                center = currPos.value;
                resul_lng.value = center.lng;
                resul_lat.value = center.lat;
            }

            

            map.value = new google.maps.Map(mapDiv.value, {
                //centrado en posicion actual
                center: center,
                zoom: 18
            })
            marker = new google.maps.Marker({
                map: map.value,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: center
            })
            google.maps.event.addListener(marker, 'dragend', function () {
                resul_lat.value = marker.getPosition().lat()
                resul_lng.value = marker.getPosition().lng()
                center = {
                    lat: resul_lat.value,
                    lng: resul_lng.value
                }
                //guardar center por arrastre
                sessionStorage.setItem('center', JSON.stringify(center))
            })
            //autocompletar
            const placeInput = document.getElementById("place-input");
            const options = {
                componentRestrictions: {country: "es"},
                types: ['geocode']
            }
            const autocomplete = new google.maps.places.Autocomplete(placeInput, options);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                //obtener el lugar
                let place = autocomplete.getPlace();
                resul_dir.value = place.formatted_address;
                sessionStorage.setItem('placeInput', placeInput.value)
                center = place.geometry.location;
                //guardar center por busqueda plces
                sessionStorage.setItem('center', JSON.stringify(center))
                //centrar el mapa en el lugar
                map.value.setCenter(center)
                //poner marcador en ese lugar
                marker.setPosition(center)
                sessionStorage.setItem('map', map.value);
                sessionStorage.setItem('marker', marker.value);

                resul_lat.value = center.lat();
                resul_lng.value = center.lng();
                });
        })
        return {
            //mapa
            mapDiv,
            //coordenadas
            resul_lat, resul_lng, resul_dir
        }
    }
}
</script>

<template>

<h1>Busca una direccion</h1>

            <!-- Autocomplete location search input -->
            <label for="direccion">Direccion</label><br>
            <input class="w-full" id="place-input" type="text" required />
            <button v-on:click="actualizarMapa();">Buscar</button>
            <br>

        <div class="m-6" ref="mapDiv" style="width: 40%; height: 400px; margin-left: 470px; margin-top: 5%;">
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

</template>

<style>
    div#mapa{
        margin-top: 100px;
    }
</style>