import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userName: 'sergio sanhueza',
    email: 'sergio.sergio.98@hotmail.com',
    favorites: [20, 15, 40]
  }),
  getters: {
    userCredentials: (state) => {
      return {
        name: state.userName,
        email: state.email
      }
    },

  },
  actions: {
    increment() {
      this.counter++
    }
    // signIn() {

    // }
  }
})
