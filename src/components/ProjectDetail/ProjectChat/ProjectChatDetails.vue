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
        }">John Doe</strong>
        <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}/chat`)"/>
      </div>
      <div class="scroll" style="height: 65.8vh">
        <q-chat-message
          name="me"
          avatar="avatar3.jpg"
          :text="['hey, how are you?']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
       />
        <q-chat-message
          name="Jane"
          avatar="avatar5.jpg"
          :text="[
            'doing fine, how r you?',
            'I just feel like typing a really, really, REALLY long message to annoy you...'
          ]"
          size="6"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
       />
        <q-chat-message
          name="Jane"
          avatar="avatar5.jpg"
          :text="['Did it work?']"
          stamp="1 minutes ago"
          size="8"
          text-color="white"
          bg-color="primary"
       />
        <q-chat-message
          name="me"
          avatar="avatar3.jpg"
          :text="['Yes it worked']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
       />
        <q-chat-message
          name="me"
          avatar="avatar3.jpg"
          :text="['By the way thank you very much', 'I missed you']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
       />
        <q-chat-message
          name="me"
          avatar="avatar3.jpg"
          :text="['hey, how are you?']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
       />
        <q-chat-message
          name="Jane"
          avatar="avatar5.jpg"
          :text="[
            'doing fine, how r you?',
            'I just feel like typing a really, really, REALLY long message to annoy you...'
          ]"
          size="6"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
       />
        <q-chat-message
          name="Jane"
          avatar="avatar5.jpg"
          :text="['Did it work?']"
          stamp="1 minutes ago"
          size="8"
          text-color="white"
          bg-color="primary"
       />
        <q-chat-message
          name="me"
          avatar="avatar3.jpg"
          :text="['Yes it worked']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
       />
        <q-chat-message
          name="me"
          avatar="avatar3.jpg"
          :text="['By the way thank you very much', 'I missed you']"
          stamp="7 minutes ago"
          sent
          bg-color="amber-7"
       />
      </div>
      <div class="messenger-input">
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
        <q-btn round flat icon="send" class="send-btn" @click="sendMessage" :color="[q.dark.isActive ? 'accent' : 'primary']"/>
      </div>
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
import { useQuasar } from 'quasar'

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

    return {
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
      message: ref('')
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
    sendMessage () {
      // Your logic to send the message
      console.log(this.message)
      this.message = ''
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
