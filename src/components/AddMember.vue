<template>
  <div class="q-ma-xs q-gutter-md bg-grey-2 q-mt-xl q-pr-md">
    <q-input
      :dense="true"
      filled
      v-model="fname"
      placeholder="First Name"
      input-class="text-warning"
   />
    <q-input
      :dense="true"
      filled
      v-model="lname"
      placeholder="Last Name"
      class="bg-grey-2"
      input-class="text-warning"
    />
    <q-select
      v-model="model"
      :dense="true"
      filled
      :placeholder="!model ? 'Address' : ''"
      :options="options"
      @filter="filterFn"
      input-debounce="0"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-input
      :dense="true"
      filled
      v-model="text"
      placeholder="Project Name"
      class="bg-grey-2"
      input-class="text-warning"
    />
    <q-input
      v-model="desc"
      :dense="true"
      filled
      placeholder="Project Description"
      autogrow
      class="bg-grey-2"
      input-class="text-warning"
   />
   <div class="row justify-between q-mt-lg">
    <div>
      <q-btn rounded color="primary" icon="las la-arrow-left" @click="this.$router.push('/detail')"/>
    </div>
    <div>
      <q-btn
        @click="confirm"
        rounded
        color="primary"
        label="Add Member"
        class="text-capitalize text-accent"
        :loading="loadingSubmit"
        icon="las la-plus"
      >
        <template v-slot:loading>
          <q-spinner-bars class="on-left"/>
          Saving...
        </template>
      </q-btn>
    </div>
   </div>
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
  setup () {
    const options = ref(stringOptions)
    const visible = ref(false)

    return {
      model: ref(null),
      fname: ref(null),
      lname: ref(null),
      text: ref(null),
      desc: ref(null),
      options,
      filterFn (val, update) {
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
            (v) => v.toLowerCase().indexOf(needle) > -1
          )
        })
      },
      visible,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
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
    // this.$emit('showHeader', false, [
    //   {
    //     label: 'Back',
    //     icon: 'las la-chevron-left',
    //     route: '/detail'
    //   }
    // ])
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
