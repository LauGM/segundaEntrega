<template>
    <div>
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
        <form class="inner-block" @submit.prevent="submit">
            <h3>Ingresar</h3>
            <div class="form-group">
                <label>Tu email</label>
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                >
                    <input type="email" class="form-control form-control-lg" v-model="usu" />
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
                    <input type="password" class="form-control form-control-lg" v-model="pass"/>
                    <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="derecha">
                <button type="submit" class="btn btn-dark" @click="validar()" :disabled="invalid">Ingresar</button>
            </div>
            <span v-if="encontrado===undefined">Usuario o PassWord incorrecta</span>
            <p class="forgot-password text-right mt-2 mb-4">
                No estás registrado ?
            </p>
        </form>
        </validation-observer>
    </div>
</template>

<script>
    //el siguiente json local en caso de superar las solicitudes diarias de mockaroo
    //import usus from '/Users/lau/Documents/Curso vue2022/segunda-entrega/src/usuarios.json'
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

    import {mapMutations} from 'vuex'

    export default {
        name:'LogIn',
        components:{
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                usu:"",
                pass:"",
                listaUsu:[],
                encontrado:null
            }
        },
        async created(){
            const URL="https://my.api.mockaroo.com/users.json?key=140b4040";
            await axios.get(URL).then((response) => (this.listaUsu=response.data));
            //this.listaUsu=usus;
            console.log("Usuarios registrados:")
            console.table(this.listaUsu,["email","password"]);
        },
        methods:{
              // en methods las mutaciones
            ...mapMutations([
            'actualizarUsuario'
            ]),
            submit () {
                this.$refs.observer.validate()
            },
            validar(){
                console.table(this.listaUsu);
                this.encontrado=this.listaUsu.find(usuario => usuario.email==this.usu && usuario.password==this.pass);
                if(this.encontrado){
                    console.log("Usuario autenticado con exito");
                    localStorage.setItem("logged",JSON.stringify(this.encontrado));
                    this.actualizarUsuario(this.encontrado.nombre);
                    this.$router.push('/products');
                }

            }
        }
    }
</script>