<template>
  <div class="q-ma-none">
    <div class="q-pa-xs">
      <q-date
        v-if="false"
        v-model="date"
        :events="events"
        :event-color="(date) => (date[9] % 2 === 0 ? 'teal' : 'orange')"
        class="full-width bg-transparent"
        :text-color="$q.dark.isActive ? 'accent' : 'primary'"
        flat
     />
     <div class="cal" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">
      <FullCalendar dark :options="calendarOptions" class="text" style="min-height: 480px;">
       <template #eventContent="arg">
         <div class="q-pa-xs bg-positive">
          <div class="row">
            <p>{{ arg.event.title }}</p>
          </div>
         </div>
       </template>
     </FullCalendar>
     </div>
    </div>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    >
      <q-spinner-ios size="50px" color="secondary"/>
    </q-inner-loading>
    <q-page-sticky v-if="false" position="bottom-right" :offset="[18, 18]">
      <q-btn
        :dense="true"
        fab
        icon="las la-calendar-plus"
        color="grey-1"
        class="text-green round-btn"
     />
    </q-page-sticky>
  </div>
</template>
<script>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useQuasar } from 'quasar'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectPlan',
  components: {
    FullCalendar
  },
  setup () {
    const visible = ref(false)
    const question = ref('')
    const $q = useQuasar()
    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'today',
        center: 'title',
        right: 'prev,next'
      },
      initialView: 'dayGridMonth',
      events: []
    })

    const handleDateSelect = (selectInfo) => {
      // const title = prompt('Please enter a new title for your event')
      $q.dialog({
        title: 'Please enter a new title for your event',
        message: '',
        prompt: {
          model: '',
          type: 'text' // or 'textarea', 'password', etc.
        },
        cancel: true
      }).onOk(data => {
        const calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (data) {
          // calendarApi.addEvent({
          //   id: createEventId(),
          //   data,
          //   start: selectInfo.startStr,
          //   end: selectInfo.endStr,
          //   allDay: selectInfo.allDay
          // })
          calendarOptions.value.events.push({ title: data, start: selectInfo.dateStr })
        }
      }).onCancel(() => {
        console.log('Cancel clicked')
      })
    }

    Object.assign(calendarOptions.value, {
      dateClick: handleDateSelect
    })

    return {
      handleDateSelect,
      calendarOptions,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      date: ref('2019/02/01'),
      eventsFn (date) {
        if (
          date === '2019/02/01' ||
          date === '2019/02/05' ||
          date === '2019/02/06' ||
          date === '2019/02/09' ||
          date === '2019/02/23'
        ) {
          return true
        }
        return false
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
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    handleWeekendsToggle () {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleEventClick (clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents (events) {
      this.currentEvents = events
    }
  }
}
</script>
<style lang="scss" scoped>
.fc-theme-standard td, .fc-theme-standard th {
  border: .1px solid rgba(255, 255, 255, 0.14)!important;
}
.fc-toolbar-title {
    font-size: 1.75em;
    margin: 0px;
    color: white !important;
}
</style>
