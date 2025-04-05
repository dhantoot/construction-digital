<template>
  <div class="row hide-scrollbar" :style="`height: ${$q.screen.lt.md ? 'auto': '94.5vh'};`">
    <div class="row full-width full-height">
      <!-- Dashboard -->
      <div v-if="mainStore?.adminUser?.uid" class="full-height full-width">
        <div class="row full-height">
          <div class="row col-9" :class="{
            'col-12': $q.screen.lt.md
          }">
            <div class="column full-width justify-start">
              <div class="row p-10 gap-10">
                <div class="col" :class="{
                  'col-12': $q.screen.lt.md
                }">
                  <HofsteeCard height="250px">
                    <template #header>
                      Reminders
                    </template>
                    <template #body>
                      <div class="column gap-10">
                        <HofsteeAlert
                          :backgroundColor="{
                            '#292727': $q.dark.isActive
                          }"
                          borderRadius="8px"
                          borderColor="cancel"
                          border="0.1px solid"
                          height="54px"
                        >
                          <template #icon>
                            <q-icon name="las la-pause-circle" color="cancel" size="lg"/>
                          </template>
                          <template #header>
                            Hello There
                          </template>
                          <template #body>
                            Lorem ipsum dolor set ewmit
                          </template>
                        </HofsteeAlert>

                        <HofsteeAlert
                        :backgroundColor="{
                            '#292727': $q.dark.isActive
                          }"
                          borderRadius="8px"
                          borderColor="green"
                          border="0.1px solid"
                          height="54px"
                        >
                          <template #icon>
                            <q-icon name="las la-play-circle" color="green" size="lg"/>
                          </template>
                          <template #header>
                            Hello There
                          </template>
                          <template #body>
                            Lorem ipsum dolor set ewmit
                          </template>
                        </HofsteeAlert>
                        <HofsteeAlert
                          :backgroundColor="{
                            '#292727': $q.dark.isActive
                          }"
                          borderRadius="8px"
                          borderColor="red"
                          border="0.1px solid"
                          height="54px"
                        >
                          <template #icon>
                            <q-icon name="las la-stop-circle" color="red" size="lg"/>
                          </template>
                          <template #header>
                            Hello There
                          </template>
                          <template #body>
                            Lorem ipsum dolor set ewmit
                          </template>
                        </HofsteeAlert>
                      </div>
                    </template>
                  </HofsteeCard>
                </div>
                <div class="col" :class="{
                  'col-12': $q.screen.lt.md
                }">
                  <HofsteeCard height="250px">
                    <template #header>
                      Todays Task
                    </template>
                    <template #body>
                      <div class="column gap-10 justify-evenly height-90">
                        <div class="row full-width gap-10">
                          <div class="col">
                            <HofsteeCard height="100%">
                              <template #body>
                                sad
                              </template>
                            </HofsteeCard>
                          </div>
                          <div class="col">
                            <HofsteeCard height="100%">
                              <template #body>
                                sad
                              </template>
                            </HofsteeCard>
                          </div>
                        </div>
                        <div class="row full-width gap-10">
                          <div class="col">
                            <HofsteeCard height="100%">
                              <template #body>
                                sad
                              </template>
                            </HofsteeCard>
                          </div>
                          <div class="col">
                            <HofsteeCard height="100%">
                              <template #body>
                                sad
                              </template>
                            </HofsteeCard>
                          </div>
                        </div>
                      </div>
                    </template>
                  </HofsteeCard>
                </div>
                <div class="col" :class="{
                  'col-12': $q.screen.lt.md
                }">
                  <HofsteeCard height="250px">
                    <template #header>
                      Todays Meeting {{ selectedDate }}
                    </template>
                  </HofsteeCard>
                </div>
              </div>
              <div class="row pa-20 p-10 gap-10 text-grey-6">
                <div class="full-width">
                  <FullCalendar dark :options="calendarOptions" class="text" style="max-height: 599px;">
                    <template #eventContent="arg">
                      <div class="q-pa-xs">
                        {{ arg.event.title }}
                      </div>
                    </template>
                  </FullCalendar>
                </div>
              </div>
            </div>
          </div>
          <div v-if="$q.screen.gt.sm"
          class="col-3 full-height p-10"
          :style="{
            'border-left': $q.dark.isActive ? '.1px solid #3a3a3a' : '.1px solid rgb(198 198 198 / 50%)'
          }">
            <div class="column full-height justify-between">
              <div class="text-white">
                <div class="column gap-10">
                  <div class="row justify-between items-center">
                    <div class="row justify-start gap-10">
                      <div>Activity</div>
                      <div>+12%</div>
                    </div>
                    <div>:</div>
                  </div>
                  <div class="row justify-start items-center">
                    <div class="text-bold text-h6">83%</div>
                  </div>
                  <div class="row p-10 gap-10 no-wrap justify-evenly">
                    <VerticalBar :progress="34" day="Mon"/>
                    <VerticalBar :progress="13" day="Tue"/>
                    <VerticalBar :progress="67" day="Wed"/>
                    <VerticalBar :progress="74" day="Thu"/>
                    <VerticalBar :progress="97" day="Fri"/>
                    <VerticalBar :progress="50" day="Sat"/>
                    <VerticalBar :progress="5" day="Sun"/>
                  </div>
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
import { LocalStorage, date as dateFormatter } from 'quasar'
import { useMainStore } from 'stores/main'
import {
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
import HofsteeCard from '../Common/Card/HofsteeCard.vue'
const auth = getAuth()
// import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import VerticalBar from '../Common/Graphs/VerticalBar.vue'
import HofsteeAlert from '../Common/Alert/HofsteeAlert.vue'
// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.

// https://fullcalendar.io/docs/vue
export default {
  title: 'ProjectList',
  components: {
    HofsteeCard,
    FullCalendar,
    VerticalBar,
    HofsteeAlert
  },
  setup () {
    const mainStore = useMainStore()
    const visible = ref(false)
    const question = ref('')
    const timeStamp = Date.now()
    const selectedDate = dateFormatter.formatDate(timeStamp, 'YYYY-MM-DD')
    console.log(selectedDate)

    // height: 50px; width: 40px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;
    return {
      style: {
        height: '50px',
        width: '40px',
        'border-bottom-left-radius': '6px',
        'border-bottom-right-radius': '6px'
      },
      progress: 0.4,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        events: [
          { title: 'event 1 - Lorem ipsum dolor set emit the day you said goodnight', start: '2025-03-29' },
          { title: 'Nyx Birthday', start: '2025-05-20' },
          { title: 'Iya Birthday', start: '2025-03-25' },
          { title: 'Aunt birthday', start: '2025-04-20' },
          { title: 'Mass Event', start: '2025-04-23' }
        ]
      },
      currentEvents: [],
      selectedDate,
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
<style lang="scss" scoped>
.fc-theme-standard td, .fc-theme-standard th {
  border: .1px solid rgba(255, 255, 255, 0.14)!important;
}
</style>
