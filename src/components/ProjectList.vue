<template>
  <q-card class="my-card q-ma-sm">
    <q-list bordered>
      <q-item clickable v-ripple @click='$router.push({ path: `/projectdetail` })'>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Single line item</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">SMDC Light Residence</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Grand Hayatt</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Uptown Tower</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Sunshine</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-skeleton square /> -->
    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
  </q-card>
</template>
<script>
import { ref } from 'vue'

export default {
  title: 'ProjectList',
  setup () {
    const visible = ref(false)

    return {
      visible,
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
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
