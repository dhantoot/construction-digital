<template>
  <div class="flex justify-between q-pa-xs bg-accent">
    <q-btn
      @click="this.$router.push('/detail')"
      flat
      icon="las la-arrow-left"
      class="text-primary q-ma-xs"
    />
    <q-input
      dark
      standout="bg-white"
      input-class="text-right text-black"
      v-model="text"
      :dense="dense"
      :class="{
        'q-ma-xs': true
      }"
      :style="{
        width: '75%'
      }"
    >
      <template v-slot:append>
        <q-icon v-if="text === ''" name="las la-search" class="text-black" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer text-black"
          @click="text = ''"
        />
      </template>
    </q-input>
  </div>
  <q-list bordered padding class="scroll" style="height: 74.7vh">
    <q-item-label header>User Controls</q-item-label>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label>Content filtering</q-item-label>
        <q-item-label caption>
          Set the content filtering level to restrict apps that can be
          downloaded
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label>Password</q-item-label>
        <q-item-label caption>
          Require password for purchase or use password to restrict purchase
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />
    <q-item-label header>General</q-item-label>

    <q-item tag="label" v-ripple>
      <q-item-section side top>
        <q-checkbox v-model="check1" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Notifications</q-item-label>
        <q-item-label caption>
          Notify me about updates to apps or games that I downloaded
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section side top>
        <q-checkbox v-model="check2" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Sound</q-item-label>
        <q-item-label caption>
          Auto-update apps at anytime. Data charges may apply
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section side top>
        <q-checkbox v-model="check3" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Auto-add widgets</q-item-label>
        <q-item-label caption>
          Automatically add home screen widgets
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />
    <q-item-label header>Notifications</q-item-label>

    <q-item tag="label" v-ripple>
      <q-item-section>
        <q-item-label>Battery too low</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle color="blue" v-model="notif1" val="battery" />
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section>
        <q-item-label>Friend request</q-item-label>
        <q-item-label caption>Allow notification</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="green" v-model="notif2" val="friend" />
      </q-item-section>
    </q-item>

    <q-item tag="label" v-ripple>
      <q-item-section>
        <q-item-label>Picture uploaded</q-item-label>
        <q-item-label caption
          >Allow notification when uploading images</q-item-label
        >
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="red" v-model="notif3" val="picture" />
      </q-item-section>
    </q-item>

    <q-separator spaced />
    <q-item-label header>Other settings</q-item-label>

    <q-item>
      <q-item-section side>
        <q-icon color="teal" name="volume_down" />
      </q-item-section>
      <q-item-section>
        <q-slider v-model="volume" :min="0" :max="10" label color="teal" />
      </q-item-section>
      <q-item-section side>
        <q-icon color="teal" name="volume_up" />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-icon color="deep-orange" name="brightness_medium" />
      </q-item-section>
      <q-item-section>
        <q-slider
          v-model="brightness"
          :min="0"
          :max="10"
          label
          color="deep-orange"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-icon color="primary" name="mic" />
      </q-item-section>
      <q-item-section>
        <q-slider v-model="mic" :min="0" :max="50" label />
      </q-item-section>
    </q-item>
  </q-list>
  <q-inner-loading
    :showing="visible"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>
<script>
import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectMore',
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
      check1: ref(true),
      check2: ref(false),
      check3: ref(false),

      notif1: ref(true),
      notif2: ref(true),
      notif3: ref(false),

      volume: ref(6),
      brightness: ref(3),
      mic: ref(8),
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
