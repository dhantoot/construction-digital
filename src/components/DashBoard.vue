<template>
  <div v-if="false" class="row">
    <div class="full-width">
      <q-card class="m-10">
        <q-card-section class="p-0">
          <apexchart
            type="rangeBar"
            height="350"
            :options="chartOptions1"
            :series="series1"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div v-if="true" class="row justify-between">
    <div class="col">
      <q-card
        :flat="$q.dark.isActive"
        class="m-10"
        :class="$q.dark.isActive ? 'bg-grey-10' : ''"
      >
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-red">Work Due</div>
              <div>Behind Schedule</div>
            </div>
            <div class="row justify-end">
              <!-- <apexchart type="radialBar" height="70" :options="chartOptions5" :series="series5"></apexchart> -->
              <q-knob
                v-model="box1"
                show-value
                font-size="16px"
                class="text-red q-ma-md"
                size="50px"
                :thickness="0.05"
                color="red"
                track-color="grey-3"
              >
                <!-- <q-icon name="volume_up" class="q-mr-xs" /> -->
                {{ box1 }}%
              </q-knob>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        :flat="$q.dark.isActive"
        class="m-10"
        :class="$q.dark.isActive ? 'bg-grey-10' : ''"
      >
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-amber">Planned Works</div>
              <div>To be done</div>
            </div>
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
              >
                {{ box2 }}%
              </q-knob>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div v-if="true" class="row justify-between">
    <div class="col">
      <q-card
        :flat="$q.dark.isActive"
        class="m-10"
        :class="$q.dark.isActive ? 'bg-grey-10' : ''"
      >
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-blue">Actual Work</div>
              <div>Timely Done</div>
            </div>
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
              >
                {{ box3 }}%
              </q-knob>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card
        :flat="$q.dark.isActive"
        class="m-10"
        :class="$q.dark.isActive ? 'bg-grey-10' : ''"
      >
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-green">Work Done</div>
              <div>Ahead of time</div>
            </div>
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
              >
                {{ box4 }}°
              </q-knob>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div>
    <div>
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
    </div>

    <div v-if="false" class="row">
      <div class="full-width">
        <q-card :flat="$q.dark.isActive" class="m-10">
          <q-card-section class="p-0">
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions3"
              :series="series3"
              :anotation="annotations3"
            ></apexchart>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <q-inner-loading
    :showing="getProjectsLoader"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  >
    <q-spinner-ios size="50px" color="secondary" />
  </q-inner-loading>
</template>
<script>
import { ref } from 'vue'
import moment from 'moment'
import { date, LocalStorage } from 'quasar'

export default {
  title: 'Dashboard',
  props: {
    title: String,
    likes: Number
  },
  setup() {
    const visible = ref(false)
    const visible2 = ref(false)

    return {
      projectIds: ref([]),
      getProjectsLoader: ref(false),
      loadingtodoList: ref(false),
      projectList: ref([]),
      projectListMapped: ref([]),
      todoList: ref([]),
      series1: [
        {
          data: [
            {
              x: 'Analysis',
              y: [
                new Date('2019-02-27').getTime(),
                new Date('2019-03-04').getTime()
              ],
              fillColor: '#008FFB'
            },
            {
              x: 'Design',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime()
              ],
              fillColor: '#00E396'
            },
            {
              x: 'Coding',
              y: [
                new Date('2019-03-07').getTime(),
                new Date('2019-03-10').getTime()
              ],
              fillColor: '#775DD0'
            },
            {
              x: 'Testing',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime()
              ],
              fillColor: '#FEB019'
            },
            {
              x: 'Deployment',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-17').getTime()
              ],
              fillColor: '#FF4560'
            }
          ]
        }
      ],
      chartOptions1: {
        chart: {
          height: 150,
          type: 'rangeBar',
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
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            borderRadius: 10,
            dataLabels: {
              hideOverflowingLabels: false
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            const label = opts.w.globals.labels[opts.dataPointIndex]
            const a = moment(val[0])
            const b = moment(val[1])
            const diff = b.diff(a, 'days')
            return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
          },
          style: {
            colors: ['#f3f4f5', '#fff']
          }
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          show: false
        },
        grid: {
          row: {
            colors: ['#f3f4f5', '#fff'],
            opacity: 1
          }
        }
      },
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
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
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: 'XYZ - Stock Analysis (2009 - 2016)',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        yaxis: [
          {
            seriesName: 'Income',
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB'
              }
            },
            title: {
              text: 'Income (thousand crores)',
              style: {
                color: '#008FFB'
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Cashflow',
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396'
              }
            },
            title: {
              text: 'Operating Cashflow (thousand crores)',
              style: {
                color: '#00E396'
              }
            }
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019'
              }
            },
            title: {
              text: 'Revenue (thousand crores)',
              style: {
                color: '#FEB019'
              }
            }
          }
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
      series: [
        {
          name: 'Income',
          type: 'column',
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
          name: 'Cashflow',
          type: 'column',
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        },
        {
          name: 'Revenue',
          type: 'line',
          data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
      ],
      series3: [
        {
          name: 'Sales',
          data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
        }
      ],
      annotations3: {
        points: [
          {
            x: 'Bananas',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0'
              },
              text: 'Bananas are good'
            }
          }
        ]
      },
      chartOptions3: {
        chart: {
          height: 250,
          type: 'bar',
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
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: [
            'Apples',
            'Oranges',
            'Strawberries',
            'Pineapples',
            'Mangoes',
            'Bananas',
            'Blackberries',
            'Pears',
            'Watermelons',
            'Cherries',
            'Pomegranates',
            'Tangerines',
            'Papayas'
          ],
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: ''
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          }
        }
      },
      projects: [],
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
      },
      series5: [67],
      chartOptions5: {
        chart: {
          height: 350,
          type: 'radialBar',
          toolbar: {
            show: true
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
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.5
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.7
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val)
                },
                color: '#111',
                fontSize: '36px',
                show: true
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Percent']
      },
      box1: ref(81),
      box2: ref(21),
      box3: ref(50),
      box4: ref(32),
      visible,
      visible2,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      subExp: ref(true),
      openAgreement: ref(true),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
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
  async mounted() {
    // this.$emit('showHeader', true, [])
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
    async getProjectByUser() {
      console.log('getProjectByUser..')
      const userDetails = LocalStorage.getItem('currentUser')
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
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    showTextLoading2() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 200)
      // console.log('loaded in ', ms, ' ms')
      this.visible2 = true
      setTimeout(() => {
        this.visible2 = false
      }, ms)
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
        const userDetails = LocalStorage.getItem('currentUser')
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
    }
  }
}
</script>
<style lang="scss" scoped>
.panel-wrapper {
  opacity: 0.5; /* 50% opacity */
}

.panel {
  /* your panel styles here */
}
</style>
