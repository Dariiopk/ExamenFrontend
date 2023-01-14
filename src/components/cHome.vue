<script>

export default{
    data: function(){
        return{
            //Datos necesarios
            busqueda : "",
            token: localStorage.getItem('Token')
        };
    },
    methods: {
    //Pone el placeholder
    getPlaceholder() {
      return "Busca algo:";
    },
    //Recoge el texto de busqueda 
    getBusqueda(){
        return " " + this.busqueda;
    }
    }
  
};

</script>


<template>
 
    <div>
        <h1>Examen enero</h1>
    </div>

    <div class="buscar">
        <input v-model="busqueda" :placeholder="getPlaceholder()" />
        <router-link :to="{ name: 'verListaLocalidad', params: { localidad: getBusqueda()  }}" ><a class="boton_personalizado" href="">Buscar</a></router-link>
    </div>

    <!--
        QUITABLE
    -->
    <table class="tabla-Inicio">    
        <tr v-if="token">
            <td class="text-button"><router-link to="/formulario" ><a class="boton_personalizado">Crear anuncio</a></router-link></td>
            <td class="text-cell">¿Tiene viviendas vacias y le gustaria ganar un dinero? Entonces comienze registrando su casa en nuestra aplicación.
                                    ¡Introduciendo pocos datos podra convertir su casa en una residencia vacacional y ganarse un dinero extra!
            </td>
        </tr>

        <tr>
            <td class="text-cell">¿Esta buscando donde pasar las vacaciones? Entonces mire todas las ofertas de residencias vacacionales que ofrecen nuestros usuarios.
                                    Cuando le guste una podra reservarlá en las fechas que usted prefieras, realizando un pago seguro a traves de PayPal. ¿A qué espera?
            </td>
            <td class="text-button"><router-link to="/verLista" ><a class="boton_personalizado" href="">Ver anuncios</a></router-link></td>
        </tr>
    </table>

</template>

<style setup>
@import '../assets/componenteHomeStyle.css';
</style>