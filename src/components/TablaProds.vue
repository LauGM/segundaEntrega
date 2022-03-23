<template>
    <section class="row inner-block-grande">
        <h4>Productos en el Carrito</h4>
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
                <tr v-for="(item,index) of enCarro" :key="index" :id="index+'_'+item.id">         
                    <td>{{item.id}}</td> 
                    <td>{{item.nombre}}</td>
                    <td>{{item.marca}}</td>
                    <td>{{item.precio}}</td>
                    <td><button :id="'btn'+index + item.nombre" class="btn btn-light" @click="eliminar(index, item.id)">🗑️</button></td>
                </tr>
            </tbody>
        </table>
        <p v-if="enCarro.length==0">No agregaste nada al carro aun</p>
        <article class="botonera">
            <button class="btn btn-dark">Comprar</button>
            <p>Total de la compra $ {{calcularTotal}}</p>
            <button class="btn btn-secondary">Regresar</button>
        </article>
    </section>
</template>

<script>
    export default ({
        name:'TablaProds',
        data(){
            return{
                enCarro:JSON.parse(localStorage.getItem("carro"))||[],
                totalCompra:0
            }
        },
        methods:{
            eliminar(index, itemId){
                let idFormado=index+'_'+itemId;
                console.log("el id que voy a sacar de la tabla" + idFormado)
                // let filaABorrar=document.getElementById(idFormado);
                // console.log(filaABorrar)
                // filaABorrar.parentNode.removeChild(filaABorrar);
                console.log(index)
                console.log("voy a remover "+this.enCarro[index].marca)
                this.enCarro.splice(index,1);
                console.log("Lo que quedo en carro:")
                console.log(this.enCarro);
                localStorage.setItem('carro',JSON.stringify(this.enCarro));
            }
        },
        computed:{
            calcularTotal(){
                let total=0;
                for (const prod of this.enCarro){
                    total+=prod.precio;
                }
                return total;
            }
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando bootstrap