<template>
    <section class="row inner-block-grande">
        <h4>{{titulo}}</h4>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of enCarro" :key="item.id" >         
                    <td>{{item.id}}</td> 
                    <td>{{item.nombre}}</td>
                    <td>{{item.marca}}</td>
                    <td>{{item.precio}}</td>
                    <td><a href="">Ver más</a></td>
                </tr>
            </tbody>
        </table>
        <p v-if="enCarro.length==0">No agregaste nada al carro aun</p>
        <article class="derecha">
            <button class="btn btn-secondary">Regresar</button>
        </article>
    </section>
</template>

<script>
    export default ({
        name:'TablaProds',
        data(){
            return{
                enCarro:JSON.parse(localStorage.getItem("carro"))||[]
            }
        },
        props:{
            titulo: String
        },
        mounted(){
            console.info(`mis props son de tabla prods ${JSON.stringify(this.$props)}`);
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando bootstrap