<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row justify-between">
      <q-input dark standout="bg-transparent" input-class="text-right text-accent" v-model="text" :dense="dense" :style="{
        width: '100%'
      }">
        <template v-slot:prepend>
          <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
        </template>
        <template v-slot:append>
          <q-icon v-if="text === ''" name="las la-search" class="text-accent" />
          <q-icon v-else name="clear" class="cursor-pointer text-black" @click="text = ''" />
        </template>
      </q-input>
    </div>
    <div class="row full-width justify-between items-center">
      <strong class="text-bold text-h6 text-white">Todo List</strong>
      <q-icon size="md" color="accent" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
    </div>
    <q-list class="scroll" style="height: 62vh;">
      <div class="column gap-5" v-if="loadingtodoList">
        <q-skeleton type="rect" :style="{
          height: '35px'
        }" />
        <q-skeleton type="rect" :style="{
          height: '35px'
        }" />
        <q-skeleton type="rect" :style="{
          height: '35px'
        }" />
      </div>

      <div class="column gap-5 mt-5" v-if="loadingtodoList">
        <q-skeleton type="rect" :style="{
          height: '35px'
        }" />
        <q-skeleton type="rect" :style="{
          height: '35px'
        }" />
        <q-skeleton type="rect" :style="{
          height: '35px'
        }" />
      </div>

      <q-item tag="label" v-ripple v-for="item in todoList" :key="item">
        <q-item-section>
          <q-item-label class="text-primary">{{ item.todoDesc }}</q-item-label>
          <q-item-label class="text-secondary" caption>
            {{ item.todoTitle }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row items-center">
            <q-toggle v-model="item.isArchived" :val="item.isArchived" :class="{
              'cursor-not-allowed': !item.isCompleted
            }" checked-icon="clear" unchecked-icon="check" color="negative">
              <template v-slot:label>
                {{ item.isCompleted ? 'Archive' : '' }}
              </template>
            </q-toggle>
            <q-btn rounded dense icon="las la-edit" flat class="text-accent" @click="viewTodoDetail(item)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loadingtodoList" label="Please wait..." label-class="text-teal"
      label-style="font-size: 1.1em"><q-spinner-ios :style="{
        'font-size': '40px'
      }" color="primary" />
    </q-inner-loading>
  </div>
  <!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn class="round-btn" color="primary" icon="las la-arrow-left"
      @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)" />
  </q-page-sticky> -->
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="sm" icon="las la-exclamation" color="cancel" text-color="white" />
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative"
          v-close-popup />
        <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="primary"
          @click="callConfirmFn()" :loading="confirmBtnLoader" :disable="confirmBtnLoader">
          <template v-slot:loading>
            <q-spinner-ios />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage } from 'quasar'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectTodo',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const loadingtodoList = ref(false)
    const mainStore = useMainStore()

    return {
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      confirmBtnLoader: ref(false),
      mainStore,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      check1: ref(true),
      check2: ref(true),
      check3: ref(false),
      check4: ref(true),
      check5: ref(false),
      check6: ref(false),

      notif1: ref(true),
      notif2: ref(true),
      notif3: ref(false),

      volume: ref(6),
      brightness: ref(3),
      mic: ref(8),
      text: ref(''),
      ph: ref(''),
      dense: ref(true),
      todoList: ref([]),
      selectedMember: ref([]),
      completedTodos: ref([]),
      loadingtodoList,
      loadingSubmit: ref(false),
      reset_: null
    }
  },
  props: {
    title: String,
    likes: Number
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  beforeCreate () {
    // console.log('beforeCreate')
  },
  created () {
    // console.log('created')
  },
  beforeMount () {
    // console.log('beforeMount')
  },
  mounted () {
    this.showTextLoading()
    this.getTodoList()
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
  },
  updated () {
    // console.log('updated')
  },
  beforeUnmount () {
    // console.log('beforeUnmount')
  },
  unmounted () {
    // console.log('unmounted')
  },
  methods: {
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async getTodoList () {
      this.loadingtodoList = true
      console.log('this.$route', this.$route.params.projectId)
      // const todo = this.$fbref(this.$fbdb, 'todo')
      const todo = this.$fbref(this.$fbdb, `task/${this.$route.params.projectId}`)
      this.$fbonValue(todo, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.todoList = []
          this.loadingtodoList = false
          return
        }
        const data_ = Object.values(data)
        console.log(data_)
        this.sortList(data_, 'section')
        // this.todoList = data_
        console.log('this.todoList', this.todoList)
        this.selectedMember = this.todoList
          .filter((e) => e.isCompleted)
          .map((x) => x.id)
        this.getCompletedTodos()
        this.loadingtodoList = false
      })
    },
    async sortList (arr, field) {
      this.todoList = arr?.sort((a, b) => {
        const nameA = a[field].toUpperCase() // ignore upper and lowercase
        const nameB = b[field].toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      })
    },
    async changeSelected (val) {
      // console.log(val)
      if (val.length < 1) {
        this.completedTodos = []
        return
      }
      const completed = this.todoList.filter((e) => val.includes(e.id))
      this.completedTodos = completed
      // console.log('->', this.completedTodos)
    },
    getCompletedTodos () {
      const completed = this.todoList.filter((e) => e.isCompleted === true)
      this.completedTodos = completed
    },
    updateTodo () {
      this.$q.notify({
        icon: 'check_circle',
        color: 'green',
        message: 'Feature Revamp',
        position: 'top-right',
        classes: 'notify-custom-css'
      })
      // this.confirmBtnLoader = true
      // // console.log('updating todo', this.todoList)
      // // console.log('this.completedTodos', this.completedTodos)
      // const mapIds = this.completedTodos.map((m) => m.id)
      // const updates = {}

      // this.todoList.forEach((element) => {
      //   console.log(element.id)
      //   if (mapIds.includes(element.id)) {
      //     element.isCompleted = true
      //     updates[`todo/${element.id}/isCompleted/`] = true
      //   } else {
      //     element.isCompleted = false
      //     updates[`todo/${element.id}/isCompleted/`] = false
      //   }

      //   updates[`todo/${element.id}/isArchived/`] = element.isArchived
      // })
      // console.log('updated todoList', this.todoList)
      // console.log('updates', updates)

      // // slash at the end is very important (../avatar/)
      // // updates[`todo/${this.uid}/avatar/`] = 'url-of-avatar.png'

      // this.$fbupdate(this.$fbref(this.$fbdb), updates)
      //   .then(() => {
      //     setTimeout(() => {
      //       this.confirmBtnLoader = false
      //       this.confirm = false
      //       this.$q.notify({
      //         icon: 'check_circle',
      //         color: 'green',
      //         message: 'Sucessfully Updated',
      //         position: 'top-right',
      //         classes: 'notify-custom-css'
      //       })
      //     }, 1000)
      //   }).catch((error) => {
      //     setTimeout(() => {
      //       console.log({ error })
      //       this.confirmBtnLoader = false
      //       this.confirm = false
      //       this.$q.notify({
      //         icon: 'cancel',
      //         color: 'negative',
      //         message: 'Error found',
      //         position: 'top-right',
      //         classes: 'notify-custom-css'
      //       })
      //     })
      //   })
    },
    openConfirmDialog (confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn () {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    finalize () {
      this.reset_()
    },
    onLeft ({ reset }) {
      // $q.notify('Left action triggered. Resetting in 1 second.')
      // finalize(reset)
      console.log('on left')
      this.reset_ = reset
    },
    onRight ({ reset }) {
      // $q.notify('Right action triggered. Resetting in 1 second.')
      // finalize(reset)
      console.log('on right')
      this.reset_ = reset
    },
    viewTodoDetail (selectedTodo) {
      LocalStorage.set('mobileSelectedProjectTodo', selectedTodo)
      this.$router.push(`/detail/${this.mainStore?.mobileSelectedProject?.id}/todo/${selectedTodo.id}/update`)
    }
  }
}
</script>
