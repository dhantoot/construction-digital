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
    <div class="scroll" style="height: 75.5vh">
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
  mounted () {
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
    }
  }
}
</script>
