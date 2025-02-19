<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row justify-start">
      <strong class="text-h6 text-bold text-white">Add Member</strong>
    </div>
    <div class="column gap-10">
      <q-input
        :dense="true"
        filled
        v-model="fname"
        placeholder="First Name"
      />
      <q-input
        :dense="true"
        filled
        v-model="lname"
        placeholder="Last Name"
      />
      <q-select
        v-model="role"
        :dense="true"
        filled
        label="Role"
        :options="options"
        @filter="filterFn"
        input-debounce="0"
        clearable
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
      />
      <q-input
        v-model="desc"
        :dense="true"
        filled
        placeholder="Project Description"
        autogrow
      />
    </div>
  </div>
  <!-- <div class="q-mx-xs q-gutter-md bg-grey-2 q-pr-md" style="margin-top:70px">
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
      v-model="role"
      :dense="true"
      filled
      label="Role"
      :options="options"
      @filter="filterFn"
      input-debounce="0"
      clearable
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
  </div> -->

  <div class="row full-width q-px-lg q-py-sm justify-between items-start absolute fixed-bottom" style="margin-bottom:82px">
    <div>
      <q-btn class="round-btn" color="primary" icon="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}`)"/>
    </div>
    <div>
      <q-btn
        @click="addMember"
        color="primary"
        label="Add Member"
        class="text-capitalize text-accent round-btn"
        :loading="loadingSubmit"
        icon="las la-plus"
      >
        <template v-slot:loading>
          <q-spinner-ios class="on-left"/>
          Saving...
        </template>
      </q-btn>
    </div>
  </div>

</template>
<script>
import { ref } from 'vue'
const stringOptions = ['Employee', 'Contractor', 'Admin', 'Client', 'Builders']
import { useMainStore } from 'stores/main'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  setup () {
    const options = ref(stringOptions)
    const visible = ref(false)
    const mainStore = useMainStore()

    return {
      loadingSubmit: ref(false),
      mainStore,
      role: ref(null),
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
    },
    addMember () {
      console.log('Adding member')
    }
  }
}
</script>
