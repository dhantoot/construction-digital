<template>
  <div class="flex justify-between q-pa-xs bg-accent">
    <q-btn @click="this.$router.push('/detail')" flat icon="las la-arrow-left" class="text-primary q-ma-xs" />
    <q-input dark standout="bg-white" input-class="text-right text-black" v-model="text" :dense="dense" :class="{
      'q-ma-xs': true
    }" :style="{
        width: '75%'
      }">
      <template v-slot:append>
        <q-icon v-if="text === ''" name="las la-search" class="text-black" />
        <q-icon v-else name="clear" class="cursor-pointer text-black" @click="text = ''" />
      </template>
    </q-input>
  </div>
  <q-list padding class="scroll" style="height:66vh">
    <q-item-label header>Todo</q-item-label>
    <div class="q-pa-lg q-gutter-sm" v-if="loadingtodoList">
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
      <q-item-section side top>
        <q-checkbox v-model="selectedMember" :val="item.id" color="teal" @update:model-value="changeSelected" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.todoTitle }}</q-item-label>
        <q-item-label caption>
          {{ item.todoDesc }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />
    <q-item-label header>Done</q-item-label>

    <div class="q-pa-lg q-gutter-sm" v-if="loadingtodoList">
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

    <q-item tag="label" v-ripple v-for="item of completedTodos" :key="item">
      <q-item-section>
        <q-item-label>{{ item.todoTitle }}</q-item-label>
        <q-item-label caption>
          {{ item.todoDesc }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-toggle color="blue" v-model="item.isArchived" :val="item.isArchived" label="Archive" />
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item-section>
      <q-btn @click="confirm" size="lg" color="primary" text-color="warning" label="Save changes"
        class="text-capitalize q-ma-md" :loading="loadingSubmit">
        <template v-slot:loading>
          <q-spinner-bars class="on-left" />
          Saving...
        </template>
      </q-btn>
    </q-item-section>

  </q-list>
  <q-inner-loading :showing="loadingtodoList" label="Please wait..." label-class="text-teal"
    label-style="font-size: 1.1em"><q-spinner-bars :style="{
      'font-size': '40px'
    }" color="primary" />
  </q-inner-loading>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn @click="this.$router.push({ path: '/createtodo' })" dense fab icon="las la-notes-medical" color="grey-1"
      class="text-green" />
  </q-page-sticky>
</template>

<script>
import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectTodo',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const loadingtodoList = ref(false)

    return {
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
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
      loadingSubmit: ref(false)
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
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted', this.$options)
    this.showTextLoading()
    this.getTodoList()
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeUnmount () {
    console.log('beforeUnmount')
  },
  unmounted () {
    console.log('unmounted')
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal === true) {
        console.log(`visible is updated from ${oldVal} to ${newVal}`)
      }
    }
  },
  methods: {
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async getTodoList () {
      this.loadingtodoList = true
      const todo = this.$fbref(this.$fbdb, 'todo')
      this.$fbonValue(todo, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.todoList = []
          return -1
        }
        const data_ = Object.values(data)
        this.todoList = data_
        console.log('this.todoList', this.todoList)
        this.selectedMember = this.todoList.filter(e => e.isCompleted).map(x => x.id)
        this.getCompletedTodos()
        this.loadingtodoList = false
      })
    },
    async changeSelected (val) {
      console.log(val)
      if (val.length < 1) {
        this.completedTodos = []
        return -1
      }
      const completed = this.todoList.filter(e => val.includes(e.id))
      this.completedTodos = completed
      console.log('->', this.completedTodos)
    },
    getCompletedTodos () {
      const completed = this.todoList.filter(e => e.isCompleted === true)
      this.completedTodos = completed
    },
    updateTodo () {
      this.loadingSubmit = true
      console.log('updating todo', this.todoList)
      console.log('this.completedTodos', this.completedTodos)
      const mapIds = this.completedTodos.map(m => m.id)
      const updates = {}

      this.todoList.forEach(element => {
        if (mapIds.includes(element.id)) {
          element.isCompleted = true
          updates[`todo/${element.id}/isCompleted/`] = true
        } else {
          element.isCompleted = false
          updates[`todo/${element.id}/isCompleted/`] = false
        }
      })
      console.log('updated todoList', this.todoList)

      // slash at the end is very important (../avatar/)
      // updates[`todo/${this.uid}/avatar/`] = 'url-of-avatar.png'

      // this.$fbupdate(this.$fbref(this.$fbdb), updates)
      //   .then(() => {
      //     this.loadingSubmit = false
      //     this.$q.notify({
      //       icon: 'check_circle',
      //       color: 'positive',
      //       message: 'Sucessfully Updated',
      //       position: 'top-right'
      //     })
      //   }).catch((error) => {
      //     console.log({ error })
      //     this.loadingSubmit = false
      //     this.$q.notify({
      //       icon: 'exclamation-circle',
      //       color: 'negative',
      //       message: 'Error found',
      //       position: 'top-right'
      //     })
      //   })
    },
    async confirm () {
      this.$q.dialog({
        dark: false,
        title: 'Confirm',
        message: 'Save changes ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // this.addDeceasedPersonnel()
        this.updateTodo()
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
