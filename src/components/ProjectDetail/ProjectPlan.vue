<template>
  <div class="q-ma-none">
    <div class="q-pa-sm">
      <div class="row full-width justify-between items-center">
        <strong
          class="text-bold text-h6"
          :class="{
            'text-accent': $q.dark.isActive,
            'text-primary': !$q.dark.isActive
          }"
        >
          Planning
        </strong>
        <!-- <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
        <q-icon
          size="sm"
          :color="$q.dark.isActive ? 'accent' : 'primary'"
          @click="
            $router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)
          "
        >
          <Undo2Icon />
        </q-icon>
      </div>
      <div
        class="cal"
        :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
      >
        <FullCalendar
          dark
          :options="calendarOptions"
          class="text"
          style="min-height: 480px"
        >
          <template #eventContent>
            <div class="column bg-dark p-5 eventContentOverride mx-5">
              <div class="row full-width items-center">
                <q-badge rounded color="yellow" />
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
      <q-spinner-ios size="50px" color="secondary" />
    </q-inner-loading>
  </div>
  <q-dialog v-model="eventDialog" persistent>
    <q-card class="no-shadow" :class="[$q.dark.isActive ? 'dark' : '']">
      <div v-if="false" class="">
        <pre>{{
          {
            'calendarOptions.events': calendarOptions.events,
            clickInfo,
            eventName,
            eventDescription
          }
        }}</pre>
      </div>
      <q-card-section class="column items-center full-width gap-10">
        <q-input
          v-model="eventName"
          :dense="true"
          filled
          placeholder="Event name"
          class="full-width"
        />
        <q-input
          v-model="eventDescription"
          :dense="true"
          filled
          placeholder="Event Description"
          class="full-width"
        />
      </q-card-section>
      <q-card-actions align="center" class="q-pa-md">
        <q-btn
          v-close-popup
          padding="sm lg"
          class="round-btn text-capitalize"
          color="negative"
          @click="closeEventModal"
        >
          <div class="row full-width gap-5 items-center">
            <XIcon size="20" />
            Cancel
          </div>
        </q-btn>

        <q-btn
          padding="sm lg"
          class="round-btn text-capitalize"
          color="primary"
          :loading="actionAccountLoader"
          :disable="actionAccountLoader"
          @click="upsertEvent()"
        >
          <template #loading>
            <q-spinner-ios />
          </template>

          <div class="row full-width gap-5 items-center">
            <CheckIcon size="20" />
            {{ actionMode === 1 ? 'Save' : 'Update' }}
          </div>
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
import HofsteeDialog from '../Common/Dialog/HofsteeDialog.vue'
import HofsteeEventDialog from '../Common/Dialog/HofsteeEventDialog.vue'
import { useMainStore } from 'stores/main'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectPlan',
  components: {
    FullCalendar
    // HofsteeEventDialog
  },
  props: {
    title: String,
    likes: Number
  },
  setup(props) {
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
    const mainStore = useMainStore()

    // add event
    const handleDateSelect = selectInfo_ => {
      actionMode.value = 1
      eventDialog.value = true
      // console.log('selectInfo_', selectInfo_)
      selectInfo.value = selectInfo_
      // console.log('selectInfo.value', selectInfo.value)
    }

    // Update event
    const handleEventClick = clickInfo_ => {
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
      mainStore,
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
      loadingAddEventSubmit: ref(false),
      initFunction() {
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
  beforeCreate() {
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    this.showTextLoading()
    this.init()
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
    async init() {
      this.clickInfo = null
      // Load from datasource
      await this.getEvents()
    },
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
    async upsertEvent() {
      if (this.actionMode === 1) {
        // save
        await this.saveEvent()
        this.eventDialog = false
        this.eventName = ''
        this.eventDescription = ''
      } else {
        const found = this.calendarOptions.events.find(
          e => e.id === this.clickInfo.id
        )
        await this.updateEvent({
          id: found?.id,
          start: found?.start,
          title: this.eventName,
          description: this.eventDescription
        })
        this.eventDialog = false
        this.eventName = ''
        this.eventDescription = ''
      }
    },
    closeEventModal() {
      this.clickInfo = null
      this.eventDialog = false
      this.eventName = ''
      this.eventDescription = ''
    },
    async getEvents() {
      this.fetchingEvents = true
      // const todo = this.$fbref(this.$fbdb, 'todo')
      const events = this.$fbref(
        this.$fbdb,
        `events/${this.$route.params.projectId}`
      )
      this.$fbonValue(events, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.calendarOptions.events = []
          this.fetchingEvents = false
          return
        }
        const data_ = Object.values(data)
        this.calendarOptions.events = data_
        this.fetchingEvents = false
      })
    },
    async saveEvent() {
      this.loadingAddEventSubmit = true
      const generatedUid = uid()
      const payload = {
        id: generatedUid,
        title: this.eventName,
        description: this.eventDescription,
        start: this.selectInfo.dateStr
      }
      const updates = {}
      updates[`events/${this.$route.params.projectId}/${generatedUid}/`] =
        payload
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.loadingAddEventSubmit = false
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(error => {
          this.loadingAddEventSubmit = false
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found\n' + error,
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    },
    async updateEvent(val) {
      const updates = {}
      updates[`events/${this.$route.params.projectId}/${val.id}/`] = val
      await this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Updated',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(() => {
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.fc-theme-standard td,
.fc-theme-standard th {
  border: 0.1px solid rgba(255, 255, 255, 0.14) !important;
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
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
