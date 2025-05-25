<template>
  <div class="dbg px-10">
    <div class="cal dbg" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">
      <FullCalendar
        dark
        :options="calendarOptions"
        class="text"
        style="min-height: 480px;">
        <template #eventContent>
          <div class="column bg-dark p-5 eventContentOverride mx-5">
            <div class="row full-width items-center">
              <q-badge rounded color="yellow"/>
            </div>
          </div>
        </template>
      </FullCalendar>
    </div>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    >
      <q-spinner-ios size="50px" color="secondary"/>
    </q-inner-loading>
  </div>
  <q-dialog v-model="eventDialog" persistent>
    <q-card class="no-shadow" :class="[$q.dark.isActive ? 'dark' : '']">
      <div v-if="false" class=""><pre>{{ {
        'calendarOptions.events': calendarOptions.events,
        clickInfo,
        eventName,
        eventDescription
      } }}</pre></div>
      <q-card-section class="column items-center full-width gap-10">
        <q-input
          :dense="true"
          filled
          v-model="eventName"
          placeholder="Event name"
          class="full-width"
        />
        <q-input
          :dense="true"
          filled
          v-model="eventDescription"
          placeholder="Event Description"
          class="full-width"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          padding="sm xl"
          icon="las la-times"
          class="round-btn text-capitalize"
          label="Close"
          color="negative"
          @click="closeEventModal"
          v-close-popup/>
        <q-btn
          padding="sm xl"
          icon="las la-check"
          class="round-btn text-capitalize"
          :label="actionMode === 1 ? 'Save' : 'Update'"
          color="primary"
          @click="upsertEvent"
          :loading="actionAccountLoader"
          :disable="actionAccountLoader">
          <template v-slot:loading>
            <q-spinner-ios />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { uid, date } from 'quasar'
import HofsteeDialog from './Common/Dialog/HofsteeDialog.vue'
import HofsteeEventDialog from './Common/Dialog/HofsteeEventDialog.vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectPlan',
  props: {
    title: String,
    likes: Number
  },
  components: {
    FullCalendar
    // HofsteeEventDialog
  },
  setup (props) {
    console.log({ props })
    const timeStamp = Date.now()
    const todaysDate = date.formatDate(timeStamp, 'YYYY-MM-DD')
    const visible = ref(false)
    const eventDialog = ref(false)
    const question = ref('')
    const selectInfo = ref(null)
    const clickInfo = ref(null)
    const eventName = ref('')
    const eventDescription = ref('')
    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'today',
        center: 'title',
        right: 'prev,next'
      },
      initialView: 'dayGridMonth',
      events: [],
      editable: true,
      selectable: true
    })
    const actionMode = ref(1)

    // add event
    const handleDateSelect = (selectInfo_) => {
      actionMode.value = 1
      eventDialog.value = true
      // console.log('selectInfo_', selectInfo_)
      selectInfo.value = selectInfo_
      // console.log('selectInfo.value', selectInfo.value)
    }

    // Update event
    const handleEventClick = (clickInfo_) => {
      actionMode.value = 2
      console.log(clickInfo_)
      eventDialog.value = true
      clickInfo.value = clickInfo_.event

      eventName.value = clickInfo_.event.title
      eventDescription.value = clickInfo_.event?.extendedProps.description
    }

    Object.assign(calendarOptions.value, {
      dateClick: handleDateSelect,
      eventClick: handleEventClick
    })

    return {
      todaysDate,
      actionMode,
      eventName,
      eventDescription,
      clickInfo,
      selectInfo,
      eventDialog,
      HofsteeEventDialog,
      HofsteeDialog,
      handleDateSelect,
      calendarOptions,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      date: ref('2019/02/01')
    }
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
    this.init()
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
    init () {
      this.clickInfo = null
      // Load from datasource
      this.calendarOptions.events = [{
        title: 'Sample',
        description: 'The Description',
        start: this.todaysDate,
        id: uid()
      }, {
        title: '2 Sample',
        description: 'Charm T',
        start: this.todaysDate,
        id: uid()
      }]
    },
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
    },
    upsertEvent () {
      console.info('selectInfo', this.selectInfo)
      console.log(this.clickInfo)
      if (this.actionMode === 1) { // save
        this.calendarOptions.events.push({
          title: this.eventName,
          description: this.eventDescription,
          start: this.selectInfo.dateStr,
          id: uid()
        })
        this.eventDialog = false
        this.eventName = ''
        this.eventDescription = ''
      } else {
        console.log('updating..')
        const found = this.calendarOptions.events.find(e => e.id === this.clickInfo.id)
        // found.title = this.eventName
        console.log('found', found)
        found.extendedProps.description = this.eventDescription
        found.title = this.eventName
        console.log('this.calendarOptions.events', this.calendarOptions.events)
        this.eventDialog = false
        this.eventName = ''
        this.eventDescription = ''
      }
    },
    closeEventModal () {
      this.clickInfo = null
      this.eventDialog = false
      this.eventName = ''
      this.eventDescription = ''
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
.eventContentOverride {
  white-space: normal !important;
  overflow-wrap: break-word;
  word-break: break-word;
  border-radius: 5px;
}
</style>
