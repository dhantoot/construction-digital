<template>
    <div class="row q-gutter-sm">
        <div class="col-6"><q-select filled input-debounce="0" v-model="model" :options="options" label="Select options" clearable emit-value/></div>
        <div class="col-5 text-right">
            <b><i class="las la-euro-sign"></i>27.00</b>
            <p>Total amount</p>
        </div>
    </div>
    <q-list bordered separator padding class="scroll" style="height:66vh">
      <q-item-label header>Open Agreements</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label><q-badge rounded color="orange" /> Agreement One</q-item-label>
          <q-item-label caption class="q-ml-md">Waiting for response from Dan</q-item-label>
        </q-item-section>
        <q-item-section side top>
            <b><i class="las la-euro-sign"></i>78.00</b>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label><q-badge rounded color="orange" /> Feb2024 agreement</q-item-label>
          <q-item-label caption class="q-ml-md">Waiting for response from Amton</q-item-label>
        </q-item-section>
        <q-item-section side top>
            <b><i class="las la-euro-sign"></i>45.00</b>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label><q-badge rounded color="orange" /> May2024 agreement</q-item-label>
          <q-item-label caption class="q-ml-md">Waiting for response from Zack</q-item-label>
        </q-item-section>

        <q-item-section side top>
            <b><i class="las la-euro-sign"></i>27.00</b>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
       <q-btn dense fab icon="las la-notes-medical" color="grey-1" class="text-green"/>
    </q-page-sticky>
</template>

<script>
import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectAgreement',
  setup () {
    const visible = ref(false)
    const question = ref('')

    return {
      visible,
      question,
      model: ref('All agreements'),
      options: [
        'All agreements', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
      },
      check1: ref(true),
      check2: ref(true),
      check3: ref(false),
      check4: ref(true),
      check5: ref(false),
      check6: ref(false),

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
