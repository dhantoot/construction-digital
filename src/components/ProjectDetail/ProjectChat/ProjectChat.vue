<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row full-width justify-between items-center">
      <strong
        class="text-bold text-h6"
        :class="{
          'text-accent': $q.dark.isActive,
          'text-primary': !$q.dark.isActive
        }"
      >
        Chat
      </strong>
      <!-- <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
      <q-icon
        size="sm"
        :color="$q.dark.isActive ? 'accent' : 'primary'"
        @click="$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"
      >
        <Undo2Icon />
      </q-icon>
    </div>
    <div class="row justify-between">
      <q-input
        v-model="text"
        standout="bg-transparent"
        :input-class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
        :dense="dense"
        :style="{
          width: '100%'
        }"
      >
        <template #prepend>
          <!-- <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
        </template>
        <template #append>
          <q-icon
            v-if="!text"
            :class="{
              'text-accent': text === '',
              'text-primary': text !== ''
            }"
          >
            <SearchIcon />
          </q-icon>
          <q-icon
            v-if="text"
            name="clear"
            class="cursor-pointer text-accent"
            @click="text = ''"
          />
        </template>
      </q-input>
    </div>
    <q-list>
      <q-item
        v-for="(chat, index) in chats"
        :key="index"
        v-ripple
        clickable
        @click="setChatMode(2, chat)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="chat.avatar || 'default-user.jpeg'" />
          </q-avatar>
        </q-item-section>

        <q-item-section :class="[chat.unread > 0 ? 'text-bold' : '']">
          <q-item-label>{{ chat.name }}</q-item-label>
          <q-item-label caption lines="1">{{ chat.lastMessage }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>{{ chat.time }}</q-item-label>
          <div v-if="false" class="full-height full-width">
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
    <q-spinner-ios size="50px" color="secondary" />
  </q-inner-loading>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage, date } from 'quasar'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectChat',
  props: {
    title: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const visible = ref(false)
    const question = ref('')
    const mainStore = useMainStore()

    return {
      getChatsLoader: ref(false),
      chatMessages: ref([]),
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
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      text: ref(''),
      ph: ref(''),
      dense: ref(true)
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
  async mounted() {
    this.visible = true
    await this.fetchAllUsers()
    await this.fetchAllInvites()

    // loadchats() was triggered inside the last part of fetchAllInvites()
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
    getChats() {
      this.getChatsLoader = true
      const userDetails = LocalStorage.getItem('currentUser')
      const { uid: senderUID } = userDetails
      const chats = this.$fbref(
        this.$fbdb,
        `chats/${this.$route.params.projectId}`
      )
      this.$fbonValue(chats, async snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.chatMessages = []
          return
        }
        this.chatMessages = Object.values(data)
        this.chatMessages = this.chatMessages
          .filter(e => e.from === senderUID || e.to === senderUID)
          ?.sort((a, b) => a._ts - b._ts)
        this.chatMessages.forEach(e => {
          const dateLogged = date.formatDate(e._ts, 'MMM DD, YYYY HH:mm A')
          const dateNow = date.formatDate(Date.now(), 'MMM DD, YYYY HH:mm A')

          // const diffDays = date.getDateDiff(dateNow, dateLogged, 'days')
          const diffHours = date.getDateDiff(dateNow, dateLogged, 'hours')
          const diffMinutes = date.getDateDiff(dateNow, dateLogged, 'minutes')

          let stamp = ''
          if (diffHours === 0) {
            if (diffMinutes === 0) {
              stamp = 'Just now'
            } else {
              if (diffMinutes === 1) {
                stamp = 'a minute ago'
              } else {
                stamp = `${diffMinutes}min`
              }
            }
          } else {
            if (diffHours === 1 && diffMinutes === 0) {
              stamp = 'an hour ago'
            } else {
              if (diffHours === 1) {
                stamp = `${diffHours}hr, ${diffMinutes}min`
              } else {
                stamp = `${diffHours}hrs, ${diffMinutes}min`
              }
            }
          }

          // receiver is me
          if (e.to === senderUID) {
            e.name = this.$route.query.name
            e.avatar =
              this.senderObj?.avatar?.length > 0
                ? `${this.senderObj.avatar}`
                : 'default-user.jpeg'
            e.size = '8'
            e.stamp = stamp
            e.textColor = 'white'
            e.bgColor = 'primary'
          } else {
            e.name = 'me'
            e.avatar =
              this.obj?.avatar?.length > 0
                ? `${this.obj.avatar}`
                : 'default-user.jpeg'
            e.size = '8'
            e.stamp = stamp
            e.bgColor = 'amber-7'
          }
        })
        this.getChatsLoader = false
      })
    },
    setChatMode(arg = 1, chatDetails = null) {
      this.chatMode = arg
      this.chatDetails = chatDetails
      const { uid: recipientUID, name } = chatDetails
      this.$router.push({
        path: `/detail/${this.mainStore?.mobileSelectedProject?.id}/chat/${recipientUID}`,
        query: {
          name
        }
      })
    },
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async loadChats() {
      const userDetails = LocalStorage.getItem('currentUser')
      const { uid } = userDetails
      const resp = this.invites
        .filter(e => e.uid !== uid)
        .map(e => {
          const lastMsg = this.chatMessages.filter(
            f =>
              (f.from === uid || f.to === uid) &&
              (f.from === e.uid || f.to === e.uid)
          )[0]?.text[0]
          return {
            avatar: e.avatar,
            name: e.fullName,
            uid: e.uid,
            lastMessage: lastMsg || 'Say Hi',
            unread:
              lastMsg?.length > 0
                ? !this.chatMessages.filter(
                    f =>
                      (f.from === uid || f.to === uid) &&
                      (f.from === e.uid || f.to === e.uid)
                  )[0]?.isSeen
                : false
          }
        })
      this.chats = resp
    },
    async fetchAllUsers() {
      this.getUsersLoader = true
      const users = this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(users, async snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.users = []
          return
        }
        this.users = Object.values(data)
        this.getUsersLoader = false
      })
    },
    async fetchAllInvites() {
      this.getInvitesLoader = true
      const invites = this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, async snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.invites = []
          return
        }
        const data_ = Object.values(data)
        this.invites = data_.filter(
          e => e.projectId === this.$route.params.projectId
        )

        // get invitees
        this.invites.forEach(item => {
          const resp = this.users.find(e => e.email === item.invitee)
          if (resp) {
            item.firstName = resp?.firstName
            item.lastName = resp?.lastName
            item.role = resp?.role
            item.avatar = resp?.avatar
            item.fullName =
              resp?.firstName || resp?.lastName
                ? `${resp?.firstName} ${resp?.lastName}`
                : item.invitee
          } else {
            item.fullName = item.invitee
            item.avatar = undefined
          }
        })

        // get admin details
        const resp = this.users.find(
          e => e.uid === this.mainStore?.mobileSelectedProject?.createdBy
        )
        this.invites.unshift({
          role: resp?.role,
          userTitle: resp?.role,
          fullName:
            resp?.firstName || resp?.lastName
              ? `${resp?.firstName} ${resp?.lastName}`
              : resp?.email,
          avatar: resp?.avatar,
          uid: resp?.uid
        })

        // get agent details
        for (const item of this.mainStore?.mobileSelectedProject?.agent || []) {
          const agent = this.users.find(e => e.email === item.email)
          this.invites.unshift({
            role: 'agent',
            userTitle: 'agent',
            fullName:
              agent?.firstName || agent?.lastName
                ? `${agent?.firstName} ${agent?.lastName}`
                : agent?.email || item.email,
            avatar: agent?.avatar,
            uid: agent?.uid
          })
        }

        // get client details
        for (const client of this.mainStore?.mobileSelectedProject?.client ||
          []) {
          const owner = this.users.find(e => e.email === client.email)
          this.invites.unshift({
            role: 'client',
            userTitle: 'client',
            fullName:
              owner?.firstName || owner?.lastName
                ? `${owner?.firstName} ${owner?.lastName}`
                : owner?.email || client.email,
            avatar: owner?.avatar,
            uid: owner?.uid
          })
        }

        this.getChats()

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
  padding: 8px 0px !important;
  color: inherit;
  transition:
    color 0.3s,
    background-color 0.3s;
}
</style>
