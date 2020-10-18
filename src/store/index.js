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
    // Решил сделать следующим образом: 
    // данные для редоктирования в state, а из state в modal
    // А потому уже по index обращаться к элементу массива showList и заменять данные 
    // (Просто вариант с props и emmit в голове мне не очень понравился из-за потенциальной большой вложенности )
    // 
    modal: false, // показывает открыто ли модальное окно
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
      // сохраняем данные
      let index = state.editData.index
      let changeElement = state.showList[index]
      changeElement.name = params.name
      changeElement.description = params.description
      state.modal = false
    },

    OPEN_EDIT(state, params) {
      state.modal = true
      // передаем данные из CardBeer (по которому мы кликнули) в state 
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
      // 
      // Если бы мы обращались к api следующей стр. (после клика) что бы получить страницу,
      // то в конеце списка у нас показывалась бы кнопка cо статусом (show next)
      // После нажатия на которую мы бы сначала получили пустой массив, а уже потом скрыли бы кнопку.
      // Это я считаю не совсем правильно поэтому решил загружать данные следующей стр. что бы своевременно скрыть кнопку
      // и не сбить потенциального пользователя с толку.


      let i = 0
      let numberOfPage
      if (state.showList.length === 0) {
        numberOfPage = 2
      } else {
        numberOfPage = 1
      }

      // имитация задержки (для визуальной проверки статуса Loading...)
      // Если setInterval поставить 0,
      // То задержка будет незначительная и вторая страница (page 2) может загрузиться раньше чем (page 1)

      // Я считаю что это не критично но так же мог и реализовать последовательную загрузку.
      let interval = setInterval(() => {
        getPage(URL, loadPage)
        i++
        loadPage++
        if (i === numberOfPage) {
          // сохраняем в state номер страницы .  
          commit("SET_NUMBER_OF_PAGE", loadPage)
          clearInterval(interval)
        }
      },0);
    }
  },
  modules: {
  }
})
