<template>
  <div
    class="row hide-scrollbar q-pa-sm"
    :style="{ height: $q.screen.lt.sm ? 'auto' : '94.5vh;' }"
  >
    <div class="row q-col-gutter-y-md full-width">
      <!-- Left Section: 4 cards (3 top, 1 bottom) -->
      <div class="col-12 col-md-9">
        <!-- Top 3 cards -->
        <div class="row q-col-gutter-md q-mb-md">
          <!-- Today's Meeting  -->
          <div class="col-12 col-lg-4">
            <HofsteeCard class="full-height" bordered flat>
              <template #header>Today's Meeting</template>
              <template #body>
                <div
                  class="row gap-10 scroll"
                  style="max-height: 185px; overflow-y: auto"
                >
                  <HofsteeAlert
                    v-for="item of todaysMeeting"
                    :key="item.id"
                    :background-color="{
                      '#292727': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="cancel"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <div class="">
                        <PhoneIncoming
                          v-if="item.eventType === 'Meeting'"
                          class=""
                          size="30"
                          color="red"
                        />
                      </div>
                    </template>
                    <template #header>{{ item?.title }}</template>
                    <template #body>{{ item?.description }}</template>
                  </HofsteeAlert>
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

          <!-- Today's Task -->
          <div class="col-12 col-sm-6 col-lg-4">
            <!--            <HofsteeCard class="full-height" bordered flat>-->
            <!--              <template #header>Overall Projects</template>-->
            <!--              <template #body>-->
            <!--                <div class="column gap-10 justify-evenly height-90 pb-10">-->
            <!--                  <div class="row full-width gap-10">-->
            <!--                    <div class="col">-->
            <!--                      <q-card-->
            <!--                          flat-->
            <!--                          :style="-->
            <!--                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'-->
            <!--                        "-->
            <!--                      >-->
            <!--                        Active-->
            <!--                      </q-card>-->
            <!--                    </div>-->
            <!--                    <div class="col">-->
            <!--                      <q-card-->
            <!--                          flat-->
            <!--                          :style="-->
            <!--                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'-->
            <!--                        "-->
            <!--                      >-->
            <!--                        On-hold-->
            <!--                      </q-card>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div class="row full-width gap-10">-->
            <!--                    <div class="col">-->
            <!--                      <q-card-->
            <!--                          flat-->
            <!--                          :style="-->
            <!--                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'-->
            <!--                        "-->
            <!--                      >-->
            <!--                        Completed-->
            <!--                      </q-card>-->
            <!--                    </div>-->
            <!--                    <div class="col">-->
            <!--                      <q-card-->
            <!--                          flat-->
            <!--                          :style="-->
            <!--                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'-->
            <!--                        "-->
            <!--                      >-->
            <!--                        Archived-->
            <!--                      </q-card>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <template #body-loader>-->
            <!--                <q-inner-loading :showing="loading2">-->
            <!--                  <q-spinner-ios-->
            <!--                      size="50px"-->
            <!--                      :color="$q.dark.isActive ? 'accent' : 'primary'"-->
            <!--                  />-->
            <!--                </q-inner-loading>-->
            <!--              </template>-->
            <!--            </HofsteeCard>-->

            <HofsteeCard class="full-height" bordered flat>
              <template #header>Today's Task</template>
              <template #body>
                <div
                  class="row gap-10 scroll"
                  style="max-height: 185px; overflow-y: auto"
                >
                  <HofsteeAlert
                    v-for="item of todaysTask"
                    :key="item.id"
                    :background-color="{
                      '#292727': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="cancel"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <div class="">
                        <NotebookPen
                          v-if="item.eventType === 'Task'"
                          class=""
                          size="30"
                          color="green"
                        />
                      </div>
                    </template>
                    <template #header>{{ item?.title }}</template>
                    <template #body>{{ item?.description }}</template>
                  </HofsteeAlert>
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

          <!-- Upcoming Event Reminders -->
          <div class="col-12 col-sm-6 col-lg-4">
            <HofsteeCard class="full-height" bordered flat>
              <template #header>
                <div class="row items-center full-width gap-10">
                  Event Reminders
                  <div>
                    <CircleQuestionMark
                      size="15"
                      color=""
                      class="text-caption text-negative"
                    >
                    </CircleQuestionMark>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <span class="text-caption"
                        >tomorow until friday next week</span
                      >
                    </q-tooltip>
                  </div>
                </div>
              </template>

              <template #body>
                <div
                  class="row gap-10 scroll"
                  style="max-height: 185px; overflow-y: auto"
                >
                  <HofsteeAlert
                    v-for="item of reminders"
                    :key="item.id"
                    :background-color="{
                      '#292727': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="cancel"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <div class="">
                        <BellRing
                          v-if="item.eventType === 'Reminder'"
                          class=""
                          size="30"
                          color="orange"
                        />
                        <PhoneIncoming
                          v-if="item.eventType === 'Meeting'"
                          class=""
                          size="30"
                          color="red"
                        />
                        <NotebookPen
                          v-if="item.eventType === 'Task'"
                          class=""
                          size="30"
                          color="green"
                        />
                      </div>
                    </template>
                    <template #header>{{ item?.title }}</template>
                    <template #body>{{ item?.description }}</template>
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
        </div>

        <!-- Bottom 1 card (full width) -->
        <div class="row q-mt-md full-width">
          <div class="col-12">
            <q-card
              flat
              bordered
              class="row full-width"
              style="border-radius: 8px"
            >
              <q-card-section class="full-width">
                <div class="row q-mb-md justify-between full-width">
                  <div class="text-bold row q-mb-md">Projects</div>
                    <q-select
                        v-model="selectedProject"
                        behavior="menu"
                        :style="$q.screen.gt.sm ? 'width:250px' : 'width: 100%'"
                        :popup-content-class="[
                          $q.dark.isActive
                            ? 'popupSelectContent bg-contrast no-shadow'
                            : 'popupSelectContent'
                        ]"
                        filled
                        input-debounce="0"
                        :label="'Select'"
                        :dense="true"
                        option-label="title"
                        option-value="id"
                        :options="mappedProject"
                        :loading="false"
                    >
                      <template #loading>
                        <div class="row justify-center">
                          <q-spinner-ios />
                        </div>
                      </template>
                    </q-select>
                </div>

                <div class="row gap-20 justify-between full-width">
                  <div
                    v-for="item of projectListMapped.filter(e => e.groupedData).filter(e => e.id == selectedProject?.id)"
                    :key="item"
                    class="col col-12 col-sm-12 col-xs-12 full-width"
                    style="width: 100%"
                  >
                    <q-card
                      class="no-shadow full-width"
                      :class="[$q.dark.isActive ? 'bg-grey-10 text-white' : '']"
                      :flat="$q.dark.isActive"
                      style="border: 0.1px solid rgb(137 145 149)"
                      :style="
                        $q.dark.isActive
                          ? 'bg-dark'
                          : 'background: rgb(240 240 240)'
                      "
                    >
                      <q-card-section>
                        <div class="text-subtitle1">{{ item.title }}</div>
                      </q-card-section>
                      <q-card-section class="q-pa-none full-width">
                        <div style="display: block; width: 100%">
                          <apexchart
                            v-if="isLoaded"
                            :key="`${item.title}-${getProjectsLoader}`"
                            type="line"
                            height="350"
                            width="100%"
                            :options="item.projectTaskCompleted"
                            :series="item.projectTaskCompletedValue"
                          />
                        </div>
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
      <div
        class="col-12 col-md-3"
        :class="[$q.screen.lt.md ? 'pl-6' : 'pl-20']"
      >
        <div class="row q-gutter-md justify-start items-start">
          <!-- Top right card -->
          <div class="row full-width pl-10">
            <HofsteeCard bordered flat class="full-width">
              <template #header>Statistics</template>
              <template #body>
                <div class="row full-width gap-10 items-center">
                  <div class="text-h4 text-primary">85%</div>
                  <div class="text-caption text-grey-6">Completion Rate</div>
                  <q-linear-progress
                    :value="0.85"
                    color="primary"
                    size="8px"
                    class="q-mt-sm"
                  />

                  <HofsteeAlert
                    :background-color="{
                      '#3E3E47': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="primary"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <q-icon
                        name="las la-play-circle"
                        color="primary"
                        size="lg"
                      />
                    </template>
                    <template #header>12 Active</template>
                    <template #body>Lorem ipsum dolor set emit</template>
                  </HofsteeAlert>

                  <HofsteeAlert
                    :background-color="{
                      '#3E3E47': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="primary"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <q-icon
                        name="las la-play-circle"
                        color="primary"
                        size="lg"
                      />
                    </template>
                    <template #header>12 Pending</template>
                    <template #body>Lorem ipsum dolor set emit</template>
                  </HofsteeAlert>
                </div>
              </template>

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

          <!-- Middle right card -->
          <div class="row full-width pl-10">
            <HofsteeCard class="full-height full-width" bordered flat>
              <template #header>Overall Projects</template>
              <template #body>
                <div class="column gap-10 justify-evenly height-90 pb-10">
                  <div class="row full-width gap-10">
                    <div class="col">
                      <q-card
                          flat
                          :style="
                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'
                        "
                      >
                        Active
                      </q-card>
                    </div>
                    <div class="col">
                      <q-card
                          flat
                          :style="
                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'
                        "
                      >
                        On-hold
                      </q-card>
                    </div>
                  </div>
                  <div class="row full-width gap-10">
                    <div class="col">
                      <q-card
                          flat
                          :style="
                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'
                        "
                      >
                        Completed
                      </q-card>
                    </div>
                    <div class="col">
                      <q-card
                          flat
                          :style="
                          $q.dark.isActive ? 'bg-dark' : 'background: #f0f8ff'
                        "
                      >
                        Archived
                      </q-card>
                    </div>
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

          <!-- Bottom right card -->
          <div class="row full-width pl-10">
            <q-card
              flat
              bordered
              class="full-width"
              :class="[$q.screen.lt.sm ? 'mb-70 px-10 pb-10' : 'px-10 pb-10']"
            >
              <FullCalendar
                :options="calendarOptions"
                style="max-height: 70.5vh; width: 100%"
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
              <q-inner-loading :showing="loading3">
                <q-spinner-ios
                  size="50px"
                  :color="$q.dark.isActive ? 'accent' : 'primary'"
                />
              </q-inner-loading>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { LocalStorage, date as dateFormatter } from 'quasar'
import { useMainStore } from 'stores/main'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import VerticalBar from '../Common/Graphs/VerticalBar.vue'
import HofsteeAlert from '../Common/Alert/HofsteeAlert.vue'
import HofsteeCard from '../Common/Card/HofsteeCard.vue'
import { date } from 'quasar'
import moment from 'moment'

const auth = getAuth()
// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.

// https://fullcalendar.io/docs/vue
export default {
  title: 'ProjectList',
  components: {
    HofsteeCard,
    FullCalendar,
    // VerticalBar,
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
      isLoaded: ref(false),
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
          { title: 'Nyx Birthday', start: '2026-01-30' },
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
          redrawOnParentResize: true,
          redrawOnWindowResize: true,
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
      },
      fetchingEvents: ref(false),
      reminders: ref([]),
      todaysTask: ref([]),
      todaysMeeting: ref([]),
      selectedProject: ref(null)
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    },
    apexChart1Width: function () {
      return '100%'
    },
    filteredProject: function () {
      return this.projectListMapped.filter(item => item.id = this.selectedProject.id)
    },
    mappedProject: function () {
      return this.projectListMapped.map(item =>{
        return {
          id: item.id,
          value: item.id,
          label: item.title,
          title: item.title,
        }
      })
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
    await this.getProjects()
    this.apexChart1Width = '100%'

    await this.getEvents()

    nextTick(() => {
      // A small delay ensures Quasar's layout engine has finished
      setTimeout(() => {
        this.isLoaded = true
      }, 50)
    })
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
    getEventClass() {
      return ['my-custom-event']
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
        if (project.groupedData) {
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
          project.projectTaskCompleted = {
            ...this.projectTaskCompleted,
            xaxis: {
              categories: xAxisBottomLabels
            }
          }
          // Object.assign(project.projectTaskCompleted.xaxis, {
          //   categories: xAxisBottomLabels
          // })
          const obj = {
            name: 'Target Work',
            data: []
          }
          const completed = {
            name: 'Completed',
            data: []
          }
          console.log('sortedGroupedData', sortedGroupedData)
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
      this.$fbonValue(projects, async snapshot => {
        try {
          const data = snapshot.val()
          console.log('data', data)
          if (this.$isFalsyString(data)) {
            this.projectList = []
            return
          }
          let data_ = Object.values(data)
          this.projectList = data_

          // map projects by user role
          const userDetails = LocalStorage.getItem('authUser')
          const { role, email } = userDetails

          if (role === 'client') {
            data_ = data_.filter(e =>
              e.client?.map(f => f.email).includes(email)
            )
          }

          if (role === 'agent') {
            data_ = data_.filter(e =>
              e.agent?.map(f => f.email).includes(email)
            )
          }

          if (role === 'constructor') {
            data_ = data_.filter(project =>
              this.projectIds.includes(project.id)
            )
          }

          console.log('data_', data_)
          this.projectListMapped = data_
            .map(e => ({
              id: e.id,
              title: e.title,
              isActivated: e.isActivated
            }))
            .filter(e => e.isActivated)

          this.selectedProject = this.projectListMapped[0] || null

          for (let project of this.projectListMapped) {
            if (!project) {
              return false
            }
            this.getTodoList(project)
          }

          // await Promise.all(
          //     this.projectListMapped.map(project => {
          //       this.getTodoList(project)
          //     })
          // )

          this.getProjectsLoader = false
        } catch (e) {
          console.error(e)
        }
      })
    },
    async getEvents() {
      // @todo: Fetch all event ids.
      this.fetchingEvents = true

      // 1. Define the range for Next Week
      // const nextWeekStart = moment().add(1, 'weeks').startOf('isoWeek'); // Monday
      const nextWeekEnd = moment().add(1, 'weeks').endOf('isoWeek') // Sunday
      const tomorrow = moment().add(0, 'days') // tomorrow

      const events = this.$fbref(
        this.$fbdb,
        `events/${'5c42d201-49e0-4424-aa8a-4c889ae1b3db'}`
      )
      this.$fbonValue(events, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.calendarOptions.events = []
          this.fetchingEvents = false
          return
        }
        const data_ = Object.values(data)
        console.log('data_', data_)
        this.calendarOptions.events = data_

        // 2. Filter the array
        const nextWeekEvents = data_
          .filter(event => {
            // Check if the date is "isBetween" the range [inclusive]
            return moment(event.start).isBetween(
              tomorrow,
              nextWeekEnd,
              null,
              '[]'
            )
          })
          .sort((a, b) => {
            // 2. Sort by recency (Soonest date first)
            // Subtracting timestamps: smaller (sooner) comes first
            return moment(a.start).valueOf() - moment(b.start).valueOf()
          })

        console.log('nextWeekEvents', nextWeekEvents)
        this.reminders = nextWeekEvents

        const today = moment().startOf('day')

        // 2. Filter for the exact match
        const todaysEvents = data_
          .filter(event => {
            // We specify 'day' as the second argument to ignore time differences
            return moment(event.start).isSame(today, 'day')
          })
          .sort((a, b) => {
            // 2. Sort by recency (Soonest date first)
            // Subtracting timestamps: smaller (sooner) comes first
            return moment(a.start).valueOf() - moment(b.start).valueOf()
          })

        console.log('Todays Event', todaysEvents)

        this.todaysTask = todaysEvents.filter(event => {
          return event.eventType === 'Task'
        })
        console.log('this.todaysTask', this.todaysTask)

        this.todaysMeeting = todaysEvents.filter(event => {
          return event.eventType === 'Meeting'
        })
        console.log('this.todaysMeeting', this.todaysMeeting)

        this.fetchingEvents = false
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
  font-size: 12px;
  margin: 0px;
  white-space: nowrap;
}
:deep(.fc-direction-ltr .fc-toolbar > * > :not(:first-child)) {
  margin-left: 0.75em;
  display: none;
}
:deep(.fc .fc-button-group > .fc-button) {
  flex: 1 1 auto;
  position: relative;
  height: 25px;
  padding: 2px;
  font-size: 12px;
}
.apexcharts-canvas,
.apexcharts-canvas svg {
  width: 100% !important;
}
:deep(.fc .fc-scroller-liquid-absolute) {
  inset: 0px;
  position: absolute;
  overflow: hidden !important;
}
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
