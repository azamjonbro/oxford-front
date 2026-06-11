import { createStore } from 'vuex'
import axios from 'axios'

import { BACKEND_URL } from '../services/api'

const API_URL = `${BACKEND_URL}/api`

export default createStore({
  state: {
    categories: [],
    featuredProducts: [],
    loading: false
  },
  mutations: {
    SET_LANDING_DATA(state, data) {
      state.categories = data.categories
      state.featuredProducts = data.featuredProducts
    },
    SET_LOADING(state, status) {
      state.loading = status
    }
  },
  actions: {
    async fetchLandingData({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${API_URL}/landing-data`)
        commit('SET_LANDING_DATA', response.data)
      } catch (err) {
        console.error('Error fetching landing data:', err)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    allCategories: state => state.categories,
    featuredProducts: state => state.featuredProducts,
    isLoading: state => state.loading
  }
})
