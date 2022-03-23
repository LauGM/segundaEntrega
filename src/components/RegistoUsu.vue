<template>
    <div>
    <div v-show="!usuarioLoggeado">
        <p>No puedes registrarte, ya hay un usuario autenticado</p>
    </div>
    <div v-show="usuarioLoggeado">
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
        <form class="inner-block" @submit.prevent="submit">
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
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                >
                <input type="email" class="form-control form-control-lg" v-model="email"/>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="form-group">
                <label>Tu Clave</label>
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|max:12|min:6"
                >
                <input type="password" class="form-control form-control-lg" v-model="clave1"/>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="form-group">
                <label>Repetir Clave</label>
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|max:12|min:6"
                >
                <input type="password" class="form-control form-control-lg" v-model="clave2"/>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="form-group">
                <input type="checkbox" id="checkbox" v-model="admin">
                <label>Es administrador ?</label>
            </div>
            <div class="derecha">
                <button type="submit" class="btn btn-dark" @click="validar()" :disabled="invalid">Registrarse</button>
            </div>
            <p class="forgot-password text-right mt-2 mb-4">
                Ya estas registrado ?
            </p>
        </form>
        </validation-observer>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { required, email, max, min } from 'vee-validate/dist/rules'
    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate'
    
    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    extend('max', {
        ...max,
        message: '{_field_} no debe ser mayor a {length} caracteres',
    })

    extend('min', {
        ...min,
        message: '{_field_} no deber ser menor de {length} caracteres',
    })

    export default {
        name:'RegUsu',
        data() {
            return {
                usuarioLoggeado:JSON.parse(localStorage.getItem('logged'))==null,
                nombre:'',
                apellido:'',
                email:'',
                clave1:'',
                clave2:'',
                admin:false
            }
        },
        components:{
            ValidationProvider,
            ValidationObserver
        },
        methods:{
            submit () {
                this.$refs.observer.validate()
            },
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
                        console.log("Registro enviado al servidor");
                        console.table(response.data);
                    })
                    .catch((err)=>{console.error(`${err}`)});
            }
        }
    }
</script>