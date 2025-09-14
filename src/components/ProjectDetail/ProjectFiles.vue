<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row full-width justify-between items-center">
      <strong
        class="text-bold text-h6"
        :class="{
          'text-accent': $q.dark.isActive,
          'text-primary': !$q.dark.isActive
        }"
      >
        Files
      </strong>
      <!-- <q-icon size="md" :color="$q.dark.isActive ? 'accent' : 'primary'" name="las la-undo" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
      <q-icon
        size="sm"
        :color="$q.dark.isActive ? 'accent' : 'primary'"
        @click="$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"
      >
        <Undo2Icon />
      </q-icon>
    </div>
    <div class="row">
      <!-- <q-input dark standout="bg-transparent" input-class="text-right text-accent" v-model="text" :dense="dense" :style="{
        width: '100%'
      }">
        <template v-slot:prepend>
          <q-icon color="accent" name="las la-arrow-left"
            @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)" />
        </template>
        <template v-slot:append>
          <q-icon v-if="text === ''" name="las la-search" class="text-accent" />
          <q-icon v-else name="clear" class="cursor-pointer text-black" @click="text = ''" />
        </template>
      </q-input> -->
      <q-input
        v-model="text"
        standout="bg-transparent"
        :input-class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
        :dense="dense"
        :style="{
          width: '100%'
        }"
      >
        <template #prepend>
          <!-- <q-icon color="accent" name="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/> -->
        </template>
        <template #append>
          <q-icon
            v-if="!text"
            :class="{
              'text-accent': text === '',
              'text-primary': text !== ''
            }"
          >
            <SearchIcon />
          </q-icon>
          <q-icon
            v-if="text"
            name="clear"
            class="cursor-pointer text-accent"
            @click="text = ''"
          />
        </template>
      </q-input>
    </div>
    <div>
      <div class="q-gutter-md row justify-between">
        <q-img
          v-for="item in arr"
          :key="item"
          :src="`${item.url}`"
          spinner-color="white"
          style="height: 100px; max-width: 100px"
          class="rounded-borders q-mb-xs"
        >
          <template #loading>
            <div class="text-accent">
              <q-spinner-ios />
            </div>
          </template>
        </q-img>
      </div>
      <!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn class="round-btn" color="primary" icon="las la-arrow-left"
          @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)" />
      </q-page-sticky> -->
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
  title: 'ProjectFiles',
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
      text: ref(''),
      ph: ref(''),
      dense: ref(true)
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
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    this.showTextLoading()
    this.getFiles()
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
  methods: {
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async getFiles() {
      const paths = ['projects', 'todo', '']
      Promise.all(
        paths.map(dir => {
          return this.$storageListAll(this.$getStorageRef(`files/${dir}`))
            .then(response => {
              const images = response.items
              images.forEach(image => {
                this.$getdownloadurl(image).then(url => {
                  // Use URL to display the image
                  this.arr.push({
                    url,
                    name: dir ? `${dir}` : 'root'
                  })
                })
              })
            })
            .catch(error => {
              console.error(error)
            })
        })
      )
    }
  }
}
</script>
