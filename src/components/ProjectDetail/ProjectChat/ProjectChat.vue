<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row justify-between">
      <q-input
        standout="bg-transparent"
        :input-class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
        v-model="text"
        :dense="dense"
        :style="{
          width: '100%'
        }">
        <template v-slot:prepend>
          <!-- <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
        </template>
        <template v-slot:append>
          <q-icon v-if="!text" name="las la-search" :class="{
            'text-accent': text === '',
            'text-primary': text !== ''
          }"/>
          <q-icon v-if="text" name="clear" class="cursor-pointer text-accent" @click="text = ''"/>
        </template>
      </q-input>
    </div>
    <div class="row full-width justify-between items-center">
      <strong class="text-bold text-h6" :class="{
        'text-accent': $q.dark.isActive,
        'text-primary': !$q.dark.isActive
      }">Chat</strong>
      <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
    </div>
    <q-list class="scroll" style="height: 74vh">
      <q-item v-for="(chat, index) in chats" :key="index" clickable v-ripple @click="setChatMode(2, chat)">
        <q-item-section avatar>
          <q-avatar>
            <img :src="chat.avatar || 'default-user.jpeg'">
          </q-avatar>
        </q-item-section>

        <q-item-section :class="[chat.unread > 0 ? 'text-bold' : '']">
          <q-item-label>{{ chat.name }}</q-item-label>
          <q-item-label caption lines="1">{{ chat.lastMessage }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>{{ chat.time }}</q-item-label>
          <div v-if="false" class="debug full-height full-width">
            <q-badge color="primary" floating>{{ chat.unread }}</q-badge>
          </div>
        </q-item-section>

      </q-item>
    </q-list>
  </div>
  <q-inner-loading
    :showing="visible"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  >
    <q-spinner-ios size="50px" color="secondary"/>
  </q-inner-loading>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectChat',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const mainStore = useMainStore()

    return {
      chatMode: ref(1),
      chatDetails: ref({}),
      invites: ref([]),
      users: ref([]),
      members: ref([]),
      getInvitesLoader: ref(false),
      getUsersLoader: ref(false),
      chats: ref([]),
      mainStore,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      text: ref(''),
      ph: ref(''),
      dense: ref(true)
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
  async mounted () {
    this.visible = true
    await this.fetchAllUsers()
    console.log('done fetchAllUsers')
    await this.fetchAllInvites()
    console.log('done fetchAllInvites')

    // loadchats() was triggered inside the last part of fetchAllInvites()
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
    setChatMode (arg = 1, chatDetails = null) {
      this.chatMode = arg
      this.chatDetails = chatDetails
      this.$router.push(`/detail/${this.mainStore?.mobileSelectedProject?.id}/chat/1`)
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async loadChats () {
      const resp = this.invites.map((e, index) => {
        return {
          avatar: e.avatar,
          name: e.fullName,
          uid: e.uid,
          lastMessage: 'Hello, how are you?',
          time: '12:30 PM',
          unread: index % 2
        }
      })
      console.log('data_:loadChats', resp)
      this.chats = resp
    },
    async fetchAllUsers () {
      this.getUsersLoader = true
      const users = this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(users, async (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.users = []
          return
        }
        this.users = Object.values(data)
        console.log('data_:fetchAllUsers', this.users)
        this.getUsersLoader = false
      })
    },
    async fetchAllInvites () {
      this.getInvitesLoader = true
      const invites = this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, async (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.invites = []
          return
        }
        const data_ = Object.values(data)
        this.invites = data_.filter((e) => e.projectId === this.$route.params.projectId)
        console.log('data_:fetchAllInvites', this.invites)

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

        // populate chats
        await this.loadChats()
        this.visible = false

        this.getInvitesLoader = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.q-item {
    min-height: 48px;
    padding: 8px 0px!important;
    color: inherit;
    transition: color 0.3s, background-color 0.3s;
}
</style>
