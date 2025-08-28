<template>
  <h5 class="text-center">
    Thank you for considering our invitation. We appreciate your response.
  </h5>
  <div class="row justify-center">
    <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12 q-pa-md">
      <q-card bordered class="shadow-15 round-btn">
        <q-card-section>
          <div class="text-overline text-orange-9">
            <q-icon name="las la-sad-cry" size="50px" color="negative" />
          </div>
          <div class="text-h5 q-mt-sm q-mb-xl">
            We regret you won't be joining us, but we wish you continued
            success.
          </div>
          <div class="text-h6 text-grey">
            Your decision is understood. Best regards.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  title: 'SuccessInvite',
  setup() {
    const visible = ref(false)

    return {
      projectDetail: ref(null),
      visible,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called->', visible.value)
      },
      text: ref('')
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  serverPrefetch() {
    // console.log('serverPrefetch')
  },
  beforeCreate() {
    // console.log('beforeCreate..', this.$options)
  },
  created() {
    // console.log('created..')
  },
  async beforeMount() {
    // console.log('beforeMount..')
    // update invitation status to Confirmed
    await this.rejectInvite()
  },
  async mounted() {
    // console.log('mounted..', this.$options)
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
  errorCaptured() {
    // console.log('errorCaptured')
  },
  renderTracked() {
    // console.log('renderTracked')
  },
  renderTriggered() {
    // console.log('renderTriggered')
  },
  activated() {
    // console.log('activates')
  },
  deactivated() {
    // console.log('deactivated')
  },
  methods: {
    async rejectInvite() {
      console.log('this.$route.query.h', this.$route.query.h)
      const emailHash = this.$route?.query?.h
      if (!emailHash) {
        return
      }
      const updates = {}
      // slash at the end is very important (../avatar/)
      updates[`invites/${emailHash}/status/`] = 'Rejected'
      updates[`invites/${emailHash}/dateResponded/`] = this.$serverTimestamp
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          console.log('Successfully rejected')
        })
        .catch(error => {
          console.log({ error })
        })
    }
  }
}
</script>
