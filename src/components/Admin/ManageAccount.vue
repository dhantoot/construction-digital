<template>
    <div class="text-center text-h6 text-bold text-white q-my-sm">Manage Accounts here</div>
    <div class="row" :class="{
      'q-px-lg': $q.screen.gt.xs,
      'q-px-sm': $q.screen.xs
    }">
    <div class="full-width">
      <q-card class="q-ma-sm adminCard round-panel">
        <q-card-section>
          <div class="text-h6">Account list</div>
          <div class="row full-width justify-left q-pt-lg">
            <div class="" v-if="selected[0]">
              <q-btn
                flat
                :label="selected[0].isActive ? 'Deactivate' : 'Activate'"
                icon="las la-power-off"
                color="transparent"
                class="text-capitalize round-btn"
                text-color="cancel"
                @click="openConfirmDialog(`Would you like to ${selected[0].isActive ? 'Deactivate' : 'Activate'} this account?`, 'updateAccountStatus')">
              </q-btn>
            </div>
            <div class="" v-if="selected[0]">
              <q-btn
                flat
                label="Delete"
                icon="las la-trash-alt"
                color="transparent"
                class="text-capitalize round-btn"
                text-color="negative"
                @click="openConfirmDialog('Would you like to delete this account?', 'deleteAccount')">
              </q-btn>
            </div>
            <div class="">
              <q-btn
                flat
                label="New"
                icon="las la-user-tie"
                color="transparent"
                class="text-capitalize round-btn"
                text-color="primary">
              </q-btn>
            </div>
        </div>
        </q-card-section>
        <q-table
          dense
          no-data-label="I didn't find anything for you"
          class="q-mb-sm q-mr-sm"
          row-key="uid"
          selection="single"
          v-model:selected="selected"
          :selection-options="selectionOptions"
          :rows="rows"
          :columns="columns"
          :loading="rowLoading"
          :visible-columns="visibleColumns"
          :rows-per-page-options="[10]"
        >
          <template v-slot:body="props">
            <q-tr :props="props" :selected="props.selected">
              <q-td key="uid" :props="props">
                {{ props.row.uid }}
              </q-td>
              <q-td auto-width>
                  <q-checkbox v-model="props.selected" @update:model-value="setSelected"/>
                </q-td>
              <q-td key="avatar" :props="props">
                <q-avatar rounded>
                  <img :src="`${props.row.avatar}`"/>
                </q-avatar>
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="firstName" :props="props">
                {{ props.row.firstName }}
              </q-td>
              <q-td key="lastName" :props="props">
                {{ props.row.lastName }}
              </q-td>
              <q-td key="isActive" :props="props">
                <q-chip
                  square
                  class="q-pl-sm full-width"
                  :class="{
                    'full-width q-px-md': $q.screen.lt.md
                  }"
                >
                  <q-avatar
                    :icon="getStatusIcon(props.row.isActive)"
                    :color="getStatusColor(props.row.isActive)"
                    text-color="white"
                  />
                  {{ props.row.isActive ? 'Active' : 'Inactive' }}
                </q-chip>
              </q-td>
              <q-td key="role" :props="props">
                {{ props.row.role }}
              </q-td>
              <q-td key="position" :props="props">
                {{ props.row.position }}
              </q-td>
              <q-td key="phone_number" :props="props">
                {{ props.row.phone_number }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-inner-loading :showing="rowLoading">
          <q-spinner-ios size="50px" color="secondary"/>
        </q-inner-loading>
    </q-card>
    </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar size="sm" icon="las la-exclamation" color="cancel" text-color="white" />
          <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative" v-close-popup/>
          <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="primary" @click="callConfirmFn()" :loading="actionAccountLoader" :disable="actionAccountLoader">
            <template v-slot:loading>
              <q-spinner-ios/>
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
<script>
import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const rows = ref([])
    const columns = [
      { name: 'uid', align: 'left', label: 'ID', field: 'uid', sortable: true },
      {
        name: 'avatar',
        align: 'left',
        label: 'Photo',
        field: 'avatar',
        sortable: true
      },
      {
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true
      },
      {
        name: 'firstName',
        align: 'left',
        label: 'First Name',
        field: 'firstName',
        sortable: true
      },
      {
        name: 'lastName',
        align: 'left',
        label: 'Last Name',
        field: 'lastName',
        sortable: true
      },
      {
        name: 'isActive',
        align: 'left',
        label: 'Status',
        field: 'isActive',
        sortable: true
      },
      {
        name: 'role',
        align: 'left',
        label: 'Role',
        field: 'role',
        sortable: true
      },
      {
        name: 'position',
        align: 'left',
        label: 'Position',
        field: 'position',
        sortable: true
      },
      { name: 'phone_number', align: 'left', label: 'Phone', field: 'phone_number' }
    ]
    const visibleColumns = [
      'avatar',
      'email',
      'firstName',
      'lastName',
      'isActive',
      'role',
      'position',
      'phone_number'
    ]

    return {
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
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
    }
  },
  components: {
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
    await this.fetchUsers()
  },
  mounted () {
    // this.$emit('showHeader', true, [])
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
    // -- Confirm Dialog Start --
    openConfirmDialog (confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn () {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    // -- Confirm Dialog End --
    async updateAccountStatus () {
      this.actionAccountLoader = true
      console.log('updating account status..')
      if (this.selected[0].email === 'tagailo.danvincent@gmail.com') {
        this.$q.notify({
          icon: 'las la-las la-exclamation-circle',
          color: 'negative',
          message: 'You cannot deactivate and Admin account',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
        this.actionAccountLoader = false
        this.selected = []
        this.confirm = false
        return
      }
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
    async deleteAccount () {
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
      }, 2000)
    },
    setSelected (value, evt) {
      console.log(value, this.selected[0])
      this.updateMode = value
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async search () {
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
    async fetchUsers () {
      this.rowLoading = true
      const users = await this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(users, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.rows = []
          return
        }
        this.rows = Object.values(data)
        this.rowLoading = false
      })
    },
    getStatusColor (rowVal) {
      if (rowVal) return 'info'
      else return 'negative'
    },
    getStatusIcon (rowVal) {
      if (rowVal) return 'las la-check'
      else return 'las la-times'
    }
  }
}
</script>
<style lang="scss" scoped>
.adminCard {
  min-height: 807px;
}
</style>
