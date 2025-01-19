import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    counter: 0,
    showNav: LocalStorage.getItem('showNav'),
    todoList: [],
    projects: [],
    getTodoListLoader: false,
    getProjectsLoader: false,
    selectedMember: [],
    mobileSelectedProject: LocalStorage.getItem('mobileSelectedProject'),
    mobileSelectedProjectTodo: LocalStorage.getItem('mobileSelectedProjectTodo'),
    adminUser: LocalStorage.getItem('adminUser') || {}
  }),

  // not working, currently used localstorage
  persist: {
    storage: LocalStorage,
    paths: ['counter', 'showNav', 'todoList', 'projects', 'getTodoListLoader', 'getProjectsLoader', 'selectedMember', 'mobileSelectedProject'] // specify persisted paths
  },

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    },
    async getTodoList () {
      this.getTodoListLoader = true
      const todo = this.$fbref(this.$fbdb, 'todo')
      this.$fbonValue(todo, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.todoList = []
          return
        }
        const data_ = Object.values(data)
        this.todoList = data_
        console.log('this.todoList', this.todoList)
        this.getTodoListLoader = false
      })
    },
    async getProjects () {
      this.getProjectsLoader = true
      // const { boot } = useQuasar()
      console.log('window', window)
      // const projects = this.$fbref(this.$fbdb, 'projects')
      // this.$fbonValue(projects, (snapshot) => {
      //   const data = snapshot.val()
      //   if (this.$isFalsyString(data)) {
      //     this.projects = []
      //     return
      //   }
      //   const data_ = Object.values(data)
      //   this.projects = data_
      //   console.log('this.projects', this.projects)
      //   this.getProjectsLoader = false
      // })
    },
    async setSelectedProject (projectDetails) {
      this.mobileSelectedProject = projectDetails
    }
  }
})
