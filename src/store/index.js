import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    loadPage: 13, // показывает с какой страницы получать данные 
    listEmpty: false, // показывает закочился список или нет 
    // (значение listEmpty становиться "true" как только следующая страница возращает пустой массив)
    nextPageLoading: true // по умолчанию список который скрыт находиться в статусе загрузки
  },
  mutations: {
    SET_BEER_MAS(state, massiv) {
      if (massiv.length !== 0) {
        state.list = state.list.concat(massiv)
      } else {
        state.listEmpty = true
      }
    },
    SET_NUMBER_OF_PAGE(state, number) {
      state.loadPage = number
    },
    NEXT_PAGE_LOADING(state) {
      // Следующая страница загружена и есть возможность нажать на кнопку "show next"
      state.nextPageLoading = false
    }
  },
  actions: {
    GET_BEER({ commit, state }) {

      const URL = "https://api.punkapi.com/v2/beers"
      let loadPage = state.loadPage
      let checkMas = []

      // async
      function getPage(URL, page) {
        try {
          // await
          axios.get(URL, {
            params: {
              page,
              limit: 25
            }
          }).then(response => {
            console.log(response.data, 'response')
            commit('SET_BEER_MAS', response.data)
            checkMas.push(response.data)
            // Если длина массива checkMas = 2, то получается следуюящая страница загружена. 
            // Кнопка (Loading... -> show next) 
            if (checkMas.length === 2) {
              commit('NEXT_PAGE_LOADING')
            }
          })
        }
        catch {

        }
      }


      // for (let i = loadPage; i < loadPage + 2; i++) {
      //   getPage(URL, i)
      // }


      let i = 0
      // имитация задержки (для проверки статуса Loading...)
      let interval = setInterval(() => {
        getPage(URL, loadPage)
        i++
        loadPage++
        if (i === 2) {
          // сохраняем в state номер страницы .  
          commit("SET_NUMBER_OF_PAGE", loadPage)
          clearInterval(interval)
        }
      }, 1000);
    }
  },
  modules: {
  }
})
