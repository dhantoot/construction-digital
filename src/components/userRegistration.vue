<template>
  <div class="row full-width justify-center absolute">
    <div class="col text-center" style="max-width: 600px;">
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary"/>
      </q-inner-loading>
      <div class="col-4 q-mt-xl q-mb-md q-pt-xl">
        <q-icon name="las la-user-circle" size="100px" class="q-pa-xs" color="primary"/>
        <p class="text-h2 q-mb-xl">Register</p>
      </div>
      <div class="col-2 q-mt-md q-mb-sm">
        <q-separator class="q-ml-xl q-mr-xl" color="positive" inset/>
      </div>
      <div class="col-6">
        <p class="q-mt-xs text-positive">Choose a role to register</p>
        <div class="q-gutter-sm">
          <q-radio
            v-model="role"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="constructor"
            label="Constructor"
            class="text-positive"
            color="positive"
            keep-color
         />
          <q-radio
            v-model="role"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="home owner"
            label="Home Owner"
            class="text-positive"
            color="positive"
            keep-color
         />
        </div>
      </div>
      <div class="col-2 q-pa-xl q-gutter-y-sm">
        <q-input
          :dense="true"
          filled
          clearable
          class="col-12"
          ref="regemailRef"
          outline
          v-model="regemail"
          placeholder="Email"
          :rules="regemailRules"
          input-class="text-positive"
          color="positive"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="positive"/>
          </template>
        </q-input>
        <q-input
          :autocomplete="false"
          :type="isPwd1 ? 'password' : 'text'"
          :dense="true"
          clearable
          filled
          ref="regpasswordRef"
          outline
          v-model="regpassword"
          placeholder="Password"
          :rules="regpasswordRules"
          input-class="text-positive"
          color="positive"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="positive"/>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd1 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd1 = !isPwd1"
              color="positive"
           />
          </template>
        </q-input>
        <q-input
          autocomplete="off"
          :type="isPwd2 ? 'password' : 'text'"
          :dense="true"
          filled
          ref="regverifiedpassRef"
          outline
          v-model="regverifiedpass"
          placeholder="Confirm Password"
          :rules="regverifiedpassRules"
          v-on:keyup.enter="register"
          input-class="text-positive"
          color="positive"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="positive"/>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
              color="positive"
           />
          </template>
        </q-input>
        <q-btn
          @click="reset"
          label="Clear"
          type="reset"
          color="positive"
          flat
          class="text-capitalize pull-right text-weight-light round-btn"
          style="float: left"
       />
        <q-btn
          @click="$router.push('/login')"
          label="Back to Login"
          color="positive"
          flat
          class="text-capitalize pull-right text-weight-light round-btn"
          style="float: right"
       />
      </div>
      <div class="col-2 q-py-xs q-px-xl q-mt-xs">
        <q-btn
          size="lg"
          color="primary"
          label="Register"
          class="text-capitalize full-width round-btn"
          @click="register"
       />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'UserRegistration',
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
        // console.log('initFunction called', visible.value)
      },
      registerLoader: ref(false)
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
    // this.showTextLoading()
    // this.$emit('showHeader', false, [])
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
    register () {
      // console.log('Logging in..')
      this.registerLoader = true
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.regemail, this.regpassword)
        .then(userCredential => {
          console.log('Auth Successfull')
          const user = userCredential.user
          console.log(user)
          const formFields = {
            firstName: '',
            lastName: '',
            email: this.regemail,
            phone_number: '',
            role: this.role,
            position: '',
            isActive: true,
            avatar: '',
            uid: user.uid,
            _ts: this.$serverTimestamp
          }
          const updates = {}
          updates[`users/${user.uid}`] = formFields
          this.$fbupdate(this.$fbref(this.$fbdb), updates)
            .then(() => {
              console.log('Successfully inserted to DB')
              this.$q.notify({
                icon: 'done',
                color: 'green',
                message: 'Successfully created',
                position: 'top-right',
                classes: 'notify-custom-css'
              })
              this.registerLoader = false
            })
            .catch((error) => {
              console.log({ error })
              this.$q.notify({
                icon: 'cancel',
                color: 'negative',
                message: error,
                position: 'top-right',
                classes: 'notify-custom-css'
              })
              this.registerLoader = false
            })
        })
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
