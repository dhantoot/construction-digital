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
        <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push('/detail')"/>
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
    <div class="text-bold text-accent q-ml-lg">Todo List</div>
    <div>
      <q-btn label="New" rounded class="q-mr-sm text-capitalize" color="primary" icon="las la-plus" @click="this.$router.push({ path: '/createtodo' })"/>
    </div>
  </div>
  <div class="scroll q-mt-xl" style="max-height: 50vh">
    <q-list>
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
              :disable="!item.isCompleted"
              :class="{
                'cursor-not-allowed': !item.isCompleted
              }"
            >
            <template v-slot:label>
              {{ item.isCompleted ? 'Archive' : '' }}
            </template>
            </q-toggle>
          </q-item-section>
        </q-item>

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

        <!-- <q-item tag="label" v-ripple v-for="item of completedTodos" :key="item">
          <q-item-section>
            <q-item-label>{{ item.todoTitle }}</q-item-label>
            <q-item-label caption>
              {{ item.todoDesc }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-toggle
              color="blue"
              v-model="item.isArchived"
              :val="item.isArchived"
              label="Archive"
          />
          </q-item-section>
        </q-item> -->
    </q-list>
    <q-inner-loading
      :showing="loadingtodoList"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
      ><q-spinner-bars
        :style="{
          'font-size': '40px'
        }"
        color="primary"
    />
    </q-inner-loading>
  </div>
  <div class="row q-px-lg q-pt-sm justify-between items-center">
    <div>
      <q-btn rounded class="q-ml-none" color="primary" icon="las la-arrow-left" @click="this.$router.push('/detail')"/>
    </div>
    <div>
      <q-btn
        @click="confirm"
        rounded
        color="primary"
        label="Update"
        class="text-capitalize full-width text-accent"
        :loading="loadingSubmit"
        icon="las la-edit"
      >
        <template v-slot:loading>
          <q-spinner-bars class="on-left"/>
          Saving...
        </template>
      </q-btn>
    </div>
  </div>
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
      const todo = this.$fbref(this.$fbdb, 'todo')
      this.$fbonValue(todo, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.todoList = []
          return -1
        }
        const data_ = Object.values(data)
        this.todoList = data_
        // console.log('this.todoList', this.todoList)
        this.selectedMember = this.todoList
          .filter((e) => e.isCompleted)
          .map((x) => x.id)
        this.getCompletedTodos()
        this.loadingtodoList = false
      })
    },
    async changeSelected (val) {
      // console.log(val)
      if (val.length < 1) {
        this.completedTodos = []
        return -1
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
      this.loadingSubmit = true
      // console.log('updating todo', this.todoList)
      // console.log('this.completedTodos', this.completedTodos)
      const mapIds = this.completedTodos.map((m) => m.id)
      const updates = {}

      this.todoList.forEach((element) => {
        if (mapIds.includes(element.id)) {
          element.isCompleted = true
          updates[`todo/${element.id}/isCompleted/`] = true
        } else {
          element.isCompleted = false
          updates[`todo/${element.id}/isCompleted/`] = false
        }
      })
      // console.log('updated todoList', this.todoList)

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
      //     // console.log({ error })
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
      this.$q
        .dialog({
          dark: false,
          title: 'Confirm',
          message: 'Save changes ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // this.addDeceasedPersonnel()
          this.updateTodo()
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    }
  }
}
</script>
