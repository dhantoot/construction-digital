<template>
  <h5 class="text-center">Manage Invites here..</h5>
  <div class="row full-width q-px-xl">
    <div
      class="column justify-start col-lg-6 col-md-6 col-sm-12 col-xs-12 q-gutter-y-md"
    >
      <label> Select email to send invitation </label>
      <div class="row q-gutter-x-md">
        <q-select
          dense
          filled
          v-model="model"
          use-input
          use-chips
          multiple
          input-debounce="0"
          @new-value="createValue"
          :options="filterOptions"
          @filter="filterFn"
          style="width: 85%"
          clearable
          class
        />
        <q-btn
          padding="xs lg"
          color="secondary"
          icon="las la-paper-plane"
          style="height: 40px"
          :class="{
            'q-mt-sm': $q.screen.lt.lg
          }"
        />
      </div>
    </div>
    <div
      class="column justify-start col-lg-6 col-md-6 col-sm-12 col-xs-12 q-gutter-y-md"
    >
      <label
        :class="{
          'q-ml-md': true
        }"
      >
        Constructor label
      </label>
      <div
        class="row justify-start"
        :class="{
          'q-ml-xs': true
        }"
      >
        <q-radio
          v-model="userTitle"
          val="Architect"
          label="Architect"
          color="teal"
        />
        <q-radio
          v-model="userTitle"
          val="Engineer"
          label="Engineer"
          color="orange"
        />
        <q-radio
          v-model="userTitle"
          val="Foreman"
          label="Foreman"
          color="red"
        />
        <q-radio
          v-model="userTitle"
          val="Leadman"
          label="Leadman"
          color="cyan"
        />
        <q-radio
          v-model="userTitle"
          val="Worker"
          label="Worker"
          color="secondary"
        />
      </div>
    </div>
  </div>
  <div class="row full-width q-px-xl">
    <q-card class="q-mt-lg full-width">
      <q-card-section>
        <div class="text-h6">Invitation sent</div>
        <div class="text-subtitle2 text-right"></div>
      </q-card-section>
      <q-table
        no-data-label="I didn't find anything for you"
        class="q-mb-sm q-mr-sm"
        row-key="name"
        :rows="rows"
        :columns="columns"
        :loading="rowLoading"
        :visible-columns="visibleColumns"
        :rows-per-page-options="[10]"
      >
        <template v-slot:loading>
          <q-inner-loading :showing="visible">
            <q-spinner-bars size="50px" color="secondary" />
          </q-inner-loading>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="project" :props="props">
              {{ props.row.project }}
            </q-td>
            <q-td key="dateSent" :props="props">
              {{ props.row.dateSent }}
            </q-td>
            <q-td key="dateResponded" :props="props">
              {{ props.row.dateResponded }}
            </q-td>
            <q-td key="status" :props="props">
              <q-chip
                square
                class="q-pl-sm full-width"
                :class="{
                  'full-width q-px-md': $q.screen.lt.md
                }"
              >
                <q-avatar
                  :icon="getStatusIcon(props.row.status)"
                  :color="getStatusColor(props.row.status)"
                  text-color="white"
                />
                {{ props.row.status }}
              </q-chip>
            </q-td>
            <q-td key="invitee" :props="props">
              {{ props.row.invitee }}
            </q-td>
            <q-td key="resend" :props="props">
              <q-btn
                padding="xs md"
                dense
                v-if="props.row.status === 'Pending'"
                rounded
                align="between"
                class="text-capitalize text-secondary"
                text-color="primary"
                color="cancel"
                label="Resend invite"
                @click="sendEmail"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!-- <q-skeleton square /> -->
    </q-card>
  </div>
</template>
<script>
import { ref } from 'vue'
import { uid, useQuasar } from 'quasar'
// import { Email } from 'assets/smtp/smtp.js'
const stringOptions = [
  'dan.tagailo@gmail.com',
  'tagailo.danvincent@gmail.com',
  'johndoe.yopmail.com',
  'janedoe@gmail.com',
  'dyan@yahoo.com'
]

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const model = ref(null)
    const filterOptions = ref(stringOptions)
    const rows = []
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      {
        name: 'project',
        align: 'left',
        label: 'Project Title',
        field: 'project',
        sortable: true
      },
      {
        name: 'dateSent',
        align: 'left',
        label: 'Date Sent',
        field: 'dateSent',
        sortable: true
      },
      {
        name: 'dateResponded',
        align: 'left',
        label: 'Date Responded',
        field: 'dateResponded',
        sortable: true
      },
      {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status',
        sortable: true
      },
      {
        name: 'invitee',
        align: 'left',
        label: 'Invitees',
        field: 'invitee',
        sortable: true
      },
      { name: 'resend', align: 'left', label: 'Resend', field: 'resend' }
    ]
    const $q = useQuasar()

    return {
      $q,
      userTitle: ref(''),
      visibleColumns: ref([
        'project',
        'dateSent',
        'dateResponded',
        'status',
        'invitee',
        'resend'
      ]),
      visible,
      question,
      model,
      filterOptions,
      rows,
      columns,
      activatedList: ref({}),
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
      },
      createValue (val, done) {
        // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 0) {
          const modelValue = (model.value || []).slice()

          val
            .split(/[,;|]+/)
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .forEach((v) => {
              if (stringOptions.includes(v) === false) {
                stringOptions.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v)
              }
            })

          done(null)
          model.value = modelValue
        }
      },

      filterFn (val, update) {
        update(() => {
          if (val === '') {
            filterOptions.value = stringOptions
          } else {
            const needle = val.toLowerCase()
            filterOptions.value = stringOptions.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            )
          }
        })
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
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
    this.fetchProjects()
  },
  mounted () {
    console.log('mounted', this.$options)
    this.showTextLoading()
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeUnmount () {
    console.log('beforeUnmount')
  },
  unmounted () {
    console.log('unmounted')
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal === true) {
        console.log(`visible is updated from ${oldVal} to ${newVal}`)
      }
    }
  },
  methods: {
    sendEmail () {
      // Email.send({
      //   Host: 'smtp.elasticemail.com',
      //   Username: 'tagailo.danvincent@gmail.com',
      //   Password: 'dhanixblue...123',
      //   To: 'them@website.com',
      //   From: 'you@isp.com',
      //   Subject: 'This is the subject',
      //   Body: 'And this is the body'
      // }).then(
      //   message => alert(message)
      // )
    },
    getStatusColor (rowVal) {
      if (rowVal === 'Pending') return 'cancel'
      if (rowVal === 'Confirmed') return 'info'
      if (rowVal === 'Rejected') return 'negative'
    },
    getStatusIcon (rowVal) {
      if (rowVal === 'Pending') return 'las la-history'
      if (rowVal === 'Confirmed') return 'las la-check'
      if (rowVal === 'Rejected') return 'las la-times'
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async fetchProjects () {
      this.rowLoading = true
      this.rows = [
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '',
          status: 'Pending',
          invitee: 'tagailo.danvincent@gmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '2024-09-25',
          status: 'Confirmed',
          invitee: 'johndoe.yopmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '2024-09-25',
          status: 'Rejected',
          invitee: 'dan.tagailo@gmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '',
          status: 'Pending',
          invitee: 'tagailo.danvincent@gmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '2024-09-25',
          status: 'Confirmed',
          invitee: 'johndoe.yopmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '',
          status: 'Pending',
          invitee: 'dan.tagailo@gmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '2024-09-25',
          status: 'Rejected',
          invitee: 'dan.tagailo@gmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '',
          status: 'Pending',
          invitee: 'tagailo.danvincent@gmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '2024-09-25',
          status: 'Confirmed',
          invitee: 'johndoe.yopmail.com',
          resend: true
        },
        {
          id: uid(),
          project: 'The House',
          dateSent: '2024-09-23',
          dateResponded: '',
          status: 'Pending',
          invitee: 'dan.tagailo@gmail.com',
          resend: true
        }
      ]
      this.rowLoading = false
    }
  }
}
</script>
