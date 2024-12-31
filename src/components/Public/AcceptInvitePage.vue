<template>
  <h5 class="text-center">Thank you for accepting our invitation. We look forward to having you onboard.</h5>
  <div class="row justify-center">
    <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12 q-pa-md">
        <q-card bordered class="shadow-15 round-btn">
          <q-img
              :src="`${projectDetail?.avatarFullPath}`"
              :ratio="1/1"
              class="cover"
          />
          <q-card-section>
              <div class="text-overline text-orange-9">
                <!-- <q-icon name="las la-smile" size="50px" color="green"/> -->
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ projectDetail?.title }}</div>
              <div class="text-caption text-grey">{{ projectDetail?.description }}</div>
          </q-card-section>
          <q-card-actions align="right">
              <q-btn class="round-btn" color="primary" label="Sign in" @click="$router.push('/login')"/>
              <q-btn class="round-btn" color="primary" label="Create account" @click="$router.push('/login-register')"/>
          </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  title: 'SuccessInvite',
  setup () {
    const visible = ref(false)

    return {
      projectDetail: ref(null),
      visible,
      initFunction () {
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
  serverPrefetch () {
    // console.log('serverPrefetch')
  },
  beforeCreate () {
    // console.log('beforeCreate..', this.$options)
  },
  created () {
    // console.log('created..')
  },
  async beforeMount () {
    // console.log('beforeMount..')
    // update invitation status to Confirmed
    await this.acceptInvite()
  },
  async mounted () {
    // console.log('mounted..', this.$options)
    // this.$emit('showHeader', true, [])
    await this.fetchProjectDetail()
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
  errorCaptured () {
    // console.log('errorCaptured')
  },
  renderTracked () {
    // console.log('renderTracked')
  },
  renderTriggered () {
    // console.log('renderTriggered')
  },
  activated () {
    // console.log('activates')
  },
  deactivated () {
    // console.log('deactivated')
  },
  methods: {
    async fetchProjectDetail () {
      console.log('init..', this.$route.params.projectId)
      const project = this.$fbref(this.$fbdb, `projects/${this.$route.params.projectId}`)
      this.$fbonValue(project, (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        this.projectDetail = data
      })
    },
    async acceptInvite () {
      console.log('this.$route.query.h', this.$route.query.h)
      const emailHash = this.$route?.query?.h
      if (!emailHash) {
        return
      }
      const updates = {}
      // slash at the end is very important (../avatar/)
      updates[`invites/${emailHash}/status/`] = 'Confirmed'
      updates[`invites/${emailHash}/dateResponded/`] = this.$serverTimestamp
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          console.log('Successfully accepted')
        }).catch((error) => {
          console.log({ error })
        })
    }
  }
}
</script>
