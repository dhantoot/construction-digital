<template>
  <div class="flex justify-between q-pa-xs bg-accent">
   <q-input
      dark
      standout="bg-transparent"
      input-class="text-right text-accent"
      v-model="text"
      :dense="dense"
      :class="{
        'q-ma-xs q-mx-sm': true
      }"
      :style="{
        width: '100%'
      }"
    >
      <template v-slot:prepend>
        <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
      </template>
      <template v-slot:append>
        <q-icon v-if="text === ''" name="las la-search" class="text-accent"/>
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer text-black"
          @click="text = ''"
       />
      </template>
    </q-input>
  </div>
  <div class="scroll" style="height: 75.5vh">
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
        <div class="absolute-bottom text-caption text-center">Caption</div>
      </q-img>
    </div>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    >
    <q-spinner-ios size="50px" color="secondary"/>
    </q-inner-loading>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        :dense="true"
        fab
        icon="las la-paperclip"
        color="grey-1"
        class="text-green round-btn"
     />
    </q-page-sticky>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'

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
    const mainStore = useMainStore()

    return {
      mainStore,
      visible,
      question,
      url,
      arr,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
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
    this.initFunction()
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
