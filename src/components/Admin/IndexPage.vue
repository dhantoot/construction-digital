<template>
  <div
    v-if="false"
    class="row hide-scrollbar"
    :style="{ height: $q.screen.lt.sm ? 'auto' : '94.5vh;' }"
  >
    <div class="row full-width full-height">
      <!-- Dashboard -->
      <div class="row full-height full-width">
        <div
          class="row col-9 full-height full-width"
          :class="{
            'col-12': $q.screen.lt.md
          }"
        >
          <div class="column full-width justify-start">
            <div class="row p-10 gap-10">
              <div
                class="col"
                :class="{
                  'col-12': $q.screen.lt.md
                }"
              >
                <HofsteeCard class="col-sm-12 col-md-4 col-lg-4" style="max-width: 450px;" height="250px" no-border>
                  <template #header>Reminders</template>

                  <template #body>
                    <div class="column gap-10">
                      <HofsteeAlert
                        :background-color="{
                          '#292727': $q.dark.isActive
                        }"
                        border-radius="8px"
                        border-color="cancel"
                        border="0.1px solid"
                        height="54px"
                      >
                        <template #icon>
                          <q-icon
                            name="las la-pause-circle"
                            color="negative"
                            size="lg"
                          />
                        </template>
                        <template #header>Hello There</template>
                        <template #body>Lorem ipsum dolor set ewmit</template>
                      </HofsteeAlert>

                      <HofsteeAlert
                        :background-color="{
                          '#292727': $q.dark.isActive
                        }"
                        border-radius="8px"
                        border-color="green"
                        border="0.1px solid"
                        height="54px"
                      >
                        <template #icon>
                          <q-icon
                            name="las la-play-circle"
                            color="green"
                            size="lg"
                          />
                        </template>
                        <template #header>Hello There</template>
                        <template #body>Lorem ipsum dolor set ewmit</template>
                      </HofsteeAlert>

                      <HofsteeAlert
                        :background-color="{
                          '#292727': $q.dark.isActive
                        }"
                        border-radius="8px"
                        border-color="red"
                        border="0.1px solid"
                        height="54px"
                      >
                        <template #icon>
                          <q-icon
                            name="las la-stop-circle"
                            color="red"
                            size="lg"
                          />
                        </template>
                        <template #header>Hello There</template>
                        <template #body>Lorem ipsum dolor set ewmit</template>
                      </HofsteeAlert>
                    </div>
                  </template>

                  <template #body-loader>
                    <q-inner-loading :showing="loading1">
                      <q-spinner-ios
                        size="50px"
                        :color="$q.dark.isActive ? 'accent' : 'primary'"
                      />
                    </q-inner-loading>
                  </template>
                </HofsteeCard>
              </div>
              <div
                class="col"
                :class="{
                  'col-12': $q.screen.lt.md
                }"
              >
                <HofsteeCard class="col-sm-12 col-md-4 col-lg-4" style="max-width: 450px;" height="250px" no-border>
                  <template #header>Todays Task</template>
                  <template #body>
                    <div class="column gap-10 justify-evenly height-90">
                      <div class="row full-width gap-10">
                        <div class="col">Box 1</div>
                        <div class="col">Box 2</div>
                      </div>
                      <div class="row full-width gap-10">
                        <div class="col">Box 3</div>
                        <div class="col">Box 4</div>
                      </div>
                    </div>
                  </template>
                  <template #body-loader>
                    <q-inner-loading :showing="loading2">
                      <q-spinner-ios
                        size="50px"
                        :color="$q.dark.isActive ? 'accent' : 'primary'"
                      />
                    </q-inner-loading>
                  </template>
                </HofsteeCard>
              </div>
              <div
                class="col"
                :class="{
                  'col-12': $q.screen.lt.md
                }"
              >
                <HofsteeCard class="col-sm-12 col-md-4 col-lg-4" style="max-width: 450px;" height="250px" no-border>
                  <template #header>Todays Meeting {{ selectedDate }}</template>
                  <template #body-loader>
                    <q-inner-loading :showing="loading3">
                      <q-spinner-ios
                        size="50px"
                        :color="$q.dark.isActive ? 'accent' : 'primary'"
                      />
                    </q-inner-loading>
                  </template>
                </HofsteeCard>
              </div>
            </div>

            <div class="row px-10">
              <HofsteeCard class="col-sm-12 col-md-12 col-lg-12 full-height" no-border>
                <template #header>Projects</template>
                <template #body>
                  <div
                    v-for="item of projectListMapped.filter(e => e.groupedData)"
                    :key="item"
                    class="row"
                  >
                    <div class="full-width">
                      <q-card
                        class="m-10"
                        :class="$q.dark.isActive ? 'bg-grey-10' : ''"
                        :flat="$q.dark.isActive"
                      >
                        <q-card-section>{{ item.title }}</q-card-section>
                        <q-card-section class="p-0">
                          <apexchart
                            type="line"
                            height="350"
                            :options="item.projectTaskCompleted"
                            :series="item.projectTaskCompletedValue"
                          ></apexchart>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </template>
                <template #body-loader>
                  <q-inner-loading :showing="getProjectsLoader">
                    <q-spinner-ios size="50px" color="primary" />
                  </q-inner-loading>
                </template>
              </HofsteeCard>
            </div>
          </div>
        </div>

        <div
          class="col-3 full-height py-10"
          :style="{
            'border-left': $q.dark.isActive
              ? '.1px solid #3a3a3a'
              : '.1px solid rgb(198 198 198 / 50%)',
            height: '94.5vh !important'
          }"
        >
          <div class="column full-height justify-start">
            <div
              class="height-33 pl-10"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
            >
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
                  <VerticalBar :progress="34" day="Mon" />
                  <VerticalBar :progress="13" day="Tue" />
                  <VerticalBar :progress="67" day="Wed" />
                  <VerticalBar :progress="74" day="Thu" />
                  <VerticalBar :progress="97" day="Fri" />
                  <VerticalBar :progress="50" day="Sat" />
                  <VerticalBar :progress="5" day="Sun" />
                </div>
              </div>
            </div>

            <q-separator />

            <div
              class="height-60 p-10"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
            >
              <FullCalendar
                :options="calendarOptions"
                style="max-height: 61.5vh"
                :event-class-names="getEventClass"
              >
                <template #eventContent="arg">
                  <div
                    v-if="!$q.screen.lt.sm"
                    class="column p-5 mx-5"
                    :class="[
                      $q.dark.isActive
                        ? 'eventContentOverrideDarkMode'
                        : 'eventContentOverride'
                    ]"
                  >
                    <div class="row full-width items-center">
                      <q-badge
                        rounded
                        :color="$q.dark.isActive ? 'warning' : 'primary'"
                      />
                      <span
                        class="pl-5"
                        :class="[
                          $q.dark.isActive ? 'text-warning' : 'text-primary'
                        ]"
                      >
                        Medium
                      </span>
                    </div>
                    <div class="row full-width">
                      <b>{{ arg.event.title }}</b>
                    </div>
                    <div class="row full-width">
                      Today is my sons birthday. everyone should attend
                    </div>
                  </div>

                  <div
                    v-if="$q.screen.lt.sm"
                    class="column p-5 mx-5"
                    :class="[
                      $q.dark.isActive
                        ? 'eventContentOverrideDarkMode'
                        : 'eventContentOverride'
                    ]"
                  >
                    <div class="row full-width items-center">
                      <q-badge
                        rounded
                        :color="$q.dark.isActive ? 'warning' : 'primary'"
                      />
                      <div v-if="false">{{ arg }}</div>
                    </div>
                  </div>
                </template>
              </FullCalendar>
            </div>

            <!-- <q-separator /> -->

            <!-- <div
              class="height-33 p-10"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
            >
              bottom
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <div
    class="row hide-scrollbar q-pa-md"
    :style="{ height: $q.screen.lt.sm ? 'auto' : '94.5vh;' }">

    <div class="row q-col-gutter-md full-width">
      
      <!-- Left Section: 4 cards (3 top, 1 bottom) -->
      <div class="col-12 col-md-9">
        
        <!-- Top 3 cards -->
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm-6 col-lg-4">
            <HofsteeCard class="full-height" no-border>
              <template #header>Reminders</template>

              <template #body>
                <div class="column gap-10">
                      <HofsteeAlert
                        :background-color="{
                          '#292727': $q.dark.isActive
                        }"
                        border-radius="8px"
                        border-color="cancel"
                        border="0.1px solid"
                        height="54px"
                      >
                        <template #icon>
                          <q-icon
                            name="las la-pause-circle"
                            color="negative"
                            size="lg"
                          />
                        </template>
                        <template #header>Hello There</template>
                        <template #body>Lorem ipsum dolor set ewmit</template>
                      </HofsteeAlert>

                      <HofsteeAlert
                        :background-color="{
                          '#292727': $q.dark.isActive
                        }"
                        border-radius="8px"
                        border-color="green"
                        border="0.1px solid"
                        height="54px"
                      >
                        <template #icon>
                          <q-icon
                            name="las la-play-circle"
                            color="green"
                            size="lg"
                          />
                        </template>
                        <template #header>Hello There</template>
                        <template #body>Lorem ipsum dolor set ewmit</template>
                      </HofsteeAlert>

                      <HofsteeAlert
                        :background-color="{
                          '#292727': $q.dark.isActive
                        }"
                        border-radius="8px"
                        border-color="red"
                        border="0.1px solid"
                        height="54px"
                      >
                        <template #icon>
                          <q-icon
                            name="las la-stop-circle"
                            color="red"
                            size="lg"
                          />
                        </template>
                        <template #header>Hello There</template>
                        <template #body>Lorem ipsum dolor set ewmit</template>
                      </HofsteeAlert>
                </div>
              </template>

              <template #body-loader>
                <q-inner-loading :showing="loading1">
                  <q-spinner-ios
                    size="50px"
                    :color="$q.dark.isActive ? 'accent' : 'primary'"
                  />
                </q-inner-loading>
              </template>
            </HofsteeCard>
          </div>

          <div class="col-12 col-sm-6 col-lg-4">
            <HofsteeCard class="full-height" no-border>
              <template #header>Todays Task</template>
              <template #body>
                <div class="column gap-10 justify-evenly height-90">
                      <div class="row full-width gap-10">
                        <div class="col">Box 1</div>
                        <div class="col">Box 2</div>
                      </div>
                      <div class="row full-width gap-10">
                        <div class="col">Box 3</div>
                        <div class="col">Box 4</div>
                      </div>
                </div>
              </template>
              <template #body-loader>
                <q-inner-loading :showing="loading2">
                  <q-spinner-ios
                    size="50px"
                    :color="$q.dark.isActive ? 'accent' : 'primary'"
                  />
                </q-inner-loading>
              </template>
            </HofsteeCard>
          </div>

          <div class="col-12 col-lg-4">
            <HofsteeCard class="full-height" no-border>
              <template #header>Todays Meeting {{ selectedDate }}</template>
              <template #body-loader>
                <q-inner-loading :showing="loading3">
                  <q-spinner-ios
                    size="50px"
                    :color="$q.dark.isActive ? 'accent' : 'primary'"
                  />
                </q-inner-loading>
              </template>
            </HofsteeCard>
          </div>
        </div>

        <!-- Bottom 1 card (full width) -->
        <div class="row q-mt-md">
          <div class="col-12">
            <q-card 
              flat
              bordered
              class="row full-width"
              style="border-radius: 8px;"
            >
              <!-- <q-card-section>
                <div class="text-small row full-width">Projects</div>
              </q-card-section> -->
              
              <q-card-section>
                <div class="text-small row full-width q-mb-lg">Projects</div>
                <div class="row gap-10 full-width justify-between">
                  <div
                    v-for="item of projectListMapped.filter(e => e.groupedData)"
                    :key="item"
                    class="row full-width"
                  >
                    <q-card
                      :class="$q.dark.isActive ? 'bg-grey-10' : ''"
                      :flat="$q.dark.isActive"
                      class="col-12"
                    >
                      <q-card-section>
                        <div class="text-subtitle1">{{ item.title }}</div>
                      </q-card-section>
                      <q-card-section class="q-pa-none">
                        <apexchart
                          type="line"
                          height="300"
                          :options="item.projectTaskCompleted"
                          :series="item.projectTaskCompletedValue"
                        />
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
              
              <q-inner-loading :showing="getProjectsLoader">
                <q-spinner-ios size="50px" color="primary" />
              </q-inner-loading>
              
            </q-card>
          </div>
        </div>
      </div>

      <!-- Right Section: 2 cards (top and bottom) -->
      <div class="col-12 col-md-3">
        <div class="column q-gutter-md full-height">
          
          <!-- Top right card -->
          <div class="col">
            <q-card class="full-height">
              <q-card-section>
                <div class="text-h6">Right Top</div>
                <div class="text-subtitle2">Statistics</div>
              </q-card-section>
              <q-card-section class="text-center">
                <div class="text-h4 text-primary">85%</div>
                <div class="text-caption text-grey-6">Completion Rate</div>
                <q-linear-progress 
                  :value="0.85" 
                  color="primary" 
                  size="8px"
                  class="q-mt-sm"
                />
              </q-card-section>
              <q-card-section>
                <div class="row justify-between items-center q-gutter-sm">
                  <div class="text-center">
                    <div class="text-weight-bold">24</div>
                    <div class="text-caption">Active</div>
                  </div>
                  <div class="text-center">
                    <div class="text-weight-bold">12</div>
                    <div class="text-caption">Pending</div>
                  </div>
                  <div class="text-center">
                    <div class="text-weight-bold">8</div>
                    <div class="text-caption">Done</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Bottom right card -->
          <div class="col">
            <q-card class="full-height">
              <q-card-section>
                <div class="text-h6">Right Bottom</div>
                <div class="text-subtitle2">Recent Activity</div>
              </q-card-section>
              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white" size="sm">
                        1
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body2">New user registered</q-item-label>
                      <q-item-label caption>2 hours ago</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-avatar color="secondary" text-color="white" size="sm">
                        2
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body2">Order completed</q-item-label>
                      <q-item-label caption>4 hours ago</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-avatar color="accent" text-color="white" size="sm">
                        3
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body2">System updated</q-item-label>
                      <q-item-label caption>1 day ago</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" size="sm">View All</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { LocalStorage, date as dateFormatter } from 'quasar'
import { useMainStore } from 'stores/main'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
const auth = getAuth()
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import VerticalBar from '../Common/Graphs/VerticalBar.vue'
import HofsteeAlert from '../Common/Alert/HofsteeAlert.vue'
import HofsteeCard from '../Common/Card/HofsteeCard.vue'
import { date } from 'quasar'
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
  props: {
    title: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  emits: ['emitFromChild'],
  setup() {
    const mainStore = useMainStore()
    const visible = ref(false)
    const question = ref('')
    const timeStamp = Date.now()
    const selectedDate = dateFormatter.formatDate(timeStamp, 'YYYY-MM-DD')

    // height: 50px; width: 40px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;
    return {
      getProjectsLoader: ref(false),
      todoList: ref([]),
      projectIds: ref([]),
      projectList: ref([]),
      projectListMapped: ref([]),
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
          {
            title:
              'event 1 - Lorem ipsum dolor set emit the day you said goodnight',
            start: '2025-03-29'
          },
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
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      projectTaskCompleted: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false
          },
          zoom: {
            show: false,
            allowMouseWheelZoom: false,
            enabled: false
          },
          pan: {
            enabled: false
          },
          animations: {
            enabled: true,
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [4, 4, 4],
          curve: 'monotoneCubic',
          dashArray: [0, 5, 5]
        },
        title: {
          text: '',
          align: 'center'
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              ' - <strong>' +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              '</strong>'
            )
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: []
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + ' (count)'
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + ' (count)'
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1'
        }
      }
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  watch: {
    mainStore(newVal, oldVal) {
      console.log('Username changed from', oldVal, 'to', newVal)
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
  async mounted() {
    this.showTextLoading('loading1')
    this.showTextLoading('loading2')
    this.showTextLoading('loading3')
    this.showTextLoading('loading4')
    this.$emit('emitFromChild')
    this.getProjectsLoader = true
    await this.getProjectByUser()
    await this.getTodoList()
    await this.getProjects()
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
    showTextLoading(loadingModel) {
      const ms = Math.floor(Math.random() * (4000 - 500 + 100) + 100)
      this[loadingModel] = true
      setTimeout(() => {
        this[loadingModel] = false
      }, ms)
    },
    login() {
      if (!this.username || !this.password) {
        return
      }
      this.loadingSubmit = true
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then(async userCredential => {
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
        .catch(error => {
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
    handleEventMount(info) {
      info.el.style.backgroundColor = 'transparent'
      info.el.style.border = 'none'
      info.el.style.color = 'black'
    },
    getEventClass() {
      return ['my-custom-event']
    },
    async getProjectByUser() {
      console.log('getProjectByUser..')
      const userDetails = LocalStorage.getItem('authUser')
      const { email } = userDetails
      console.log({ email })
      const invites = this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          return
        }
        const data_ = Object.values(data)
        console.log('data_ from invites', data_)
        this.projectIds = data_
          .filter(e => e.invitee === email)
          .map(e => e.projectId)
        console.log('this.projectIds', this.projectIds)
      })
    },
    async getTodoList(project) {
      if (!project) {
        return
      }
      const { id: projectId } = project
      const todo = this.$fbref(this.$fbdb, `task/${projectId}`)
      this.$fbonValue(todo, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          return []
        }
        const data_ = Object.values(data)
        this.sortList(data_, 'section')
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
        project.groupedData = groupedData || []
        if (groupedData) {
          const tmp = []
          for (const key in project.groupedData) {
            if (key !== 'undefined') {
              tmp.push({
                key,
                value: project.groupedData[key]
              })
            }
          }
          const sortedGroupedData = tmp.sort((a, b) => {
            const formattedA = date.formatDate(a.key, 'YYYY-MM-DD')
            const formattedB = date.formatDate(b.key, 'YYYY-MM-DD')
            return formattedA.localeCompare(formattedB)
          })
          const xAxisBottomLabels = sortedGroupedData.map(e => {
            return date.formatDate(e.key, 'MMM DD, YYYY')
          })
          project.projectTaskCompleted = { ...this.projectTaskCompleted }
          Object.assign(project.projectTaskCompleted.xaxis, {
            categories: xAxisBottomLabels
          })
          const obj = {
            name: 'Target Work',
            data: []
          }
          const completed = {
            name: 'Completed',
            data: []
          }
          for (const item of sortedGroupedData) {
            obj.data.push(item.value.length || 0)
            completed.data.push(item.value.filter(e => e[2] === true).length) // TODO
          }
          project.projectTaskCompletedValue = [obj, completed]
        }
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
    async getProjects() {
      const projects = this.$fbref(this.$fbdb, 'projects')
      this.$fbonValue(projects, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.projectList = []
          return
        }
        let data_ = Object.values(data)
        this.projectList = data_

        // map projects by user role
        const userDetails = LocalStorage.getItem('authUser')
        const { role, email } = userDetails
        console.log({
          role
        })

        if (role === 'client') {
          data_ = data_.filter(e => e.client?.map(f => f.email).includes(email))
          console.log('filtered data_', data_)
        }

        if (role === 'agent') {
          data_ = data_.filter(e => e.agent?.map(f => f.email).includes(email))
          console.log('filtered data_', data_)
        }

        if (role === 'constructor') {
          data_ = data_.filter(project => this.projectIds.includes(project.id))
          console.log('filtered data_', data_)
        }

        this.projectListMapped = data_
          .map(e => ({
            id: e.id,
            title: e.title,
            isActivated: e.isActivated
          }))
          .filter(e => e.isActivated)
        this.projectListMapped.forEach(async project => {
          if (!project) {
            return false
          }
          this.getTodoList(project)
        })
        this.getProjectsLoader = false
      })
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
  border: 0.1px solid rgb(198 198 198 / 50%);
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
  height: 0.1px;
}
:deep(.fc .fc-toolbar-title) {
  font-size: 18px;
  margin: 0px;
}
</style>
