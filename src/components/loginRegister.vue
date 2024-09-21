<template>
  <div style="height: 67.4vh">
    <div class="col text-center justify-center">
      <q-inner-loading :showing="visible" />
      <div class="col-4 q-mt-lg q-mb-md">
        <img src="~assets/user.png" width="200px" class="q-pa-xs" />
        <p class="text-h2 q-mb-xl">Register</p>
      </div>
      <div class="col-2 q-mt-md q-mb-sm">
        <hr class="text-white q-ml-xl q-mr-xl" />
      </div>
      <div class="col-6">
        <p class="q-mt-xs">Choose a role to register</p>
        <div class="q-gutter-sm">
          <q-radio
            v-model="role"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="contructor"
            label="Constructor"
          />
          <q-radio
            v-model="role"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="home owner"
            label="Home Owner"
          />
        </div>
      </div>
      <div class="col-2 q-pa-xl">
        <q-input
          dense
          clearable
          class="col-12"
          ref="regemailRef"
          outline
          v-model="regemail"
          label="Email"
          lazy-rules
          :rules="regemailRules"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          :autocomplete="false"
          :type="isPwd1 ? 'password' : 'text'"
          dense
          ref="regpasswordRef"
          outline
          v-model="regpassword"
          label="Password"
          lazy-rules
          :rules="regpasswordRules"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd1 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd1 = !isPwd1"
            />
          </template>
        </q-input>
        <q-input
          autocomplete="off"
          :type="isPwd2 ? 'password' : 'text'"
          dense
          ref="regverifiedpassRef"
          outline
          v-model="regverifiedpass"
          label="Confirm Password"
          lazy-rules
          :rules="regverifiedpassRules"
          v-on:keyup.enter="login"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>
        <q-btn
          @click="reset"
          label="Clear"
          type="reset"
          color="secondary"
          flat
          class="q-pl-none q-ml-sm text-capitalize pull-right text-weight-light"
          style="float: left"
        />
        <q-btn
          @click="$router.push('/login')"
          label="Back to Login"
          color="primary"
          flat
          class="q-pr-none text-capitalize pull-right text-weight-light"
          style="float: right"
        />
      </div>
      <div class="col-2 q-pa-xl">
        <q-btn
          size="lg"
          color="primary"
          label="Register"
          class="text-capitalize full-width q-mb-md"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'LoginRegister',
  emits: ['showHeader'],
  setup () {
    const visible = ref(false)
    const question = ref('')

    const regemail = ref(null)
    const regemailRef = ref(null)

    const regpassword = ref(null)
    const regpasswordRef = ref(null)

    const regverifiedpass = ref(null)
    const regverifiedpassRef = ref(null)

    return {
      visible,
      question,
      role: ref('line'),
      regemail,
      regemailRef,
      regemailRules: [
        (val) => (val && val.length > 0) || 'Please type your email'
      ],
      regemailRefRules: [
        (val) => (val !== null && val !== '') || 'Please input username'
      ],
      passwordRules: [
        (val) => (val !== null && val !== '') || 'Please input password'
      ],
      regpassword,
      regpasswordRef,
      regpasswordRules: [
        (val) => (val && val.length > 0) || 'Please type your password',
        (val) =>
          /^(?=.*[a-z])/.test(val) ||
          'Password should have atleast a lowercase',
        (val) =>
          /^(?=.*[A-Z])/.test(val) ||
          'Password should have atleast an uppercase',
        (val) =>
          /^(?=.*[0-9])/.test(val) || 'Password should have atleast a number',
        (val) =>
          /^(?=.*[!@#$%^&*])/.test(val) ||
          'Password should have atleast a special character',
        (val) =>
          /^(?=.{6,})/.test(val) || 'Password should have atleast 6 characters'
      ],
      regverifiedpass,
      regverifiedpassRef,
      regverifiedpassRules: [
        (val) => (val && val.length > 0) || 'Please type your verified pass',
        (val) => val === regpassword.value || 'Password not match'
      ],
      isPwd1: ref(true),
      isPwd2: ref(true),
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
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
    console.log('emitting true to main layout..')
    this.$emit('showHeader', false, [])
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
        this.$emit('showHeader', false, [])
        console.log('Emit should be done!')
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
    },
    login () {
      console.log('Logging in..')
    },
    reset () {
      this.regemail = null
      this.regpassword = null
      this.regverifiedpass = null

      this.regemailRef.resetValidation()
      this.regpasswordRef.resetValidation()
      this.regverifiedpassRef.resetValidation()
    }
  }
}
</script>
