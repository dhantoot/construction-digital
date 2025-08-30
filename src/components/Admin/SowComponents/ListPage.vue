<template>
  <q-card class="round-panel full-height full-width no-shadow px-10 pt-10">
    <div
      class="row full-width"
      :class="[
        $q.screen.lt.sm ? 'justify-between' : 'justify-left gap-10 mb-10'
      ]"
    >
      <div class="row gap-10">
        <q-btn
          rounded
          color="positive"
          size="sm"
          :disable="!selected.length"
          label="View"
          icon="las la-eye"
          no-caps
          @click="gotoTemplateDetail(selected[0].id)"
        ></q-btn>

        <q-btn
          rounded
          color="negative"
          size="sm"
          :disable="!selected.length"
          label="Delete"
          icon="las la-trash-alt"
          no-caps
          @click="
            openConfirmDialog(
              'Would you like to delete this account?',
              'deleteAccount'
            )
          "
        ></q-btn>
      </div>

      <q-btn
        rounded
        color="info"
        size="sm"
        label="New"
        no-caps
        icon="las la-plus"
        @click="createTemplate"
      ></q-btn>
    </div>
    <q-table
      v-model:selected="selected"
      no-data-label="I didn't find anything for you"
      class="q-mb-sm"
      row-key="id"
      selection="single"
      wrap-cells
      :grid="$q.screen.lt.sm"
      :selection-options="selectionOptions"
      :rows="rows"
      :columns="columns"
      :loading="rowLoading"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[10]"
      :hide-pagination="$q.screen.lt.sm"
    >
      <template #body="props">
        <q-tr :props="props" :selected="props.selected">
          <q-td auto-width>
            <q-checkbox
              v-model="props.selected"
              @update:model-value="setSelected"
            />
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="dateCreated" v-formatdate :props="props">
            {{ props.row.dateCreated }}
          </q-td>
        </q-tr>
      </template>

      <template #item="props">
        <div class="column full-width my-5">
          <HofsteeCard
            class="full-width full-height"
            :background-color="bgColor"
          >
            <template #body>
              <q-item class="row items-start">
                <q-item-section side>
                  <q-checkbox
                    v-model="props.selected"
                    dense
                    @update:model-value="setSelected"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <strong>{{ props.row.name }}</strong>
                  </q-item-label>
                  <q-item-label caption>
                    {{ props.row.description }}
                  </q-item-label>
                  <q-item-label caption>
                    <span class="text-grey">Created:</span>
                    {{ props.row.dateCreated }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template #body-loader>
              <q-inner-loading :showing="loading1">
                <q-spinner-ios size="50px" color="primary" />
              </q-inner-loading>
            </template>
          </HofsteeCard>
        </div>
      </template>
    </q-table>
    <q-inner-loading :showing="rowLoading">
      <q-spinner-ios size="50px" color="secondary" />
    </q-inner-loading>
  </q-card>
  <q-dialog v-model="confirm" persistent>
    <q-card class="no-shadow">
      <q-card-section class="row items-center">
        <q-avatar size="sm">
          <template #default>
            <CircleAlertIcon size="20" />
          </template>
        </q-avatar>
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          v-close-popup
          rounded
          size="sm"
          padding="sm xl"
          class="text-capitalize"
          color="negative"
        >
          <template #default>
            <XIcon class="q-mr-sm" />
            <span class="text-capitalize">Close</span>
          </template>
        </q-btn>
        <q-btn
          rounded
          size="sm"
          padding="sm xl"
          class="text-capitalize"
          color="primary"
          :loading="actionAccountLoader"
          :disable="actionAccountLoader"
          @click="callConfirmFn()"
        >
          <template #loading>
            <q-spinner-ios />
          </template>

          <template #default>
            <CheckIcon class="q-mr-sm" />
            <span class="text-capitalize">Confirm</span>
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import { LocalStorage, uid, date } from 'quasar'

import ellipsis from 'src/directives/ellipsis'
import formatdate from 'src/directives/formatdate'
import HofsteeCard from '../../Common/Card/HofsteeCard.vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'SowTemplate',
  components: {
    HofsteeCard
  },
  directives: { ellipsis, formatdate },
  props: {
    title: String,
    likes: Number
  },
  emits: [],
  setup() {
    const visible = ref(false)
    const question = ref('')
    const rows = ref([])
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      {
        name: 'name',
        align: 'left',
        label: 'Template Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'description',
        align: 'left',
        label: 'Description',
        field: 'description',
        sortable: true
      },
      {
        name: 'dateCreated',
        align: 'left',
        label: 'Date Created',
        field: 'dateCreated',
        sortable: true
      }
    ]
    const visibleColumns = ['name', 'description', 'dateCreated']

    return {
      loading1: ref(false),
      group: ref(['op1']),
      options: [
        {
          label: 'Option 1',
          value: 'op1'
        },
        {
          label: 'Option 2',
          value: 'op2'
        },
        {
          label: 'Option 3',
          value: 'op3'
        }
      ],
      // -- Confirm Dialog Start --
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      // -- Confirm Dialog End --

      actionAccountLoader: ref(false),
      updateMode: ref(false),
      rowLoading: ref(false),
      rows,
      columns,
      visibleColumns,
      selected: ref([]),
      selectionOptions: {
        type: 'single',
        checkbox: true,
        highlight: true
      },
      searchKey: ref(''),
      visible,
      question,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    },
    bgColor: function () {
      return this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.1)' : '#f0f4f7'
    }
  },
  beforeCreate() {
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
  },
  async beforeMount() {
    // console.log('beforeMount')
  },
  async mounted() {
    // this.$emit('showHeader', true, [])
    await this.fetchUsers()
    await this.getAllTemplate()
    this.showTextLoading('loading1')
    this.authUser = LocalStorage.getItem('authUser')
    if (this.authUser && this.authUser.uid) {
      this.uid = this.authUser.uid
    }
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
    // -- Confirm Dialog Start --
    openConfirmDialog(confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn() {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    // -- Confirm Dialog End --
    async updateAccountStatus() {
      this.actionAccountLoader = true
      console.log('updating account status..')
      const uid = this.selected[0].uid
      const status = !this.selected[0].isActive
      const updates = {}
      updates[`users/${uid}/isActive/`] = status
      await this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'secondary',
            message: 'Sucessfully Updated',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.actionAccountLoader = false
          this.selected = []
          this.confirm = false
        })
        .catch(() => {
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Update Error Found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.actionAccountLoader = false
          this.selected = []
          this.confirm = false
        })
    },
    async deleteAccount() {
      console.log('deleting account..')
      this.actionAccountLoader = true
      setTimeout(() => {
        this.actionAccountLoader = false
        this.$q.notify({
          icon: 'check_circle',
          color: 'cancel',
          message: 'Feature is not ready yet',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
        this.selected = []
        this.confirm = false
      }, 3000)
    },
    setSelected(value) {
      console.log(value, this.selected[0])
      this.updateMode = value
    },
    showTextLoading(loadingModel) {
      const ms = Math.floor(Math.random() * (3000 - 500 + 100) + 100)
      this[loadingModel] = true
      setTimeout(() => {
        this[loadingModel] = false
      }, ms)
    },
    async search() {
      const type = 'address'
      const input = this.searchKey
      const resp = await this.$findPlace(type, input)
      console.log(resp)
      this.$q.notify({
        icon: 'check_circle',
        color: 'green',
        message: 'Jimm pinged you',
        position: 'top-right',
        classes: 'notify-custom-css'
      })
    },
    async fetchUsers() {
      this.rowLoading = true
      const users = await this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(users, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.rows = []
          return
        }
        this.rows = Object.values(data)
        this.rowLoading = false
      })
    },
    getStatusColor(rowVal) {
      if (rowVal) return 'info'
      else return 'negative'
    },
    getStatusIcon(rowVal) {
      if (rowVal) return 'las la-check'
      else return 'las la-times'
    },
    async addDefaultTemplate() {
      const timeStamp = Date.now()
      const payload = {
        createdBy: this.uid,
        dateCreated: date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        name: 'Default Building Template',
        description: 'This is a default full sow of a building',
        id: uid(),
        isArchived: false,
        sow: []
      }
      const updates = {}
      updates[`sowTemplates/${payload.id}/`] = payload
      console.log(updates)
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          await this.populateSOW(payload.id)
        })
        .catch(async err => {
          console.log(err)
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          // this.loadingSubmit = false
        })
    },
    async populateSOW(templateId) {
      const sow = [
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.1',
          sowLabel: 'Mobilization/Demobilization',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.2',
          sowLabel: 'Permits and Clearances',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.3',
          sowLabel: 'Construction Safety and Health',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.4',
          sowLabel: 'Temporary Facilities',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.5',
          sowLabel: 'Plumbing and Mechanical Permit Requirements',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.6',
          sowLabel: 'Site Lay-out',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'A',
          sowGroup: 'General Requirements',
          section: 'A.7',
          sowLabel: 'As Built Drawings',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'B',
          sowGroup: 'Site Works',
          section: 'B.1',
          sowLabel: 'Site Preparation',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'B',
          sowGroup: 'Site Works',
          section: 'B.2',
          sowLabel: 'Excavation',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'B',
          sowGroup: 'Site Works',
          section: 'B.3',
          sowLabel: 'Embankment and Gravel Bedding',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'C',
          sowGroup: 'Concrete Works',
          section: 'C.1',
          sowLabel: 'Poured Concrete',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'C',
          sowGroup: 'Concrete Works',
          section: 'C.2',
          sowLabel: 'Reinforcement',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'C',
          sowGroup: 'Concrete Works',
          section: 'C.3',
          sowLabel: 'Formworks and Scaffoldings',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'D',
          sowGroup: 'Masonry',
          section: 'D.1',
          sowLabel: 'Masonry',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'E',
          sowGroup: 'Metal Work',
          section: 'E.1',
          sowLabel: 'Structural Metal Works',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'E',
          sowGroup: 'Metal Work',
          section: 'E.2',
          sowLabel: 'Roofing Works',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'E',
          sowGroup: 'Metal Work',
          section: 'E.3',
          sowLabel: 'Metal Railings and Ladder',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'E',
          sowGroup: 'Metal Work',
          section: 'E.4',
          sowLabel: 'Façade Louver',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'E',
          sowGroup: 'Metal Work',
          section: 'E.5',
          sowLabel: 'Façade Cladding Works',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'F',
          sowGroup: 'Wood Work',
          section: 'F.1',
          sowLabel: 'Blackboards',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'H',
          sowGroup: 'Doors and Windows',
          section: 'F.1',
          sowLabel: 'Doors',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'H',
          sowGroup: 'Doors and Windows',
          section: 'F.2',
          sowLabel: 'Windows',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'J',
          sowGroup: 'Finishes',
          section: 'J.1',
          sowLabel: 'Smooth Floor Screed and Plastering',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'J',
          sowGroup: 'Finishes',
          section: 'J.2',
          sowLabel: 'Tile Works',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'J',
          sowGroup: 'Finishes',
          section: 'J.3',
          sowLabel: 'Painting Works',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'J',
          sowGroup: 'Finishes',
          section: 'J.4',
          sowLabel: 'Suspended Ceiling Finish',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'Q',
          sowGroup: 'Mechanical Installation',
          section: 'Q.1',
          sowLabel: 'Pipeworks',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'Q',
          sowGroup: 'Mechanical Installation',
          section: 'Q.2',
          sowLabel: 'Sanitary Fittings',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'Q',
          sowGroup: 'Mechanical Installation',
          section: 'Q.3',
          sowLabel: 'Water Tank and Pumps',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'Q',
          sowGroup: 'Mechanical Installation',
          section: 'Q.4',
          sowLabel: 'Sprinkler System',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'R',
          sowGroup: 'Electrical Installation',
          section: 'R.1',
          sowLabel: 'Main and Sub Circuits',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'R',
          sowGroup: 'Electrical Installation',
          section: 'R.2',
          sowLabel: 'Lighting Fixtures',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        },
        {
          sectionGroup: 'R',
          sowGroup: 'Electrical Installation',
          section: 'R.3',
          sowLabel: 'FDAS System',
          contractPrice: '0.00',
          weight: '0.00%',
          duration: '0'
        }
      ]
      const updates = {}
      for await (const e of sow) {
        const sowId = uid()
        const sowPayload = {
          id: sowId,
          ...e
        }
        // sowArr.push(sowPayload)
        updates[`sowTemplates/${templateId}/sow/${sowId}/`] = sowPayload
      }
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created SOW',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(async err => {
          console.log(err)
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          // this.loadingSubmit = false
          console.log('hello world')
        })
    },
    async updateTemplate() {},
    async getAllTemplate() {
      this.sowTemplateLoader = true
      const sowTemplates = this.$fbref(this.$fbdb, 'sowTemplates')
      this.$fbonValue(sowTemplates, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.rows = []
          return
        }
        const data_ = Object.values(data)
        this.rows = data_
        this.rows.forEach(item => {
          item.dateCreated = date.formatDate(
            item.dateCreated,
            'MMM DD, YYYY HH:mm A'
          )
        })
        console.log('this.sowTemplates', this.rows)
        this.sowTemplateLoader = false
      })
    },
    async createTemplate() {
      this.$router.push('/manage-sow/create')
    },
    async gotoTemplateDetail(templateId) {
      console.log('templateId', templateId)
      console.log('this.$route.url', this.$route.url)
      this.$router.push({ path: `/manage-sow/${templateId}/detail` })
    }
  }
}
</script>
<style lang="scss" scoped>
.adminCard {
  min-height: 100%;
}
:deep(.q-separator--horizontal) {
  display: block;
  height: 0.1px;
}
</style>
