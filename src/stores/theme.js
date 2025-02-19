import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeIndex: 23,
    currentTheme: 'bg-',
    counter: 0
  }),

  getters: {
    doubleCount: (state) => state.counter
  },

  actions: {
    setCurrentTheme (index) {
      this.themeIndex = index
    },
    getCurrentTheme () {
      return `${this.currentTheme}${this.themeIndex}.jpeg`
    }
  }
})
