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
                    :border-color="getBorderColor(item?.eventType)"
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
                    :border-color="getBorderColor(item?.eventType)"
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
                  Reminders
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
                    :border-color="getBorderColor(item?.eventType)"
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
                    <template #header>
                      <div class="row full-width justify-between">
                        <span>{{ item?.title }}</span>
                        <span class="text-caption">{{ item?.day }}</span>
                      </div>
                    </template>
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
                    v-for="item of projectListMapped
                      .filter(e => e.groupedData)
                      .filter(e => e.id == selectedProject?.id)"
                    :key="item"
                    class="col col-12 col-sm-12 col-xs-12 full-width"
                    style="width: 100%"
                  >
                    <q-card
                      class="no-shadow full-width"
                      :class="[$q.dark.isActive ? 'bg-grey-10 text-white' : '']"
                      :flat="$q.dark.isActive"
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
                <div class="row full-width gap-10 items-end">
                  <div class="text-h4">{{ completionRate }}%</div>
                  <div class="text-body1">Completion Rate</div>
                  <q-linear-progress
                    :value="completionRate / 100"
                    size="8px"
                    class="q-mt-sm"
                  />

                  <HofsteeAlert
                    :background-color="{
                      '#3E3E47': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="positive"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <div class="">
                        <CircleCheck class="" size="30" color="#05807c" />
                      </div>
                    </template>
                    <template #header
                      ><span
                        >{{ activeProjectsCount }} Active Projects</span
                      ></template
                    >
                    <template #body>Lorem ipsum dolor set emit</template>
                  </HofsteeAlert>

                  <HofsteeAlert
                    :background-color="{
                      '#3E3E47': $q.dark.isActive
                    }"
                    border-radius="8px"
                    border-color="info"
                    border="0.1px solid"
                    height="54px"
                  >
                    <template #icon>
                      <div class="">
                        <Hourglass class="" size="30" color="#1f3957" />
                      </div>
                    </template>
                    <template #header
                      ><span
                        >{{ inactiveProjectsCount }} Projects Inactive</span
                      ></template
                    >
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
          <div v-if="false" class="row full-width pl-10">
            <HofsteeCard class="full-height full-width" bordered flat>
              <template #header>Overall Projects</template>
              <template #body>
                <div class="column gap-10 justify-evenly height-90 pb-10">
                  <div class="row full-width gap-10">
                    <div class="col">
                      <q-card
                        flat
                        :class="$q.dark.isActive ? 'text-accent' : ''"
                        :style="
                          $q.dark.isActive
                            ? 'bg-dark text-accent'
                            : 'background: #f0f8ff'
                        "
                      >
                        Active
                      </q-card>
                    </div>
                    <div class="col">
                      <q-card
                        flat
                        :class="$q.dark.isActive ? 'text-accent' : ''"
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
                        :class="$q.dark.isActive ? 'text-accent' : ''"
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
                        :class="$q.dark.isActive ? 'text-accent' : ''"
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

          <!-- Middle right card -->
          <!-- Work Due & Planned Works -->
          <div class="row justify-between full-width gap-10 pl-10">
            <!-- Work Due -->
            <div class="col">
              <HofsteeCard bordered flat class="full-width" height="156px">
                <template #header
                  ><span class="text-red">Work Due</span></template
                >
                <template #subHeader>Behind schedule</template>
                <template #body>
                  <div class="row justify-end">
                    <q-knob
                      v-model="box1"
                      show-value
                      font-size="16px"
                      class="text-red q-ma-md"
                      size="50px"
                      :thickness="0.05"
                      color="red"
                      track-color="grey-3"
                      readonly
                    >
                      {{ box1 }}
                    </q-knob>
                  </div>
                </template>
              </HofsteeCard>
            </div>

            <!-- Planned Works -->
            <div class="col">
              <HofsteeCard bordered flat class="full-width" height="156px">
                <template #header
                  ><span class="text-amber">Scheduled Work</span></template
                >
                <template #subHeader>Remaining</template>
                <template #body>
                  <div class="row justify-end">
                    <q-knob
                      v-model="box2"
                      show-value
                      font-size="16px"
                      class="text-amber q-ma-md"
                      size="50px"
                      :thickness="0.05"
                      color="amber"
                      track-color="grey-3"
                      readonly
                    >
                      {{ box2 }}
                    </q-knob>
                  </div>
                </template>
              </HofsteeCard>
            </div>
          </div>

          <!-- Middle right card -->
          <!-- Actual Work & Work Done -->
          <div class="row justify-between full-width gap-10 pl-10">
            <!-- Actual work -->
            <div class="col">
              <HofsteeCard bordered flat class="full-width" height="156px">
                <template #header
                  ><span class="text-blue">Target Work</span></template
                >
                <template #subHeader>Total Scope</template>
                <template #body>
                  <div class="row justify-end">
                    <q-knob
                      v-model="box3"
                      show-value
                      font-size="16px"
                      class="text-blue q-ma-md"
                      size="50px"
                      :thickness="0.05"
                      color="blue"
                      track-color="grey-3"
                      readonly
                    >
                      {{ box3 }}
                    </q-knob>
                  </div>
                </template>
              </HofsteeCard>
            </div>

            <!-- Work Done -->
            <div class="col">
              <HofsteeCard bordered flat class="full-width" height="156px">
                <template #header
                  ><span class="text-green">Work Done</span></template
                >
                <template #subHeader>Ahead of time</template>
                <template #body>
                  <div class="row justify-end">
                    <q-knob
                      v-model="box4"
                      show-value
                      font-size="16px"
                      class="text-green q-ma-md"
                      size="50px"
                      :thickness="0.05"
                      color="green"
                      track-color="grey-3"
                      readonly
                    >
                      {{ box4 }}
                    </q-knob>
                  </div>
                </template>
              </HofsteeCard>
            </div>
          </div>

          <!-- Bottom right card -->
          <div v-if="false" class="row full-width pl-10">
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
      selectedProject: ref(null),
      box1: ref(81),
      box2: ref(21),
      box3: ref(0),
      box4: ref(0),
      // New Statistics Variables
      completionRate: ref(0),
      activeProjectsCount: ref(0),
      inactiveProjectsCount: ref(0),
      overdueWorksCount: ref(0),
      plannedWorksCount: ref(0),
      actualWorksCount: ref(0),
      completedWorksCount: ref(0)
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
      return this.projectListMapped.filter(
        item => (item.id = this.selectedProject.id)
      )
    },
    mappedProject: function () {
      return this.projectListMapped.map(item => {
        return {
          id: item.id,
          value: item.id,
          label: item.title,
          title: item.title
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
    await this.getGlobalStats() // Fetch global stats
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
    async getGlobalStats() {
      // Fetch all tasks
      const allTasksRef = this.$fbref(this.$fbdb, 'task')
      this.$fbonValue(allTasksRef, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          return
        }

        let totalTasks = 0
        let completedTasks = 0
        let overdueCount = 0
        let plannedCount = 0
        // let actualCount = 0 // Assuming 'Actual Work' means 'Timely done' or just Completed? Instruction says: "Number of Actual Work". Implementation Plan: Count of isCompleted.
        // Wait, "Actual Work" in the UI says "Timely done". "Work Done" says "Ahead of time".
        // The user instruction is simply:
        // - Completion rate percentage
        // - Number of Active Projects
        // - Number of Inactive Projects
        // - Number of Overdue Works
        // - Number of Planned Works
        // - Number of Actual Work
        // - Number of Completed Works

        // I will adhere to:
        // Completed Works = Count of isCompleted == true
        // Actual Work = Count of isCompleted == true (Maybe same? Or 'Actual' implies work that happened?)
        // Let's look at the UI labels again.
        // Box 1: Work Due (Behind schedule)
        // Box 2: Planned Works (To be done)
        // Box 3: Actual Work (Timely done)
        // Box 4: Work Done (Ahead of time)

        // Interpretation:
        // Overdue Works -> Work Due
        // Planned Works -> Planned Works
        // Actual Work -> Actual Work
        // Completed Works -> Work Done

        // Logic:
        // Overdue: !isCompleted && timeline.to < today
        // Planned: !isCompleted && timeline.to >= today
        // Completed: isCompleted == true

        // Note: The UI has 4 boxes. The user asked for 4 stats for "the next widget".
        // 1. Overdue Works -> Box 1
        // 2. Planned Works -> Box 2
        // 3. Actual Work -> Box 3
        // 4. Completed Works -> Box 4

        // Defining "Actual Work" vs "Completed Works":
        // Maybe "Actual Work" is "Started but not finished"? Or "In Progress"?
        // Or maybe:
        // Completed Works = Total Completed.
        // Actual Work = Completed within timeline?
        // Let's stick to simple interpretations unless defined.
        // "Actual Work" might be "Total Works that have valid timeline and are not archived".
        // Or maybe "Actual Work" is "In Progress" (Started).

        // The user said: "Number of Actual Work".
        // I will map:
        // Overdue Works -> overdueCount (!completed && due date passed)
        // Planned Works -> plannedCount (!completed && due date future)
        // Actual Work -> completedCount (Total completed) - Wait, then what is "Completed Works"?

        // Let's check the Schema for status.
        // Task has `isCompleted`, `isArchived`, `timeline.from`, `timeline.to`.

        // Alternative interpretation:
        // Actual Work = Current running (Active) works?
        // Let's try:
        // Actual Work = Tasks that are NOT completed and NOT overdue? (i.e. currently in progress).
        // Then "Planned Works" = Tasks that haven't started yet? (timeline.from > today)

        // Let's refine based on "Planned" vs "Due".
        // Work Due (Behind schedule) = Overdue.
        // Planned Works (To be done) = Future/Current.

        // Let's look at Box 3 and 4 again.
        // Box 3: Actual Work (Timely done)
        // Box 4: Work Done (Ahead of time)

        // This implies performance metrics.
        // "Timely done" = Completed <= timeline.to
        // "Ahead of time" = Completed < timeline.to (significantly?)

        // However, the user task might just want the RAW COUNTS for simpler categories.
        // User asked for:
        // 1. Overdue Works
        // 2. Planned Works
        // 3. Actual Work
        // 4. Completed Works

        // Let's assume:
        // Overdue = !completed && due < today
        // Planned = !completed && due >= today
        // Completed = isCompleted == true
        // Actual Work = Total Tasks? Or maybe "Active Work"?
        // Let's set Actual Work = Total Tasks for now (Projected + Completed).
        // Or maybe "Actual Work" = "Work Done" count, and "Completed Works" is something else?

        // Wait, "Number of Completed Works" is item 4.
        // "Number of Actual Work" is item 3.

        // Let's count:
        // 1. Overdue
        // 2. Planned (Pending)
        // 3. Actual (Total Valid Tasks? or In Progress?)
        // 4. Completed

        // I'll calculate:
        // Overdue = !isCompleted && moment(to).isBefore(today)
        // Planned = !isCompleted && moment(to).isSameOrAfter(today)
        // Completed = isCompleted
        // Actual = Total number of tasks (excluding archived?)

        // Let's check "Completion rate percentage".
        // Rate = Completed / Total * 100.

        const today = moment().startOf('day')

        Object.values(data).forEach(projectTasks => {
          if (!projectTasks) return
          Object.values(projectTasks).forEach(task => {
            if (task.isArchived) return

            totalTasks++

            if (task.isCompleted) {
              completedTasks++
            } else {
              // Not completed
              const dueDate = moment(task.timeline?.to, 'YYYY/MM/DD')
              if (dueDate.isValid()) {
                if (dueDate.isBefore(today)) {
                  overdueCount++
                } else {
                  plannedCount++
                }
              } else {
                // No due date, count as planned/pending
                plannedCount++
              }
            }
          })
        })

        this.completionRate =
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        this.overdueWorksCount = overdueCount
        this.plannedWorksCount = plannedCount
        this.completedWorksCount = completedTasks

        // For "Actual Work", let's use Total Tasks for now, or maybe it's "Active" tasks (Overdue + Planned)?
        // Use "Active" (Overdue + Planned) as Actual Work?
        // Or maybe "Actual Work" is "Total Work" -> sum of all.
        // I'll set Actual Work = Total Tasks.
        this.actualWorksCount = totalTasks

        // Update Boxes
        this.box1 = this.overdueWorksCount
        this.box2 = this.plannedWorksCount
        this.box3 = this.actualWorksCount // "Actual Work"
        this.box4 = this.completedWorksCount // "Completed Works" (Work Done)
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
          // console.log('sortedGroupedData', sortedGroupedData)
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
          // console.log('data', data)
          if (this.$isFalsyString(data)) {
            this.projectList = []
            return
          }
          let data_ = Object.values(data)
          this.projectList = data_

          // Calculate Active/Inactive Projects globally (before filtering by user role if we want global stats visible to admin)
          // As this is Admin dashboard, we likely want all projects?
          // The code 'const isAdmin = adminUser.role === 'admin'' in login suggests differentiation.
          // But here in getProjects it filters by role.
          // If the user is Admin, they see everything?
          // Looking at logic:
          // if (role === 'client') ...
          // if (role === 'agent') ...
          // if (role === 'constructor') ...
          // It seems Admin (default) sees all.

          this.activeProjectsCount = data_.filter(p => p.isActivated).length
          this.inactiveProjectsCount = data_.filter(p => !p.isActivated).length

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

          // console.log('data_', data_)
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

      // Fetch all events from all projects
      const events = this.$fbref(this.$fbdb, 'events')
      this.$fbonValue(events, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.calendarOptions.events = []
          this.fetchingEvents = false
          return
        }

        // data is { projectId: { eventId: eventObj, ... }, ... }
        // We need to flatten this to [ eventObj, ... ]
        let allEvents = []
        Object.values(data).forEach(projectEvents => {
          if (projectEvents) {
            allEvents = allEvents.concat(Object.values(projectEvents))
          }
        })

        // console.log('allEvents', allEvents)
        this.calendarOptions.events = allEvents

        // 2. Filter the array
        const nextWeekEvents = allEvents
          .filter(event => {
            // Check if the date is "isBetween" the range [inclusive]
            return moment(event.start).isBetween(
              tomorrow,
              nextWeekEnd,
              null,
              '[]'
            )
          })
          .map(item => {
            item.day = moment(item?.start, 'YYYY-MM-DD').format('dddd')

            return item
          })
          .sort((a, b) => {
            // 2. Sort by recency (Soonest date first)
            // Subtracting timestamps: smaller (sooner) comes first
            return moment(a.start).valueOf() - moment(b.start).valueOf()
          })

        // console.log('nextWeekEvents', nextWeekEvents)
        this.reminders = nextWeekEvents

        const today = moment().startOf('day')

        // 2. Filter for the exact match
        const todaysEvents = allEvents
          .filter(event => {
            // We specify 'day' as the second argument to ignore time differences
            return moment(event.start).isSame(today, 'day')
          })
          .sort((a, b) => {
            // 2. Sort by recency (Soonest date first)
            // Subtracting timestamps: smaller (sooner) comes first
            return moment(a.start).valueOf() - moment(b.start).valueOf()
          })

        // console.log('Todays Event', todaysEvents)

        this.todaysTask = todaysEvents.filter(event => {
          return event.eventType === 'Task'
        })
        // console.log('this.todaysTask', this.todaysTask)

        this.todaysMeeting = todaysEvents.filter(event => {
          return event.eventType === 'Meeting'
        })
        // console.log('this.todaysMeeting', this.todaysMeeting)

        this.fetchingEvents = false
      })
    },
    getBorderColor(eventType) {
      if (eventType == 'Reminder') {
        return 'cancel'
      }

      if (eventType == 'Task') {
        return 'green'
      }

      if (eventType == 'Meeting') {
        return 'red'
      }
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
