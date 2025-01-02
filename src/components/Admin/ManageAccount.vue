<template>
    <h5 class="text-center">Manage Accounts here</h5>
    <div class="row full-width q-px-lg">
      <q-card class="q-mt-lg full-width round-btn adminCard">
      <q-card-section>
        <div class="text-h6">Account list</div>
        <div class="text-subtitle2 text-right"></div>
      </q-card-section>
      <q-table
        no-data-label="I didn't find anything for you"
        class="q-mb-sm q-mr-sm"
        row-key="uid"
        :rows="rows"
        :columns="columns"
        :loading="rowLoading"
        :visible-columns="visibleColumns"
        :rows-per-page-options="[10]"
      >
        <template v-slot:loading>
          <q-inner-loading :showing="visible">
            <q-spinner-ios size="50px" color="secondary" />
          </q-inner-loading>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="uid" :props="props">
              {{ props.row.uid }}
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
                {{ props.row.isActive }}
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
      <!-- <q-skeleton square/> -->
    </q-card>
    </div>
    <!-- <q-card class="q-ma-lg round-btn">
      <div class="row justify-center q-pa-lg q-gutter-sm">
        <q-input
            dense
            placeholder="Search place"
            v-model="searchKey"
            filled
        />
        <q-btn icon="las la-search" color="purple" @click="search" class="round-btn"/>
      </div>
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary"/>
      </q-inner-loading>
    </q-card> -->
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
      rowLoading: ref(false),
      rows,
      columns,
      visibleColumns,
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
  min-height: 824px;
}
</style>
