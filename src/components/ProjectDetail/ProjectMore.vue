<template>
  <div class="column gap-10 q-pa-sm scroll full-width">
    <div class="row" v-if="false">
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
    <div class="row justify-between items-center">
      <strong class="text-bold text-h6" :class="{
        'text-primary': !$q.dark.isActive,
        'text-accent': $q.dark.isActive
      }">User Controls</strong>
      <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
    </div>
    <div class="scroll full-width" style="max-height: 78.5vh;">
      <q-list padding class="text-accent full-width">
        <q-item clickable v-ripple class="">
          <q-item-section>
            <q-item-label :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }" class="text-bold">Content filtering</q-item-label>
            <q-item-label :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }" caption>
              Set the content filtering level to restrict apps that can be
              downloaded
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="">
          <q-item-section>
            <q-item-label class="text-bold" :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }">Password</q-item-label>
            <q-item-label :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }" caption>
              Require password for purchase or use password to restrict purchase
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item-label class="text-bold" :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }">General</q-item-label>
        <q-item tag="label" v-ripple class="">
          <q-item-section side top>
            <q-checkbox dense keep-color color="positive" v-model="check1" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Notifications</q-item-label>
            <q-item-label :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }" caption>
              Notify me about updates to apps or games that I downloaded
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section side top>
            <q-checkbox dense keep-color color="positive" v-model="check2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sound</q-item-label>
            <q-item-label :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }" caption>
              Auto-update apps at anytime. Data charges may apply
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section side top>
            <q-checkbox dense keep-color color="positive" v-model="check3" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto-add widgets</q-item-label>
            <q-item-label class="text-white" caption>
              Automatically add home screen widgets
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />

        <q-item-label class="text-white text-bold">Notifications</q-item-label>
        <q-item tag="label" v-ripple class="full-width px-20">
          <q-item-section>
            <q-item-label>Battery too low</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row px-10">
              <q-toggle dense color="blue" v-model="notif1" val="battery" />
            </div>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple class="">
          <q-item-section>
            <q-item-label>Friend request</q-item-label>
            <q-item-label caption :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }">Allow notification</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row px-10">
              <q-toggle dense color="green" v-model="notif2" val="friend" />
            </div>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple class="">
          <q-item-section>
            <q-item-label>Picture uploaded</q-item-label>
            <q-item-label caption :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }">Allow notification when uploading images</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <div class="row px-10">
              <q-toggle dense color="red" v-model="notif3" val="picture" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item-label class="text-bold" :class="{
              'text-primary': !$q.dark.isActive,
              'text-accent': $q.dark.isActive
            }">Other settings</q-item-label>
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
            <q-slider v-model="brightness" :min="0" :max="10" label color="deep-orange" />
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
      <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectMore',
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
<style lang="scss" scoped>
.q-item {
    min-height: 48px;
    padding: 8px 0px!important;
    color: inherit;
    transition: color 0.3s, background-color 0.3s;
}
</style>
