import Vue from 'vue'
import Vuex from 'vuex'
import {sync} from 'vuex-router-sync'
import {router, linkStore} from '../routers'
import * as mutations from './mutations'
// import * as actions from './actions'
import {state} from './state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state, mutations,
  modules: {},
})

sync(store, router)

export const commit = store.commit
