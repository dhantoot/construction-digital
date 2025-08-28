<template>
  <div class="q-ma-xs q-gutter-xs bg-grey-2 q-mt-xl">
    <q-icon name="las la-envelope" size="xl" class="full-width"></q-icon>
    <p>
      Send your invitation to user dhan with the role Employee via email of with
      a link
    </p>
    <q-input v-model="email" filled label="Email" class="bg-grey-2" />
    <q-btn
      size="lg"
      style="background: goldenrod; color: white"
      label="Send E-mail"
      class="fixed-bottom q-mb-lg q-ml-xs q-mr-xs round-btn"
    />
  </div>
</template>
<script>
import { ref } from 'vue'
const stringOptions = ['Employee', 'Contractor', 'Admin', 'Client', 'Builders']

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  props: {
    title: String,
    likes: Number
  },
  setup() {
    const options = ref(stringOptions)
    const visible = ref(false)

    return {
      model: ref(null),
      fname: ref(null),
      lname: ref(null),
      text: ref(null),
      desc: ref(null),
      options,
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        })
      },
      visible,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
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
    // this.$emit('showHeader', true, [])
    this.showTextLoading()
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
    }
  }
}
</script>
