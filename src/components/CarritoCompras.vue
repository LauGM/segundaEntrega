<template>
    <section class="inner-block-grande">
        <h4>Listado de Productos en stock</h4>
        <article class="row card-deck">
            <div class="col-sm-4 card" v-for="item of listaStock" :key="item.id">
                <img class="card-img-top" :src="item.imagen" alt="Card image cap">
                <div class="card-body">
                    <h6 class="card-title">{{item.nombre}}</h6>
                    <p class="card-text">Marca: {{item.marca}}</p>
                    <p class="card-text">Precio $ {{item.precio | filtroDecimal}}</p>
                    <button class="btn btn-dark" @click="agregar(item)">Comprar</button>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
    //el siguiente json local en caso de superar las solicitudes diarias de mockaroo
    //import stock from '../data/productos.json'
    import axios from 'axios'
    export default ({
        name:'CarritoCompras',
        data(){
            return{
                agregados:JSON.parse(localStorage.getItem("carro"))||[],
                listaStock:[]
            }
        },
        async created(){
            const URL="https://my.api.mockaroo.com/products.json?key=140b4040";
            await axios.get(URL)
            .then((response) => (this.listaStock=response.data))
            .catch(function (err) {
                console.error(err);
            })
        },
        // beforeMount(){
        //     if(this.listaStock.length==0){
        //         console.log("Utilizando el archivo local")
        //         console.log(stock)
        //         this.listaStock=stock;
        //         console.log("Stock local cargado:");
        //     }
        // },
        methods:{
            agregar(item){
                this.agregados.push(item);
                console.table(this.agregados);
                localStorage.setItem("carro",JSON.stringify(this.agregados));
            }
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando bootstrap