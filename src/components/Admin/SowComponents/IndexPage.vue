<template>
  <div
    class="row hide-scrollbar full-height"
    :style="{
      height: $q.screen.lt.sm ? 'auto' : ''
    }"
  >
    <div class="row full-width full-height q-pa-sm">
      <router-view />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import ellipsis from 'src/directives/ellipsis'
import formatdate from 'src/directives/formatdate'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'SowTemplateDefaultPage',
  components: {},
  directives: { ellipsis, formatdate },
  props: {
    title: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const visible = ref(false)

    return {
      visible
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  beforeCreate() {
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
  },
  async beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    // this.$emit('showHeader', true, [])
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
  },
  updated() {
    // console.log('updated')
  },
  beforeUnmount() {
    // console.log('beforeUnmount')
  },
  unmounted() {
    // console.log('unmounted')
  },
  methods: {}
}
</script>
