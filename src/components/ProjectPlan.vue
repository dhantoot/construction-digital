<template>
  <div class="q-ma-none scroll" style="height: 66vh">
    <div class="q-pa-xs">
      <q-date
        v-model="date"
        :events="events"
        :event-color="(date) => (date[9] % 2 === 0 ? 'teal' : 'orange')"
        class="full-width no-border-radius bg-accent"
        text-color="warning"
        flat
      />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        dense
        fab
        icon="las la-calendar-plus"
        color="primary"
        class="text-warning"
      />
    </q-page-sticky>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  title: 'ProjectPlan',
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
      date: ref('2019/02/01'),
      events: [
        '2019/02/01',
        '2019/02/05',
        '2019/02/06',
        '2019/02/09',
        '2019/02/23'
      ],
      eventsFn (date) {
        if (
          date === '2019/02/01' ||
          date === '2019/02/05' ||
          date === '2019/02/06' ||
          date === '2019/02/09' ||
          date === '2019/02/23'
        ) {
          return true
        }
        return false
      }
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
    this.$emit('showHeader', true, [])
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
