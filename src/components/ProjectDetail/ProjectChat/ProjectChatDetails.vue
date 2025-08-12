<template>
    <div class="column gap-10 q-pa-sm">
      <div class="row full-width justify-between items-center">
        <strong class="text-bold text-h6" :class="{
          'text-accent': $q.dark.isActive,
          'text-primary': !$q.dark.isActive
        }">{{ $route.query.name }}</strong>
        <!-- <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}/chat`)"/> -->
        <q-icon
        size="sm"
        :color="$q.dark.isActive ? 'accent' : 'primary'"
        @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}/chat`)">
        <Undo2Icon/>
      </q-icon>
      </div>
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
      <div>
        <q-chat-message v-for="(chat, index) in chats" :key="index"
          :name="chat.name"
          :avatar="chat.avatar"
          :text="chat.text"
          :stamp="chat.stamp"
          :bg-color="chat.bgColor"
          :text-color="chat.textColor"
          :sent="chat.name === 'me'"
       />
      </div>
      <!-- <div class="messenger-input">
        <q-input
          standout="bg-transparent"
          :input-class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
          v-model="message"
          type="textarea"
          autogrow
          style="max-height: 60px; overflow-y: auto; border-radius: 16px;"
          placeholder="Type a message..."
          class="input-field"
        />
        <q-btn round flat icon="send" class="send-btn" @click="sendMessage" :color="q.dark.isActive ? 'accent' : 'primary'"/>
      </div> -->
      <!-- <q-footer>
        <div class="row items-center no-wrap q-pa-sm messenger-input">
          <q-input
            standout="bg-transparent"
            v-model="message"
            dense
            filled
            rounded
            class="col-grow q-mr-sm"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
            :input-class="colorClass"
          />
          <q-btn round flat icon="send" :color="colorMode" @click="sendMessage" />
        </div>
      </q-footer> -->
    </div>
    <!-- <div class="bottom-nav-container">
      <q-bottom-navigation
        v-model="tab"
        class="modern-bottom-nav shadow-4"
        active-color="white"
        glossy
        :class="{
          'bg-light': !$q.dark.isActive,
          'bg-dark text-white': $q.dark.isActive
        }"
      >
      <div class="row items-center justify-between no-wrap q-pa-sm">
          <q-input
            standout="bg-transparent"
            v-model="message"
            dense
            filled
            rounded
            class="col-grow q-mr-sm"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
            :input-class="colorClass"
          />
          <q-btn round flat icon="send" :color="colorMode" @click="sendMessage" />
        </div>
    </q-bottom-navigation>
    </div> -->

    <q-footer
      class="shadow-4 q-pa-sm"
      reveal
      elevated
      :class="{
        'bg-white text-primary': !$q.dark.isActive,
        'bg-primary text-accent': $q.dark.isActive
      }"
    >
      <div class="full-width row items-center justify-between no-wrap">
        <q-input
          borderless
          dense
          filled
          hide-bottom-space
          v-ripple="false"
          v-model="message"
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
          class="col-grow q-mr-sm"
        />
        <q-btn round flat @click="sendMessage" :color="$q.dark.isActive ? 'accent' : 'primary'">
          <SendHorizontalIcon size="20" />
        </q-btn>
      </div>
    </q-footer>

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
import { useQuasar, LocalStorage, uid, date } from 'quasar'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectChatDetails',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const mainStore = useMainStore()
    const $q = useQuasar()
    const authUser = ref(null)

    return {
      authUser,
      chats: ref([]),
      sendMessageLoader: ref(false),
      getChatsLoader: ref(false),
      q: $q,
      mainStore,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      text: ref(''),
      ph: ref(''),
      dense: ref(true),
      message: ref(''),
      obj: ref({}),
      senderObj: ref({})
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
    this.showTextLoading()
    this.authUser = LocalStorage.getItem('authUser')
    this.fetchUserProfile()
    this.fetchSendersProfile()
    this.getChats()
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
    fetchUserProfile () {
      const users = this.$fbref(this.$fbdb, `users/${this.authUser.uid}`)
      this.$fbonValue(users, (snapshot) => {
        const data = snapshot.val()
        this.obj = data
      })
    },
    fetchSendersProfile () {
      const recipientUID = this.$route.params.recipientUID
      const users = this.$fbref(this.$fbdb, `users/${recipientUID}`)
      this.$fbonValue(users, (snapshot) => {
        const data = snapshot.val()
        this.senderObj = data
      })
    },
    sendMessage () {
      const userDetails = LocalStorage.getItem('currentUser')
      const {
        uid: senderUID
      } = userDetails
      const projectId = this.$route.params.projectId
      const recipientUID = this.$route.params.recipientUID
      // Your logic to send the message
      const updates = {}
      updates[`chats/${projectId}/${uid()}/`] = {
        from: senderUID,
        to: recipientUID,
        projectId,
        _ts: this.$serverTimestamp,
        text: [this.message],
        isDeleted: false,
        isSeen: false
      }
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.sendMessageLoader = false
          this.message = ''
        })
        .catch((error) => {
          console.log(error)
          this.sendMessageLoader = false
          this.message = ''
        })
    },
    timeAgo (timestamp) {
      const diffSeconds = Math.abs(Math.floor(Date.now() / 1000) - timestamp)

      if (diffSeconds < 60) {
        return `${diffSeconds} seconds ago`
      } else if (diffSeconds < 3600) {
        return `${Math.floor(diffSeconds / 60)} minutes ago`
      } else if (diffSeconds < 86400) {
        return `${Math.floor(diffSeconds / 3600)} hours ago`
      } else {
        return `${Math.floor(diffSeconds / 86400)} days ago`
      }
    },
    getChats () {
      this.getChatsLoader = true
      const userDetails = LocalStorage.getItem('currentUser')
      const {
        uid: senderUID
      } = userDetails
      const chats = this.$fbref(this.$fbdb, `chats/${this.$route.params.projectId}`)
      this.$fbonValue(chats, async (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.chats = []
          return
        }
        const recipientUID = this.$route.params.recipientUID
        this.chats = Object.values(data)
        this.chats = this.chats.filter(e => (e.from === senderUID || e.to === senderUID) && (e.from === recipientUID || e.to === recipientUID))?.sort((a, b) => a._ts - b._ts)
        this.chats.forEach(e => {
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
            e.avatar = this.senderObj?.avatar?.length > 0 ? `${this.senderObj.avatar}` : 'default-user.jpeg'
            e.size = '8'
            e.stamp = stamp
            e.textColor = 'white'
            e.bgColor = 'primary'
          } else {
            e.name = 'me'
            e.avatar = this.obj?.avatar?.length > 0 ? `${this.obj.avatar}` : 'default-user.jpeg'
            e.size = '8'
            e.stamp = stamp
            e.bgColor = 'amber-7'
          }
        })
        this.getChatsLoader = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.q-input .q-field__underline {
  display: none;
}

.messenger-input {
  display: flex;
  align-items: center;
  border-radius: 16px;
  max-height: 60px;
}

.input-field {
  flex: 1;
  // padding-left: 8px;
}

.send-btn {
  margin-left: 8px;
}

.messenger-input {
  backdrop-filter: blur(6px);
  border-radius: 16px;
}

:deep(.q-field__control:after) {
  display: none !important;
}
</style>
