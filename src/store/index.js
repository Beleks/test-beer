import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showList: [], // отображаемый массив 
    nextPage: [], // массив который скрыт
    loadPage: 1, // показывает с какой страницы получать данные 
    listEmpty: false, // показывает закочился список или нет 
    // (значение listEmpty становиться "true" как только следующая страница возращает пустой массив)
    nextPageLoading: true, // по умолчанию список который скрыт находиться в статусе загрузки
    // ========================
    // 
    modal: false,
    editData: {
      index: 0,
      name: '',
      description: ''
    }
  },
  mutations: {
    CLOSE_MODAL(state) {
      state.modal = false
    },
    SET_CHANGE(state, params) {
      let index = state.editData.index
      let changeElement = state.showList[index]
      changeElement.name = params.name
      changeElement.description = params.description
      state.modal = false
    },
    OPEN_EDIT(state, params) {
      state.modal = true
      state.editData = params
    },
    DELETE_ELEMENT(state, index) {
      state.showList.splice(index, 1)
    },
    SHOW_NEXT(state) {
      state.showList = state.showList.concat(state.nextPage)
      state.nextPage = []
    },
    SET_BEER_MAS(state, massiv) {
      if (massiv.length !== 0) {
        if (state.showList.length === 0) {
          state.showList = state.showList.concat(massiv)
        } else {
          state.nextPage = state.nextPage.concat(massiv)
        }
      } else {
        // Если мы получили пустой массив, то список закончен 
        // кнопака (Show next) больше не будет показываться
        state.listEmpty = true
      }
    },
    SET_NUMBER_OF_PAGE(state, number) {
      state.loadPage = number
    },
    NEXT_PAGE_LOADING(state, status) {
      // Следующая страница загружена и есть возможность нажать на кнопку "show next"
      state.nextPageLoading = status
    }

  },
  actions: {
    GET_BEER({ commit, state }) {

      const URL = "https://api.punkapi.com/v2/beers"
      let loadPage = state.loadPage

      commit('NEXT_PAGE_LOADING', true) // Следующая страница становиться в статусе "Loadind.."

      function getPage(URL, page) {
        try {
          axios.get(URL, {
            params: {
              page,
              limit: 25
            }
          }).then(response => {
            console.log(response.data)
            commit('SET_BEER_MAS', response.data)
            // Если длина массива nextPage !== 0 , то получается следуюящая страница загружена. 
            // Кнопка (Loading... -> show next) 
            if (state.nextPage.length !== 0) {
              commit('NEXT_PAGE_LOADING', false)
            }
          })
        }
        catch (e) {
          console.log(e)
        }
      }

      // Вариант 1. 
      // Если у нас еще нет загруженныйх страниц:
      // То загружаем две страницы (numberOfPage = 2)
      // Первая при загрузке сразу идет в showList, массив который отображается
      // (!-  действие реализовано в мутации "SET_BEER_MAS"  -!) 
      // Вторая загружается (кнопка в статусе Loading...) и пока не доступна для просмотра.
      // После загрузки поподает в nexPage (массив который загружен, но скрыт)  (кнопака становиться в статусе "Show next")
      //--------------------------
      // 
      // Вариант 2.
      // Если у нас уже есть массив который отображется:
      // При нажатии на кнопку "Show next" объекты из массива nextPage переносятся в showList и они доступны для просмотра.
      // А массив nexPage = []
      // Далее идет запрос к следующией странице
      // Которая при загрузке попадает уже в nexPage. 
      // 

      let i = 0
      let numberOfPage
      if (state.showList.length === 0) {
        numberOfPage = 2
      } else {
        numberOfPage = 1
      }

      // имитация задержки (для визуальной проверки статуса Loading...)
      let interval = setInterval(() => {
        getPage(URL, loadPage)
        i++
        loadPage++
        if (i === numberOfPage) {
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
