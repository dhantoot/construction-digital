<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row full-width justify-between items-center">
      <strong
        class="text-bold text-h6"
        :class="{
          'text-accent': $q.dark.isActive,
          'text-primary': !$q.dark.isActive
        }"
      >
        Todo List ({{ todoList.length }})
      </strong>
      <q-icon
        size="sm"
        :color="$q.dark.isActive ? 'accent' : 'primary'"
        @click="$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"
      >
        <Undo2Icon />
      </q-icon>
    </div>
    <div class="row justify-between">
      <q-input
        v-model="text"
        standout="bg-transparent"
        :input-class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
        :dense="dense"
        :style="{
          width: '100%'
        }"
      >
        <template #prepend>
          <!-- <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
        </template>
        <template #append>
          <q-icon
            v-if="!text"
            :class="{
              'text-accent': text === '',
              'text-primary': text !== ''
            }"
          >
            <SearchIcon />
          </q-icon>
          <q-icon
            v-if="text"
            name="clear"
            class="cursor-pointer text-accent"
            @click="text = ''"
          />
        </template>
      </q-input>
    </div>
    <q-list class="scroll">
      <div v-if="loadingtodoList" class="column gap-5">
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

      <div v-if="loadingtodoList" class="column gap-5 mt-5">
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

      <q-item
        v-for="item in todoList"
        :key="item"
        tag="label"
        @click="noop(item, $event)"
      >
        <!-- <q-item-section>
          <pre class="text-caption">{{item}}</pre>
        </q-item-section> -->
        <q-item-section>
          <q-item-label
            class="text-bold"
            :class="{
              'text-accent': $q.dark.isActive,
              'text-primary': !$q.dark.isActive
            }"
          >
            {{ item.todoDesc }}
          </q-item-label>
          <q-item-label
            :class="{
              'text-grey': $q.dark.isActive,
              'text-primary': !$q.dark.isActive
            }"
            caption
          >
            {{ item.todoTitle }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row items-center">
            <q-toggle
              v-model="item.isArchived"
              class="mt-4"
              dense
              :val="item.isArchived"
              :class="{
                'cursor-not-allowed': !item.isCompleted
              }"
              checked-icon="clear"
              unchecked-icon="check"
              color="negative"
            >
              <template #label>
                {{ item.isCompleted ? 'Archive' : '' }}
              </template>
            </q-toggle>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <q-btn
              class=""
              dense
              flat
              :class="
                item.timeline
                  ? 'text-positive'
                  : $q.dark.isActive
                    ? 'text-accent'
                    : 'text-primary'
              "
              @click="viewTodoDetail(item)"
            >
              <template #default>
                <SquarePenIcon size="24" class="q-mr-sm" />
              </template>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card
      v-if="!todoList.length"
      class="flex flex-center"
      :class="[$q.dark.isActive ? 'no-shadow' : 'shadow']"
    >
      <div class="text-center pt-30 p-10">
        <q-icon name="las la-exclamation-circle" size="xl" color="negative" />
        <h6
          :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
          class="q-mt-md"
        >
          No Data Available
        </h6>
        <p :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">
          We couldn't find any Todo list results for this Project
        </p>
        <q-btn
          outline
          rounded
          no-caps
          label="Back"
          :color="[$q.dark.isActive ? 'accent' : 'primary']"
          @click="
            $router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)
          "
        />
      </div>
    </q-card>
    <q-inner-loading
      :showing="loadingtodoList"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    >
      <q-spinner-ios
        :style="{
          'font-size': '40px'
        }"
        color="primary"
      />
    </q-inner-loading>
  </div>
  <!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn class="round-btn" color="primary" icon="las la-arrow-left"
      @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)" />
  </q-page-sticky> -->
  <q-dialog v-model="confirm" persistent>
    <q-card class="no-shadow">
      <q-card-section class="row items-center">
        <q-avatar
          size="sm"
          icon="las la-exclamation"
          color="cancel"
          text-color="white"
        />
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          v-close-popup
          padding="sm xl"
          icon="las la-times"
          class="round-btn text-capitalize"
          label="Close"
          color="negative"
        />
        <q-btn
          padding="sm xl"
          icon="las la-check"
          class="round-btn text-capitalize"
          label="Confirm"
          color="primary"
          :loading="confirmBtnLoader"
          :disable="confirmBtnLoader"
          @click="callConfirmFn()"
        >
          <template #loading>
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
  props: {
    title: String,
    likes: Number
  },
  setup() {
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
      initFunction() {
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
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  beforeCreate() {
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    this.showTextLoading()
    this.getTodoList()
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
  },
  updated() {
    // console.log('updated')
  },
  beforeUnmount() {
    // console.log('beforeUnmount')
  },
  unmounted() {
    // console.log('unmounted')
  },
  methods: {
    noop(data, e) {
      e.preventDefault()
    },
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async getTodoList() {
      this.loadingtodoList = true
      // const todo = this.$fbref(this.$fbdb, 'todo')
      const todo = this.$fbref(
        this.$fbdb,
        `task/${this.$route.params.projectId}`
      )
      this.$fbonValue(todo, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.todoList = []
          this.loadingtodoList = false
          return
        }
        const data_ = Object.values(data)
        this.sortList(data_, 'section')
        // this.todoList = data_
        const stats = this.todoList.map(E => [
          E.timeline?.from,
          E.timeline?.to,
          E.isCompleted,
          E.todoDesc
        ])
        const groupedData = stats.reduce((list, item) => {
          const dueDate = item[1]
          if (!list[dueDate]) {
            list[dueDate] = []
          }
          list[dueDate].push(item)
          return list
        }, {})
        console.log('groupedData->', groupedData)
        this.selectedMember = this.todoList
          .filter(e => e.isCompleted)
          .map(x => x.id)
        // this.getCompletedTodos()
        this.loadingtodoList = false
      })
    },
    async sortList(arr, field) {
      if (!arr || arr.length < 1) {
        return
      }
      this.todoList = arr
        .filter(e => !this.$isFalsyString(e.section))
        .sort((a, b) => {
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
      this.todoList.forEach(item => {
        item.todoTitle = item.sowCategory
        item.todoDesc = item.sowDescription
        item.isArchived = item?.isArchived || false
        item.isCompleted = item?.isCompleted || false
      })
    },
    async changeSelected(val) {
      if (val.length < 1) {
        this.completedTodos = []
        return
      }
      const completed = this.todoList.filter(e => val.includes(e.id))
      this.completedTodos = completed
    },
    getCompletedTodos() {
      const completed = this.todoList.filter(e => e.isCompleted === true)
      this.completedTodos = completed
    },
    updateTodo() {
      this.$q.notify({
        icon: 'check_circle',
        color: 'green',
        message: 'Feature Revamp',
        position: 'top-right',
        classes: 'notify-custom-css'
      })
    },
    openConfirmDialog(confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn() {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    finalize() {
      this.reset_()
    },
    onLeft({ reset }) {
      // $q.notify('Left action triggered. Resetting in 1 second.')
      // finalize(reset)
      this.reset_ = reset
    },
    onRight({ reset }) {
      // $q.notify('Right action triggered. Resetting in 1 second.')
      // finalize(reset)
      this.reset_ = reset
    },
    viewTodoDetail(selectedTodo) {
      LocalStorage.set('mobileSelectedProjectTodo', selectedTodo)
      this.$router.push(
        `/detail/${this.mainStore?.mobileSelectedProject?.id}/todo/${selectedTodo.id}/update`
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.q-item {
  min-height: 48px;
  padding: 8px 0px !important;
  color: inherit;
  transition:
    color 0.3s,
    background-color 0.3s;
}
</style>
