import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userName: null,
    email: null,
    favorites: null
  }),

  getters: {
    hasUser: (state) => {
      return state.userName ? true : false
    },
  },
  actions: {
    saveUserData({userName, email, favorites}) {
      this.userName = userName
      this.email = email
      this.favorites = favorites
    }
  }
})
