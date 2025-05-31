<template>
  <div class="row hide-scrollbar" :style="`height: ${$q.screen.lt.md ? 'auto': '94.5vh'};`">
    <div class="row full-width full-height">
      <!-- Dashboard -->
        <div class="row full-height full-width">
          <div class="row col-9 full-height" :class="{
            'col-12': $q.screen.lt.md
          }">
            <div class="column full-width justify-start">
              <div class="row p-10 gap-10">
                <div class="col" :class="{
                  'col-12': $q.screen.lt.md
                }">
                  <HofsteeCard height="250px" no-border>
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
                            <q-icon name="las la-pause-circle" color="negative" size="lg"/>
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

                    <template #body-loader>
                      <q-inner-loading :showing="loading1">
                        <q-spinner-ios size="50px" :color="$q.dark.isActive ? 'accent' : 'primary'" />
                      </q-inner-loading>
                    </template>
                  </HofsteeCard>
                </div>
                <div class="col" :class="{
                  'col-12': $q.screen.lt.md
                }">
                  <HofsteeCard height="250px" no-border>
                    <template #header>
                      Todays Task
                    </template>
                    <template #body>
                      <div class="column gap-10 justify-evenly height-90">
                        <div class="row full-width gap-10">
                          <div class="col">
                            Box 1
                          </div>
                          <div class="col">
                            Box 2
                          </div>
                        </div>
                        <div class="row full-width gap-10">
                          <div class="col">
                            Box 3
                          </div>
                          <div class="col">
                            Box 4
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #body-loader>
                      <q-inner-loading :showing="loading2">
                        <q-spinner-ios size="50px" :color="$q.dark.isActive ? 'accent' : 'primary'" />
                      </q-inner-loading>
                    </template>
                  </HofsteeCard>
                </div>
                <div class="col" :class="{
                  'col-12': $q.screen.lt.md
                }">
                  <HofsteeCard height="250px" no-border>
                    <template #header>
                      Todays Meeting {{ selectedDate }}
                    </template>
                    <template #body-loader>
                      <q-inner-loading :showing="loading3">
                        <q-spinner-ios size="50px" :color="$q.dark.isActive ? 'accent' : 'primary'"/>
                      </q-inner-loading>
                    </template>
                  </HofsteeCard>
                </div>
              </div>
              <div class="row px-10 text-grey-6">
                  <HofsteeCard class="full-width full-height" no-border>
                    <template #body>
                      <FullCalendar
                        :options="calendarOptions"
                        style="max-height: 61.5vh;"
                        :eventClassNames="getEventClass">
                        <template #eventContent="arg">
                          <div v-if="!$q.screen.lt.sm" class="column p-5 mx-5" :class="[$q.dark.isActive ? 'eventContentOverrideDarkMode' : 'eventContentOverride']">
                            <div class="row full-width items-center">
                              <q-badge rounded :color="$q.dark.isActive ? 'warning' : 'primary'"/>
                              <span class="pl-5" :class="[$q.dark.isActive ? 'text-warning' : 'text-primary']">Medium</span>
                            </div>
                            <div class="row full-width">
                              <b>{{ arg.event.title }}</b>
                            </div>
                            <div class="row full-width">
                              Today is my sons birthday. everyone should attend
                            </div>
                          </div>

                          <div v-if="$q.screen.lt.sm" class="column p-5 mx-5" :class="[$q.dark.isActive ? 'eventContentOverrideDarkMode' : 'eventContentOverride']">
                            <div class="row full-width items-center">
                              <q-badge rounded :color="$q.dark.isActive ? 'warning' : 'primary'"/>
                              <div v-if="false">{{ arg }}</div>
                            </div>
                          </div>
                        </template>
                      </FullCalendar>
                    </template>
                    <template #body-loader>
                      <q-inner-loading :showing="loading4">
                        <q-spinner-ios size="50px" color="primary" />
                      </q-inner-loading>
                    </template>
                  </HofsteeCard>
              </div>
            </div>
          </div>
          <div class="col-3 full-height py-10"
            :style="{
              'border-left': $q.dark.isActive ? '.1px solid #3a3a3a' : '.1px solid rgb(198 198 198 / 50%)',
            }">
            <div class="column full-height justify-between">
              <div class="height-33 pl-10" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">
                <div class="row gap-10">
                  <div class="row justify-between items-center">
                    <div class="row justify-start gap-10">
                      <div>Activity</div>
                      <div>+12%</div>
                    </div>
                    <div class="text-grey">:</div>
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
              <q-separator/>
              <div class="height-33 p-10" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">
                middle
              </div>
              <q-separator/>
              <div class="height-33 p-10" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">
                bottom
              </div>
            </div>
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
const auth = getAuth()
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import VerticalBar from '../Common/Graphs/VerticalBar.vue'
import HofsteeAlert from '../Common/Alert/HofsteeAlert.vue'
import HofsteeCard from '../Common/Card/HofsteeCard.vue'
// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.

// https://fullcalendar.io/docs/vue
export default {
  title: 'ProjectList',
  emits: ['emitFromChild'],
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

    // height: 50px; width: 40px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;
    return {
      loading1: ref(false),
      loading2: ref(false),
      loading3: ref(false),
      loading4: ref(false),
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
    this.showTextLoading('loading1')
    this.showTextLoading('loading2')
    this.showTextLoading('loading3')
    this.showTextLoading('loading4')
    this.$emit('emitFromChild')
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
    showTextLoading (loadingModel) {
      const ms = Math.floor(Math.random() * (4000 - 500 + 100) + 100)
      this[loadingModel] = true
      setTimeout(() => {
        this[loadingModel] = false
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
    },
    handleEventMount (info) {
      info.el.style.backgroundColor = 'transparent'
      info.el.style.border = 'none'
      info.el.style.color = 'black'
    },
    getEventClass (arg) {
      return ['my-custom-event']
    }
  },
  watch: {
    mainStore (newVal, oldVal) {
      console.log('Username changed from', oldVal, 'to', newVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.eventContentOverrideDarkMode {
  white-space: normal !important;
  overflow-wrap: break-word;
  word-break: break-word;
  border-radius: 5px;
  background: #171c2a;
}
.eventContentOverride {
  white-space: normal !important;
  overflow-wrap: break-word;
  word-break: break-word;
  border-radius: 5px;
  background: rgb(242 244 247);
  color: #424242;
}
:deep(.fc-theme-standard td),
:deep(.fc-theme-standard th) {
  border: .1px solid rgb(198 198 198 / 50%)
}
:deep(.fc .fc-scrollgrid) {
    border-bottom-width: 0px;
    border-collapse: separate;
    border-right-width: 0px;
    border-left-width: 0px;
    border-top-width: 0px;
}
:deep(.q-separator--horizontal) {
    display: block;
    height: .1px;
}
</style>
