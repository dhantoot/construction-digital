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
  <div class="row">
    <div class="full-width">
      <q-card class="m-10">
        <q-card-section class="p-0">
          <apexchart
            type="line"
            height="350"
            :options="chartOptions4"
            :series="series4"
          ></apexchart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row justify-between">
    <div class="col">
      <q-card class="m-10">
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-red">UV</div>
              <div>Strong</div>
            </div>
            <div class="row justify-end">
              <!-- <apexchart type="radialBar" height="70" :options="chartOptions5" :series="series5"></apexchart> -->
              <q-knob
                show-value
                font-size="16px"
                class="text-red q-ma-md"
                v-model="box1"
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
      <q-card class="m-10">
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-amber">Humidity</div>
              <div>Weak</div>
            </div>
            <div class="row justify-end">
              <q-knob
                show-value
                font-size="16px"
                class="text-amber q-ma-md"
                v-model="box2"
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
  <div class="row justify-between">
    <div class="col">
      <q-card class="m-10">
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-blue">Progress</div>
              <div>Over time</div>
            </div>
            <div class="row justify-end">
              <q-knob
                show-value
                font-size="16px"
                class="text-blue q-ma-md"
                v-model="box3"
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
      <q-card class="m-10">
        <q-card-section>
          <div class="column">
            <div class="">
              <div class="text-weight-bold text-green">Real Feel</div>
              <div>Temperature</div>
            </div>
            <div class="row justify-end">
              <q-knob
                show-value
                font-size="16px"
                class="text-green q-ma-md"
                v-model="box4"
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
  <div class="row">
    <div class="full-width">
      <q-card class="m-10">
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
</template>
<script>
import { ref } from 'vue'
import moment from 'moment'

export default {
  title: 'Dashboard',
  setup () {
    const visible = ref(false)
    const visible2 = ref(false)

    return {
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
      series4: [
        {
          name: 'Session Duration',
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: 'Page Views',
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chartOptions4: {
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
          categories: [
            '01 Jan',
            '02 Jan',
            '03 Jan',
            '04 Jan',
            '05 Jan',
            '06 Jan',
            '07 Jan',
            '08 Jan',
            '09 Jan',
            '10 Jan',
            '11 Jan',
            '12 Jan'
          ]
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + ' (mins)'
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + ' per session'
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
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      subExp: ref(true),
      openAgreement: ref(true),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
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
    this.showTextLoading2()
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
    showTextLoading2 () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 200)
      // console.log('loaded in ', ms, ' ms')
      this.visible2 = true
      setTimeout(() => {
        this.visible2 = false
      }, ms)
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
