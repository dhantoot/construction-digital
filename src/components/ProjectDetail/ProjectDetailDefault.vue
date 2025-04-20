<template>
  <q-card class="no-border-radius no-shadow bg-transparent">
    <q-img :src="`${mainStore?.mobileSelectedProject?.avatarFullPath}`" height="160px">
      <div class="absolute-bottom q-mt-none row justify-between items-center">
        <div>
          <q-btn color="primary" rounded v-if="this.$route.path === `/detail/${mainStore?.mobileSelectedProject?.id}`"
            icon="las la-arrow-left" class="text-accent round-btn" @click="this.$router.push('/projects')" />
        </div>
        <div class="text-h6" v-ellipsis="20">{{ mainStore?.mobileSelectedProject?.title }}</div>
        <div>
          <q-btn disabled color="primary" rounded v-if="this.$route.path === `/detail/${mainStore?.mobileSelectedProject?.id}`"
            icon="las la-user-plus" class="text-accent round-btn" @click="this.$router.push({ path: '/new-member' })" />
        </div>
      </div>
    </q-img>
    <q-card-section flat class="q-ma-none q-pa-none">
      <div class="column full-width gap-10 q-pa-sm">
        <div class="row justify-start">
          <strong class="text-bold text-h6" :class="{
            'text-accent': $q.dark.isActive,
            'text-primary': !$q.dark.isActive
          }">Project Member</strong>
        </div>
        <q-list class="scroll" style="height: 75vh;">
          <q-item clickable v-ripple v-for="item of invites" :key="item">
            <q-item-section avatar>
              <q-avatar>
                <img :src="`${item?.avatar || 'default-user.jpeg'}`" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label caption lines="2">
                <span class="text-weight-bold" :class="{
                  'text-primary': !$q.dark.isActive,
                  'text-accent': $q.dark.isActive
                }">{{ item?.fullName }}</span>
              </q-item-label>
              <q-item-label caption lines="1">
                <span class="text-weight-light">{{ item?.userTitle }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-chip square :dense="true" :color="getColor(item)" text-color="white" :icon="getIcon(item)">
                <small>{{ item?.role }}</small>
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em">
      <q-spinner-ios size="50px" color="secondary" />
    </q-inner-loading>
  </q-card>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import ellipsis from 'src/directives/ellipsis'

export default {
  directives: { ellipsis },
  setup () {
    const visible = ref(false)
    const mainStore = useMainStore()

    return {
      invites: ref([]),
      users: ref([]),
      members: ref([]),
      getInvitesLoader: ref(false),
      getUsersLoader: ref(false),
      visible,
      lorem: ref(''),
      mainStore,
      selectedProject: ref({})
    }
  },
  async mounted () {
    this.visible = true
    await this.fetchAllUsers() // fetchAllInvites was called in the last part of fetchAllUsers()
  },
  methods: {
    getColor (item) {
      if (item.role === 'admin') {
        return 'primary'
      } else if (item.role === 'client') {
        return 'positive'
      } else if (item.role === 'agent') {
        return 'pink'
      } else {
        return 'negative'
      }
    },
    getIcon (item) {
      if (item.role !== 'admin' && item.role !== 'client' && item.role !== 'agent') {
        if (item.status === 'Pending') {
          return 'las la-user-clock'
        } else if (item.status === 'Confirmed') {
          return 'las la-user-check'
        } else {
          return 'las la-user-times'
        }
      } else if (item.role === 'admin') {
        return 'las la-user-shield'
      } else if (item.role === 'client') {
        return 'las la-user-tie'
      } else if (item.role === 'agent') {
        return 'las la-user-secret'
      }
    },
    async fetchAllUsers () {
      console.log('fetching users..')
      this.getUsersLoader = true
      const users = this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(users, async (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.users = []
          return
        }
        const data_ = Object.values(data)
        this.users = data_
        await this.fetchAllInvites()
        this.getUsersLoader = false
      })
    },
    async fetchAllInvites () {
      console.log('fetching invites..')
      this.getInvitesLoader = true
      const invites = this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.invites = []
          return
        }
        const data_ = Object.values(data)
        this.invites = data_.filter((e) => e.projectId === this.$route.params.projectId)

        // get invitees
        this.invites.forEach((item) => {
          const resp = this.users.find((e) => e.email === item.invitee)
          if (resp) {
            item.firstName = resp?.firstName
            item.lastName = resp?.lastName
            item.role = resp?.role
            item.avatar = resp?.avatar
            item.fullName = (resp?.firstName || resp?.lastName) ? `${resp?.firstName} ${resp?.lastName}` : item.invitee
          } else {
            item.fullName = item.invitee
            item.avatar = undefined
          }
        })

        // get admin details
        const resp = this.users.find((e) => e.uid === this.mainStore?.mobileSelectedProject?.createdBy)
        this.invites.unshift({
          role: resp?.role,
          userTitle: resp?.role,
          fullName: (resp?.firstName || resp?.lastName) ? `${resp?.firstName} ${resp?.lastName}` : resp?.email,
          avatar: resp?.avatar,
          uid: resp?.uid
        })

        // get agent details
        for (const item of this.mainStore?.mobileSelectedProject?.agent) {
          const agent = this.users.find((e) => e.email === item.email)
          this.invites.unshift({
            role: 'agent',
            userTitle: 'agent',
            fullName: (agent?.firstName || agent?.lastName) ? `${agent?.firstName} ${agent?.lastName}` : agent?.email || item.email,
            avatar: agent?.avatar,
            uid: agent?.uid
          })
        }

        // get client details
        for (const client of this.mainStore?.mobileSelectedProject?.client) {
          const owner = this.users.find((e) => e.email === client.email)
          this.invites.unshift({
            role: 'client',
            userTitle: 'client',
            fullName: (owner?.firstName || owner?.lastName) ? `${owner?.firstName} ${owner?.lastName}` : owner?.email || client.email,
            avatar: owner?.avatar,
            uid: owner?.uid
          })
        }

        this.getInvitesLoader = false
        this.visible = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.q-card {
  border-radius: 0px !important;
}
.hmm {
  height: calc(100vh - 81px);
}
.q-item {
    min-height: 48px;
    padding: 8px 0px!important;
    color: inherit;
    transition: color 0.3s, background-color 0.3s;
}
</style>
