<template>
  <div class="row hide-scrollbar" style="height: 94.5vh;">
    <div class="column full-width full-height q-pa-sm gap-10">

      <q-card class="round-panel full-width no-shadow px-10">
        <div class="row justify-start gap-20 q-py-md">
          <div class="column justify-start gap-20" :class="[$q.screen.lt.sm ? 'full-width' : '']">
            <div class="caption text-bold">Select Project</div>
            <q-select
              behavior="menu"
              popup-content-class="popupSelectContent"
              use-input
              use-chips
              dense
              filled
              v-model="selectedProject"
              :options="filterOptions2"
              @filter="filterProject"
              @update:model-value="onUpdateSelectedProject"
            >
            <template #option="scope">
              <div class="">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
            </q-select>
          </div>
          <div class="column justify-start gap-20">
            <div class="caption text-bold">Constructor label</div>
            <div class="row gap-10 items-center mt-8">
              <q-radio dense v-model="userTitle" val="Architect" label="Architect" color="teal" />
              <q-radio dense v-model="userTitle" val="Engineer" label="Engineer" color="orange" />
              <q-radio dense v-model="userTitle" val="Foreman" label="Foreman" color="red" />
              <q-radio dense v-model="userTitle" val="Leadman" label="Leadman" color="cyan" />
              <q-radio dense v-model="userTitle" val="Worker" label="Worker" color="secondary" />
            </div>
          </div>
          <div class="column justify-start gap-20" :class="[$q.screen.lt.sm ? 'full-width' : '']">
            <div class="caption text-bold">Select email to send invitation</div>
            <div class="row gap-10">
              <q-select
                behavior="menu"
                popup-content-class="popupSelectContent"
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
                option-value="email"
                option-label="email"
                :class="{
                  'q-pb-sm full-width': $q.screen.width < 433
                }">
                <template #option="scope">
                  <div class="">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.email }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                </template>
              </q-select>
              <q-btn padding="xs lg" color="primary" icon="las la-paper-plane" style="height: 40px; width: 150px"
                :class="{
                  'text-capitalize': true,
                  'q-ml-none full-width': $q.screen.width < 433
                }" :disable="!model ||
                    model.map((e) => e.email).length < 1 ||
                    sendEmailLoader ||
                    !selectedProject ||
                    !userTitle
                    " @click="sendInvitation" :loading="sendEmailLoader" label="Send" class="round-btn">
                <template #loading>
                  <q-spinner-ios class="on-left" />
                  <small>Sending..</small>
                </template>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="row full-width">
          <q-table
            no-data-label="I didn't find anything for you"
            class="q-mb-sm full-width no-shadow"
            row-key="projectName"
            :grid="$q.screen.lt.sm"
            :rows="rows"
            :columns="columns"
            :loading="rowLoading"
            :visible-columns="visibleColumns"
            :rows-per-page-options="[12]">

            <!-- loading slot -->
            <template #loading>
              <q-inner-loading :showing="visible">
                <q-spinner-ios size="50px" color="secondary" />
              </q-inner-loading>
            </template>

            <!-- Default Body slot-->
            <template #body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="projectName" :props="props">
                  {{ props.row.projectName }}
                </q-td>
                <q-td key="dateSent" :props="props">
                  {{ props.row.dateSent }}
                </q-td>
                <q-td key="dateResponded" :props="props">
                  {{ props.row.dateResponded }}
                </q-td>
                <q-td key="status" :props="props">
                  <q-chip square class="q-pl-sm full-width" :class="{
                    'full-width q-px-md': q.screen.lt.md
                  }">
                    <q-avatar :icon="getStatusIcon(props.row.status)" :color="getStatusColor(props.row.status)"
                      text-color="white" />
                    {{ props.row.status }}
                  </q-chip>
                </q-td>
                <q-td key="invitee" :props="props">
                  {{ props.row.invitee }}
                </q-td>
                <q-td key="userTitle" :props="props">
                  {{ props.row.userTitle }}
                </q-td>
                <q-td key="resend" :props="props">
                  <q-btn icon="las la-share" padding="xs md" v-if="props.row.status === 'Pending'"
                    class="text-capitalize text-secondary round-btn shadow" text-color="primary" color="warning"
                    label="Resend invite" @click="resendInvite(props.row, props.rowIndex)" :dense="true"
                    :loading="resendInviteLoader[props.rowIndex]" :disable="resendInviteLoader[props.rowIndex]">
                    <template #loading>
                      <q-spinner-ios class="on-left" />
                      <small>Sending..</small>
                    </template>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>

            <!-- Mobile item slot -->
            <template #item="props">
              <q-card class="q-ma-sm full-width no-shadow" :style="style">
                <q-card-section>
                  <div class="text-h6">{{ props.row.projectName }}</div>
                  <div class="text-caption text-bold">{{ props.row.invitee }}
                    <q-chip
                      size="sm"
                      :icon="getStatusIcon(props.row.status)"
                      :color="getStatusColor(props.row.status)"
                      text-color="white">
                        {{ props.row.status }}
                    </q-chip>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pt-sm">
                  <div><strong>Date Sent:</strong> {{ props.row.dateSent }}</div>
                  <div><strong>Date Responded:</strong> {{ props.row.dateResponded }}</div>
                  <div><strong>Invitee:</strong> {{ props.row.invitee }}</div>
                  <div><strong>User Title:</strong> {{ props.row.userTitle }}</div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    icon="las la-share"
                    padding="xs md"
                    v-if="props.row.status === 'Pending'"
                    class="text-capitalize text-secondary round-btn shadow"
                    text-color="primary"
                    color="warning"
                    label="Resend invite"
                    @click="resendInvite(props.row, props.rowIndex)"
                    :dense="true"
                    :loading="resendInviteLoader[props.rowIndex]"
                    :disable="resendInviteLoader[props.rowIndex]"
                  >
                    <template v-slot:loading>
                      <q-spinner-ios class="on-left" />
                      <small>Sending..</small>
                    </template>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </template>
          </q-table>
        </div>
      </q-card>

      <q-card v-if="false" class=" round-panel full-width full-height no-shadow" :style="$q.screen.gt.sm ? 'height: 78vh;' : ''">
        <q-card-section>
          <div class="text-h6">Invitation sent</div>
          <div class="text-subtitle2 text-right"></div>
        </q-card-section>

        <q-table
          no-data-label="I didn't find anything for you"
          class="q-mb-sm"
          row-key="projectName"
          :grid="$q.screen.lt.sm"
          :rows="rows"
          :columns="columns"
          :loading="rowLoading"
          :visible-columns="visibleColumns"
          :rows-per-page-options="[12]">

          <!-- loading slot -->
          <template #loading>
            <q-inner-loading :showing="visible">
              <q-spinner-ios size="50px" color="secondary" />
            </q-inner-loading>
          </template>

          <!-- Default Body slot-->
          <template #body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="projectName" :props="props">
                {{ props.row.projectName }}
              </q-td>
              <q-td key="dateSent" :props="props">
                {{ props.row.dateSent }}
              </q-td>
              <q-td key="dateResponded" :props="props">
                {{ props.row.dateResponded }}
              </q-td>
              <q-td key="status" :props="props">
                <q-chip square class="q-pl-sm full-width" :class="{
                  'full-width q-px-md': q.screen.lt.md
                }">
                  <q-avatar :icon="getStatusIcon(props.row.status)" :color="getStatusColor(props.row.status)"
                    text-color="white" />
                  {{ props.row.status }}
                </q-chip>
              </q-td>
              <q-td key="invitee" :props="props">
                {{ props.row.invitee }}
              </q-td>
              <q-td key="userTitle" :props="props">
                {{ props.row.userTitle }}
              </q-td>
              <q-td key="resend" :props="props">
                <q-btn icon="las la-share" padding="xs md" v-if="props.row.status === 'Pending'"
                  class="text-capitalize text-secondary round-btn shadow" text-color="primary" color="warning"
                  label="Resend invite" @click="resendInvite(props.row, props.rowIndex)" :dense="true"
                  :loading="resendInviteLoader[props.rowIndex]" :disable="resendInviteLoader[props.rowIndex]">
                  <template #loading>
                    <q-spinner-ios class="on-left" />
                    <small>Sending..</small>
                  </template>
                </q-btn>
              </q-td>
            </q-tr>
          </template>

          <!-- Mobile item slot -->
          <template #item="props">
            <q-card class="q-ma-sm" bordered>
              <q-card-section>
                <div class="text-h6">{{ props.row.projectName }}</div>
                <div class="text-caption text-grey">ID: --</div>
              </q-card-section>

              <q-separator />

              <q-card-section class="q-pt-sm">
                <div><strong>Date Sent:</strong> {{ props.row.dateSent }}</div>
                <div><strong>Date Responded:</strong> {{ props.row.dateResponded }}</div>
                <div><strong>Invitee:</strong> {{ props.row.invitee }}</div>
                <div><strong>User Title:</strong> {{ props.row.userTitle }}</div>

                <div class="q-mt-sm">
                  <q-chip square class="q-pl-sm full-width q-px-md">
                    <q-avatar :icon="getStatusIcon(props.row.status)" :color="getStatusColor(props.row.status)" text-color="white" />
                    {{ props.row.status }}
                  </q-chip>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  icon="las la-share"
                  padding="xs md"
                  v-if="props.row.status === 'Pending'"
                  class="text-capitalize text-secondary round-btn shadow"
                  text-color="primary"
                  color="warning"
                  label="Resend invite"
                  @click="resendInvite(props.row, props.rowIndex)"
                  :dense="true"
                  :loading="resendInviteLoader[props.rowIndex]"
                  :disable="resendInviteLoader[props.rowIndex]"
                >
                  <template v-slot:loading>
                    <q-spinner-ios class="on-left" />
                    <small>Sending..</small>
                  </template>
                </q-btn>
              </q-card-actions>
            </q-card>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { uid, useQuasar, date, patterns } from 'quasar'
import CryptoJS from 'crypto-js'
// import formatdate from 'src/directives/formatdate'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.

export default {
  title: 'ProjectList',
  // directives: { formatdate },
  setup () {
    const visible = ref(false)
    const question = ref('')
    const model = ref(null)
    const stringOptions = ref([])
    const stringOptions2 = ref([])

    const filterOptions = ref([])
    const filterOptions2 = ref([])
    const rows = ref([])
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      {
        name: 'projectName',
        align: 'left',
        label: 'Project Title',
        field: 'projectName',
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
      {
        name: 'userTitle',
        align: 'left',
        label: 'Position',
        field: 'userTitle',
        sortable: true
      },
      { name: 'resend', align: 'center', label: 'Resend', field: 'resend' }
    ]
    const q = useQuasar()

    return {
      style: ref({
        'background-color': computed(() => q.dark.isActive ? 'rgba(255, 255, 255, 0.1)' : '#f0f4f7'),
        'border-radius': '8px',
        border: '.1px solid rgb(198 198 198, 0.5)'
      }),
      rowLoading: ref(false),
      stringOptions2,
      selectedProject: ref(null),
      q,
      userTitle: ref(''),
      visibleColumns: ref([
        'projectName',
        'dateSent',
        'dateResponded',
        'status',
        'invitee',
        'userTitle',
        'resend'
      ]),
      visible,
      question,
      model,
      filterOptions,
      filterOptions2,
      rows,
      columns,
      activatedList: ref({}),
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
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
              if (stringOptions.value.includes(v) === false) {
                stringOptions.value.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v)
              }
            })

          done(null)
          model.value = modelValue
        }
      },
      sendEmailLoader: ref(false),
      getProjectsLoader: ref(false),
      resendInviteLoader: ref([])
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
  async beforeMount () {
    // console.log('beforeMount')
    await this.fetchInvites()
  },
  async mounted () {
    this.showTextLoading()

    this.stringOptions = [
      {
        id: 1,
        email: 'danvincenttagailo@gmail.com'
      },
      {
        id: 2,
        email: 'dyantagailo@gmail.com'
      },
      {
        id: 3,
        email: 'johndoe@yopmail.com'
      },
      {
        id: 4,
        email: 'janedoe@gmail.com'
      },
      {
        id: 5,
        email: 'dyan@yopmail.com'
      }
    ]
    this.getProjects()
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
    async onUpdateSelectedProject (val) {
      console.log('val', val)
      if (val) {
        this.rows = this.rows.filter(e => e.projectId === this.selectedProject.id)
        return
      }
      await this.fetchInvites()
      await this.getProjects()
    },
    filterProject (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions2 = this.stringOptions2
        } else {
          const needle = val.toLowerCase()
          this.filterOptions2 = this.stringOptions2.filter((v) =>
            v.value.toLowerCase().includes(needle.toLowerCase())
          )
        }
      })
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.stringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = this.stringOptions.filter((v) =>
            v.email.toLowerCase().includes(needle.toLowerCase())
          )
        }
      })
    },
    async resendInvite ({ invitee, subject, projectName, projectId }, index) {
      this.resendInviteLoader[index] = true
      const isEmailSent = await this.$sendEmail(invitee, subject, projectName, projectId)
      if (!isEmailSent) {
        this.$q.notify({
          icon: 'cancel',
          color: 'negative',
          message: 'Email not sent',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
        return
      }

      const resp = await this.savePendingInvitation(invitee, subject, projectName, projectId)
      this.resendInviteLoader[index] = false
      if (resp) {
        this.$q.notify({
          icon: 'check_circle',
          color: 'green',
          message: 'Email Successfully sent',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      } else {
        this.$q.notify({
          icon: 'cancel',
          color: 'negative',
          message: 'Email not sent',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      }
    },
    getStatusColor (rowVal) {
      if (rowVal === 'Pending') return 'warning'
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
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async fetchInvites () {
      this.rowLoading = true
      const invites = await this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.visible = false
          this.rows = []
          return
        }
        const data_ = Object.values(data)
        this.rows = data_
        this.rows.forEach((item) => {
          item.dateSent = date.formatDate(item._ts, 'MMM DD, YYYY HH:mm A')
          item.dateResponded = date.formatDate(item.dateResponded, 'MMM DD, YYYY HH:mm A')
          item.id = uid()
          item.resend = false
        })

        this.rowLoading = false
      })
    },
    async sendInvitation () {
      try {
        this.sendEmailLoader = true
        const { testPattern } = patterns
        const trimmedRecipients = []
        let hasMalformedEmail = false
        for await (const item of this.model) {
          if (typeof item === 'object') {
            if (testPattern.email(item.email)) {
              trimmedRecipients.push(item.email)
            } else {
              hasMalformedEmail = true
              break
            }
          } else {
            if (testPattern.email(item)) {
              trimmedRecipients.push(item)
            } else {
              hasMalformedEmail = true
              break
            }
          }
        }
        if (hasMalformedEmail) {
          this.$q.notify({
            icon: 'cancel',
            color: 'negative',
            message: 'Please check all the recepients email addresses',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          return
        }
        const recepients = trimmedRecipients.toString()
        const subject = 'Project Invitation'
        const projectName = this.selectedProject.title
        const projectId = this.selectedProject.id
        console.log({
          recepients, subject, projectName, projectId
        })
        trimmedRecipients.forEach((e) => {
          this.$sendEmail(e, subject, projectName, projectId)
        })
        const resp = await this.savePendingInvitation(recepients, subject, projectName, projectId)
        if (resp) {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Email sent',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        } else {
          this.$q.notify({
            icon: 'cancel',
            color: 'negative',
            message: 'Email not sent',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        }
        this.sendEmailLoader = false
      } catch (e) {
        this.$q.notify({
          icon: 'cancel',
          color: 'negative',
          message: 'Email not sent',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
        console.log(e)
      }
    },
    async savePendingInvitation (recepients, subject, projectName, projectId) {
      let invitee = []
      if (recepients.includes(',')) {
        invitee = recepients.split(',')
      } else {
        invitee = [recepients]
      }
      const updates = {}
      invitee.forEach((item) => {
        const record = {
          subject,
          projectName,
          projectId,
          _ts: this.$serverTimestamp,
          dateResponded: '',
          status: 'Pending',
          invitee: item,
          userTitle: this.userTitle
        }
        const emailHash = CryptoJS.SHA256(item).toString()
        updates[`invites/${emailHash}`] = record
      })
      return this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          console.log('Successfully inserted to DB')
          return true
        })
        .catch((error) => {
          console.log({ error })
          return false
        })
    },
    async getProjects () {
      console.log('getProjects fired..')
      this.getProjectsLoader = true
      const projects = this.$fbref(this.$fbdb, 'projects')
      this.$fbonValue(projects, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.stringOptions2 = []
          return
        }
        const data_ = Object.values(data)
        data_.forEach((e) => {
          e.label = e.title
          e.value = e.title
        })
        this.stringOptions2 = data_.filter((e) => e.isActivated)
        this.getProjectsLoader = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.q-separator--horizontal) {
    display: block;
    height: .1px;
}
.q-menu {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 5px;
}
</style>
