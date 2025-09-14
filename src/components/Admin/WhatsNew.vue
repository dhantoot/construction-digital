<template>
  <div
    class="row hide-scrollbar"
    :style="{ height: $q.screen.lt.sm ? 'auto' : '94.5vh;' }"
  >
    <div class="row full-width full-height q-pa-sm">
      <q-card class="full-width round-panel no-shadow">
        <q-card-section>
          <HofsteeAlert>
            <template #icon>
              <q-icon name="las la-info-circle" color="primary" size="xs" />
            </template>
            <template #header>
              <b>Comming soon...</b>
            </template>
            <template #body>
              The roadmap includes all features related to payment/payroll.
            </template>
            <!-- <template #bottom>
              <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative" />
              <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="primary" >
                <template v-slot:loading>
                  <q-spinner-ios class="on-left"/>
                  <small>Please wait..</small>
                </template>
              </q-btn>
            </template> -->
          </HofsteeAlert>
        </q-card-section>
        <q-inner-loading :showing="visible">
          <q-spinner-ios size="50px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import HofsteeAlert from '../Common/Alert/HofsteeAlert.vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  components: {
    HofsteeAlert
  },
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
    const $q = useQuasar()

    return {
      visible,
      question,
      q: $q,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
        this.q.screen.setSizes({ xxs: 400 })

        console.log('this.q.screen', this.q.screen)
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
<style lang="scss">
.card {
  min-height: 807px;
}
</style>
