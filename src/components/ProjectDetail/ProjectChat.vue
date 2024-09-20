<template>
  <div class="flex justify-between q-pa-xs bg-accent">
    <q-btn @click="this.$router.push('/detail')" flat icon="las la-arrow-left" class="text-primary q-ma-xs" />
    <q-input dark standout="bg-white" input-class="text-right text-black" v-model="text" :dense="dense" :class="{
      'q-ma-xs': true
    }" :style="{
        width: '75%'
      }">
      <template v-slot:append>
        <q-icon v-if="text === ''" name="las la-search" class="text-black" />
        <q-icon v-else name="clear" class="cursor-pointer text-black" @click="text = ''" />
      </template>
    </q-input>
  </div>
  <div class="q-pt-xs q-pl-sm q-pr-xs justify-center">
    <div class="scroll" style="height:73.4vh">
      <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg" :text="['hey, how are you?']"
        stamp="7 minutes ago" sent bg-color="amber-7" />
      <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="[
        'doing fine, how r you?',
        'I just feel like typing a really, really, REALLY long message to annoy you...'
      ]" size="6" stamp="4 minutes ago" text-color="white" bg-color="primary" />
      <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']"
        stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
      <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg" :text="['Yes it worked']"
        stamp="7 minutes ago" sent bg-color="amber-7" />
      <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['By the way thank you very much', 'I missed you']" stamp="7 minutes ago" sent bg-color="amber-7" />
      <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg" :text="['hey, how are you?']"
        stamp="7 minutes ago" sent bg-color="amber-7" />
      <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="[
        'doing fine, how r you?',
        'I just feel like typing a really, really, REALLY long message to annoy you...'
      ]" size="6" stamp="4 minutes ago" text-color="white" bg-color="primary" />
      <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']"
        stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
      <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg" :text="['Yes it worked']"
        stamp="7 minutes ago" sent bg-color="amber-7" />
      <q-chat-message name="me" avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['By the way thank you very much', 'I missed you']" stamp="7 minutes ago" sent bg-color="amber-7" />
    </div>
  </div>
  <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
</template>
<script>

import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectChat',
  setup () {
    const visible = ref(false)
    const question = ref('')

    return {
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
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
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted', this.$options)
    this.showTextLoading()
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeUnmount () {
    console.log('beforeUnmount')
  },
  unmounted () {
    console.log('unmounted')
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal === true) {
        console.log(`visible is updated from ${oldVal} to ${newVal}`)
      }
    }
  },
  methods: {
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    }
  }
}
</script>
