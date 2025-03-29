<template>
  <div class="row hide-scrollbar" style="height: 94.5vh;">
    <div class="row full-width full-height">
      <!-- Dashboard -->
      <div v-if="mainStore?.adminUser?.uid" class="full-height full-width">
        <div class="row full-height">
          <div class="row col-9">
            <div class="column full-width justify-start">
              <div class="debug row p-10 gap-10">
                <div class="col" :class="{
                  'col-12': $q.screen.lt.sm
                }">
                  <HofsteeCard>
                    <template #header>
                      Color Pallete
                    </template>
                  </HofsteeCard>
                </div>
                <div class="col" :class="{
                  'col-12': $q.screen.xs
                }">
                  <HofsteeCard>
                    <template #header>
                      Todays Task
                    </template>
                  </HofsteeCard>
                </div>
                <div class="col" :class="{
                  'col-12': $q.screen.xs
                }">
                  <HofsteeCard>
                    <template #header>
                      Todays Meeting
                    </template>
                  </HofsteeCard>
                </div>
              </div>
              <div class="debug row pa-20 p-10 gap-10 text-white">
                <q-date
                  dark
                  v-model="selectedDate"
                  view="month"
                  calendar="schedule"
                  :schedule="schedule"
                  class="full-width"
                >
                  <template #day="{ day }">
                    <div>
                      {{ day.label }}
                      <q-icon v-if="day.events" name="mdi-clock" />
                    </div>
                  </template>
                  <template #event="{ event }">
                    <div>
                      {{ event.name }} ({{ event.time }})
                      <q-icon :name="event.icon" />
                    </div>
                  </template>
                </q-date>
              </div>
            </div>
          </div>
          <div class="debug col-3 full-height p-10">
            <div class="column full-height justify-between">
              <div class="debug text-white">
                <div class="column">
                  <div>Activity</div>
                  <div>83%</div>
                  <div>| | | |  | |</div>
                </div>
              </div>
              <div class="debug text-white">middle</div>
              <div class="debug text-white">bottom</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Admin Login -->
      <div v-if="!mainStore?.adminUser?.uid" class="row full-width full-height justify-center items-center">
        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
          <q-card class="q-ma-sm shadow-12" style="max-width: 450px;">
            <q-card-section>
              <div class="text-h6">Admin Login</div>
              <div class="text-subtitle2 row justify-between">
                <div>Login required to use the portal</div>
              </div>
            </q-card-section>
            <q-card-section class="q-gutter-sm">
              <q-input :dense="true" filled v-model="username" placeholder="Username" @keydown.enter.prevent="login" style="font-size: 18px;"/>
              <q-input :dense="true" filled v-model="password" placeholder="Password" type="password" @keydown.enter.prevent="login" style="font-size: 20px;"/>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                icon="las la-undo"
                padding="sm xl"
                flat
                class="text-capitalize bg-cancel round-btn"
                label="Clear"
                :disable="loadingSubmit"
                :style="{
                  'width': '47%'
                }"
              >
              </q-btn>
              <q-btn
                icon="las la-check"
                padding="sm xl"
                @click="login"
                color="primary"
                label="Sign in"
                class="text-capitalize bg-info round-btn"
                :loading="loadingSubmit"
                :disable="loadingSubmit || !username || !password "
                :style="{
                  'width': '47%'
                }"
              >
                <template v-slot:loading>
                  <q-spinner-ios class="on-left"/>
                  <small>Logging in..</small>
                </template>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <!-- <h5 class="text-center" v-if="mainStore?.adminUser?.uid">Welcome to the admin portal</h5> -->
</template>
<script>
import { ref } from 'vue'
import { LocalStorage } from 'quasar'
import { useMainStore } from 'stores/main'
import {
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
import HofsteeCard from '../Common/Card/HofsteeCard.vue'
const auth = getAuth()

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  components: {
    HofsteeCard
  },
  setup () {
    const mainStore = useMainStore()
    const visible = ref(false)
    const question = ref('')
    const selectedDate = ref('2025-03-29')
    const schedule = ref({
      '2025-03-29': [
        { name: 'Event 1', time: '10:00', icon: 'mdi-clock' },
        { name: 'Event 2', time: '14:00', icon: 'mdi-clock' }
      ],
      '2025-03-30': [
        { name: 'Event 3', time: '12:00', icon: 'mdi-clock' }
      ]
    })

    return {
      selectedDate,
      schedule,
      events: [
        '2019/02/01',
        '2019/02/05',
        '2019/02/06',
        '2019/02/09',
        '2019/02/23'
      ],
      mainStore,
      username: ref('tagailo.danvincent@gmail.com'),
      password: ref('Admin@123'),
      loadingSubmit: ref(false),
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
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
    // this.$emit('showHeader', true, [])
    this.showTextLoading()
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
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    login () {
      if (!this.username || !this.password) {
        return
      }
      this.loadingSubmit = true
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const userRef = this.$fbref(this.$fbdb, 'users/' + user.uid)
          const userInfoSnapshot = await this.$fbget(userRef)
          const adminUser = userInfoSnapshot?.val()
          const isAdmin = adminUser.role === 'admin'
          if (isAdmin) {
            LocalStorage.set('adminUser', adminUser)
            LocalStorage.set('authUser', adminUser)
            this.mainStore.adminUser = adminUser
            this.loadingSubmit = false
            this.username = ''
            this.password = ''
            this.$q.notify({
              icon: 'check_circle',
              color: 'green',
              message: 'Login Success',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          } else {
            this.$q.notify({
              icon: 'cancel',
              color: 'negative',
              message: 'User is not allowed',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
            this.loadingSubmit = false
          }
        })
        .catch((error) => {
          this.loadingSubmit = false
          this.$q.notify({
            icon: 'cancel',
            color: 'negative',
            message: error.message?.includes('email-already-in-use')
              ? 'User not registered: Email already in use'
              : 'User not registered!',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    }
  }
}
</script>
