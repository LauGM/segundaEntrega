import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioActivo:"Anonimo"
  },
  getters: {
  },
  mutations: {
    actualizarUsuario(state,nuevoUsuario){
      state.usuarioActivo=nuevoUsuario;
    }
  },
  actions: {
  },
  modules: {
  }
})
