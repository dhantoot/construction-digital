<template>
  <q-card flat bordered class="q-mt-sm q-ml-xs q-mr-xs bg-transparent">
    <q-card-actions class="bg-primary text-warning">
      <label class="text-bold">Submitted Expenses</label>
      <q-space/>
      <q-btn
        color="warning"
        round
        flat
        :dense="true"
        :icon="subExp ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="subExp = !subExp"
        class="round-btn"
     />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="subExp">
        <q-separator/>
        <q-card-section class="text-accent">
          <q-list>
            <q-item class="bg-transparent">
              <q-item-section>
                <q-item-label class="text-bold"
                  >Dan Vincent Tagailo</q-item-label
                >
                <q-item-label caption lines="2" class="text-positive"
                  >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold text-cancel">$500.00</q-item-label>
                <q-item-label caption2 class="text-positive">Inc. BTW</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="positive" name="las la-arrow-right"/>
              </q-item-section>
            </q-item>

            <q-separator spaced/>

            <q-item class="bg-transparent">
              <q-item-section>
                <q-item-label class="text-bold">John Doe</q-item-label>
                <q-item-label caption lines="2" class="text-positive"
                  >Secondary line text. Lorem ipsum dolor sit amet,
                  cons</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold text-cancel">$1000.00</q-item-label>
                <!-- <q-icon name="star" color="yellow"/> -->
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="positive" name="las la-arrow-right"/>
              </q-item-section>
            </q-item>

            <q-separator spaced/>

            <q-item class="bg-transparent">
              <q-item-section>
                <q-item-label class="text-bold">Chloe Morrets</q-item-label>
                <q-item-label caption lines="2" class="text-positive"
                  >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold text-cancel">$2300.00</q-item-label>
                <q-item-label caption2 class="text-positive">Inc. BTW</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="positive" name="las la-arrow-right"/>
              </q-item-section>
            </q-item>

            <q-page-scroller
              position="bottom-right"
              :scroll-offset="150"
              :offset="[18, 18]"
            >
              <q-btn fab icon="keyboard_arrow_up" color="accent"/>
            </q-page-scroller>
          </q-list>
        </q-card-section>
      </div>
    </q-slide-transition>
    <q-inner-loading :showing="visible">
      <q-spinner-ios size="50px" color="secondary"/>
    </q-inner-loading>
  </q-card>

  <q-card bordered flat class="q-mt-sm q-ml-xs q-mr-xs bg-transparent">
    <q-card-actions class="bg-primary text-warning">
      <label class="text-bold">Open Agreements</label>
      <q-space/>
      <q-btn
        color="warning"
        round
        flat
        :dense="true"
        :icon="openAgreement ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="openAgreement = !openAgreement"
     />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="openAgreement">
        <q-separator/>
        <q-card-section class="text-accent">
          <q-list>
            <q-item class="bg-transparent">
              <q-item-section>
                <q-item-label class="text-bold"
                  >Dan Vincent Tagailo</q-item-label
                >
                <!-- <q-item-label caption lines="2" class="text-positive">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label> -->
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold text-cancel">$500.00</q-item-label>
                <!-- <q-item-label caption2 class="">Inc. BTW</q-item-label> -->
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="positive" name="las la-arrow-right"/>
              </q-item-section>
            </q-item>

            <q-separator spaced/>

            <q-item class="bg-transparent">
              <q-item-section>
                <q-item-label class="text-bold">John Doe</q-item-label>
                <!-- <q-item-label caption lines="2" class="text-positive">Secondary line text. Lorem ipsum dolor sit amet, cons</q-item-label> -->
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold text-cancel">$1000.00</q-item-label>
                <!-- <q-icon name="star" color="yellow"/> -->
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="positive" name="las la-arrow-right"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </div>
    </q-slide-transition>
    <q-inner-loading :showing="visible2">
      <q-spinner-ios size="50px" color="secondary"/>
    </q-inner-loading>
  </q-card>
</template>
<script>
import { ref } from 'vue'

export default {
  title: 'Dashboard',
  setup () {
    const visible = ref(false)
    const visible2 = ref(false)

    return {
      visible,
      visible2,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      subExp: ref(true),
      openAgreement: ref(true),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
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
    // this.$emit('showHeader', true, [])
    this.showTextLoading()
    this.showTextLoading2()
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
    },
    showTextLoading2 () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 200)
      // console.log('loaded in ', ms, ' ms')
      this.visible2 = true
      setTimeout(() => {
        this.visible2 = false
      }, ms)
    }
  }
}
</script>
