<template>
     <q-input standout="bg-grey-1 text-dark" v-model="text" :dense="dense" class="q-ma-xs">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="las la-search"/>
          </q-avatar>
        </template>
      </q-input>
      <div class="scroll" style="height:75.5vh">
        <div class="q-gutter-sm row justify-evenly">
          <q-img
            v-for="item in arr"
            :key="item"
            :src="`${url}${item}`"
            spinner-color="white"
            style="height: 100px; max-width: 111px"
            img-class="my-custom-image"
            class="rounded-borders q-mb-xs"
          >
            <div class="absolute-bottom text-caption text-center">
              Caption
            </div>
          </q-img>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn dense fab icon="las la-paperclip" color="grey-1" class="text-green"/>
        </q-page-sticky>
      </div>
</template>
<script>

import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectFiles',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const url = ref('https://picsum.photos/500/300')
    const arr = ref([])

    return {
      visible,
      question,
      url,
      arr,
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
        url.value = 'https://picsum.photos/500/300?t='
        for (let i = 0; i < 100; i++) {
          arr.value.push(Math.random())
        }
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
    this.initFunction()
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
