<template>
  <div class="flex justify-between q-pa-xs bg-accent">
    <q-input
      dark
      standout="bg-transparent"
      input-class="text-right text-accent"
      v-model="text"
      :dense="dense"
      :class="{
        'q-ma-xs q-mx-sm': true
      }"
      :style="{
        width: '100%'
      }"
    >
      <!-- <template v-slot:prepend>
        <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
      </template> -->
      <template v-slot:append>
        <q-icon v-if="text === ''" name="las la-search" class="text-accent"/>
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer text-black"
          @click="text = ''"
       />
      </template>
    </q-input>
  </div>
  <div class="row full-width justify-between items-center absolute" style="z-index: 1;">
    <div class="text-bold text-accent q-ml-sm q-pl-xs">Todo List</div>
    <div class="q-mr-sm q-pr-xs">
      <q-btn label="New" class="text-capitalize round-btn" color="primary" icon="las la-plus" @click="this.$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/todo/create` })"/>
    </div>
  </div>
  <div class="row full-width scroll q-mt-xl" style="max-height: 55vh">
    <q-list class="full-width">
        <div class="q-pa-lg q-gutter-sm" v-if="loadingtodoList">
          <q-skeleton
            type="rect"
            :style="{
              height: '35px'
            }"
        />
          <q-skeleton
            type="rect"
            :style="{
              height: '35px'
            }"
        />
          <q-skeleton
            type="rect"
            :style="{
              height: '35px'
            }"
        />
        </div>

        <q-item tag="label" v-ripple v-for="item in todoList" :key="item">
          <q-item-section side top>
            <q-checkbox
              keep-color
              v-model="selectedMember"
              :val="item.id"
              color="warning"
              @update:model-value="changeSelected"
              :disable="item.isArchived"
          />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-accent">{{ item.todoTitle }}</q-item-label>
            <q-item-label class="text-positive" caption>
              {{ item.todoDesc }}
            </q-item-label>
          </q-item-section>

          <q-item-section avatar>
            <q-toggle
              v-model="item.isArchived"
              :val="item.isArchived"
              :class="{
                'cursor-not-allowed': !item.isCompleted
              }"
              checked-icon="clear"
              unchecked-icon="check"
              color="negative"
            >
            <template v-slot:label>
              {{ item.isCompleted ? 'Archive' : '' }}
            </template>
            </q-toggle>
          </q-item-section>

          <q-item-section side>
            <div class="text-grey-8 q-pt-sm">
              <q-btn rounded dense icon="las la-eye" flat class="text-accent" size="sm" @click="viewTodoDetail(item)"/>
            </div>
          </q-item-section>

        </q-item>

        <!-- <q-slide-item @right="onRight" class="bg-transparent">
            <template v-slot:right>
              <div class="row items-center" style="width: 30%;">
                <q-btn flat dense icon="las la-edit" class="text-accent" @click="finalize()"/>
              </div>
            </template>

            <q-item class="bg-white">
              <q-item-section avatar>
                <q-icon color="primary" name="cell_wifi" />
              </q-item-section>
              <q-item-section>Custom colors (red, purple)</q-item-section>
            </q-item>
          </q-slide-item> -->

        <div class="q-pa-lg q-gutter-sm" v-if="loadingtodoList">
          <q-skeleton
            type="rect"
            :style="{
              height: '35px'
            }"
        />
          <q-skeleton
            type="rect"
            :style="{
              height: '35px'
            }"
        />
          <q-skeleton
            type="rect"
            :style="{
              height: '35px'
            }"
        />
        </div>
    </q-list>
    <q-inner-loading
      :showing="loadingtodoList"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
      ><q-spinner-ios
        :style="{
          'font-size': '40px'
        }"
        color="primary"
    />
    </q-inner-loading>
  </div>
  <div class="row full-width q-px-sm q-py-sm justify-between items-start absolute fixed-bottom" style="margin-bottom:82px">
    <div class="q-ml-xs">
      <q-btn class="round-btn" color="primary" icon="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
    </div>
    <div class="q-mr-xs">
      <q-btn
        @click="openConfirmDialog('Save changes?', 'updateTodo')"
        color="primary"
        label="Update"
        class="text-capitalize full-width text-accent round-btn q-mr-xs"
        :loading="loadingSubmit"
        icon="las la-edit"
      >
        <template v-slot:loading>
          <q-spinner-ios class="on-left"/>
          Saving...
        </template>
      </q-btn>
    </div>
  </div>
  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar size="sm" icon="las la-exclamation" color="cancel" text-color="white" />
          <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative" v-close-popup/>
          <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="primary" @click="callConfirmFn()" :loading="confirmBtnLoader" :disable="confirmBtnLoader">
            <template v-slot:loading>
              <q-spinner-ios/>
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
      this.confirmBtnLoader = true
      // console.log('updating todo', this.todoList)
      // console.log('this.completedTodos', this.completedTodos)
      const mapIds = this.completedTodos.map((m) => m.id)
      const updates = {}

      this.todoList.forEach((element) => {
        console.log(element.id)
        if (mapIds.includes(element.id)) {
          element.isCompleted = true
          updates[`todo/${element.id}/isCompleted/`] = true
        } else {
          element.isCompleted = false
          updates[`todo/${element.id}/isCompleted/`] = false
        }

        updates[`todo/${element.id}/isArchived/`] = element.isArchived
      })
      console.log('updated todoList', this.todoList)
      console.log('updates', updates)

      // slash at the end is very important (../avatar/)
      // updates[`todo/${this.uid}/avatar/`] = 'url-of-avatar.png'

      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          setTimeout(() => {
            this.confirmBtnLoader = false
            this.confirm = false
            this.$q.notify({
              icon: 'check_circle',
              color: 'green',
              message: 'Sucessfully Updated',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          }, 1000)
        }).catch((error) => {
          setTimeout(() => {
            console.log({ error })
            this.confirmBtnLoader = false
            this.confirm = false
            this.$q.notify({
              icon: 'cancel',
              color: 'negative',
              message: 'Error found',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          })
        })
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
