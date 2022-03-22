<template>
    <div>
        <form class="inner-block">
            <h3>Registrate</h3>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control form-control-lg" v-model="nombre"/>
            </div>
            <div class="form-group">
                <label>Apellido</label>
                <input type="text" class="form-control form-control-lg" v-model="apellido"/>
            </div>
            <div class="form-group">
                <label>Tu email</label>
                <input type="email" class="form-control form-control-lg" v-model="email"/>
            </div>
            <div class="form-group">
                <label>Tu Clave</label>
                <input type="password" class="form-control form-control-lg" v-model="clave1"/>
            </div>
            <div class="form-group">
                <label>Repetir Clave</label>
                <input type="password" class="form-control form-control-lg" v-model="clave2"/>
            </div>
            <div class="form-group">
                <input type="checkbox" id="checkbox" v-model="admin">
                <label>Es administrador ?</label>
            </div>
            <div class="derecha">
                <button type="submit" class="btn btn-dark" @click="validar()">Registrarse</button>
            </div>
            <p class="forgot-password text-right mt-2 mb-4">
                Ya estas registrado ?
            </p>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'RegUsu',
        data() {
            return {
                nombre:'',
                apellido:'',
                email:'',
                clave1:'',
                clave2:'',
                admin:false
            }
        },
        methods:{
            validar(){
                const nuevoUsu={
                    id:1,
                    email:this.email,
                    password:this.clave1,
                    nombre:this.nombre,
                    apellido:this.apellido,
                    admin:true
                }
                console.log(nuevoUsu);
                axios.post("https://my.api.mockaroo.com/users.json?key=140b4040",JSON.stringify(nuevoUsu))
                    .then((response)=>{
                        console.table(response.data)
                    })
                    .catch((err)=>{console.error(`${err}`)});
            }
        }
    }
</script>