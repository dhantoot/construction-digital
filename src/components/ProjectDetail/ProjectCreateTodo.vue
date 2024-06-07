<template>
    <q-list bordered padding class="scroll" style="height:74.7vh">
      <q-item clickable="false">
        <q-item-section>
          <q-item-label>Title</q-item-label>
          <q-item-label caption>
            <q-input dark dense standout bg-color="grey-4" v-model="todoTitle" class="q-ma-xs">
            </q-input>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable="false">
        <q-item-section>
          <q-item-label>Description</q-item-label>
          <q-item-label caption>
            <q-input dark dense standout bg-color="grey-4" text-color="black" v-model="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-avatar color="grey-5" text-color="white" icon="las la-user" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Assign Members</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="las la-arrow-right" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-avatar color="grey-5" text-color="white" icon="las la-file-upload" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Add File</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="las la-arrow-right" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item tag="label">

        <q-item-section>
          <q-btn color="primary" label="Create Todo" class="text-capitalize full-width q-mb-md"/>
        </q-item-section>

      </q-item>
    </q-list>
</template>
<script>

import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectCreateTodo',
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
      todoTitle: ref(''),
      todoDesc: ref(''),
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
