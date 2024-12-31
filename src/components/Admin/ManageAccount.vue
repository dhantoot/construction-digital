<template>
    <h5 class="text-center">Manage Accounts here</h5>
    <q-card class="q-ma-lg round-btn">
      <!-- <q-skeleton square/> -->
      <div class="row justify-center q-pa-lg q-gutter-sm">
        <q-input
            dense
            placeholder="Search place"
            v-model="searchKey"
            filled
        />
        <q-btn icon="las la-search" color="purple" @click="search" class="round-btn"/>
      </div>
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary"/>
      </q-inner-loading>
    </q-card>
  </template>
<script>
import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  setup () {
    const visible = ref(false)
    const question = ref('')

    return {
      searchKey: ref(''),
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
    }
  },
  components: {
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
    // this.$emit('showHeader', true, [])
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
    async search () {
      const type = 'address'
      const input = this.searchKey
      const resp = await this.$findPlace(type, input)
      console.log(resp)
      this.$q.notify({
        icon: 'check_circle',
        color: 'green',
        message: 'Jimm pinged you',
        position: 'top-right',
        classes: 'notify-custom-css'
      })
    }
  }
}
</script>
