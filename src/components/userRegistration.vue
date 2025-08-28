<template>
  <div class="row full-width justify-center absolute">
    <div class="col text-center" style="max-width: 600px">
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
      <div class="col-4 q-mt-xs q-mb-md q-pt-md">
        <q-icon
          name="las la-user-circle"
          size="100px"
          class="q-pa-xs"
          color="primary"
        />
        <p class="text-h2 q-mb-xl text-primary">Register</p>
      </div>
      <div class="col-2 q-mt-md q-mb-sm">
        <q-separator class="q-ml-xl q-mr-xl" color="primary" inset />
      </div>
      <div class="col-6">
        <p
          class="q-mt-xs"
          :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
        >
          Choose role to register
        </p>
        <div class="row justify-center">
          <div class="column justify-center items-start q-px-md">
            <q-radio
              v-model="role"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="constructor"
              label="Constructor"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
              color="primary"
              keep-color
            />
            <q-radio
              v-model="role"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="client"
              label="Home Owner"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
              color="primary"
              keep-color
            />
          </div>
          <div class="column justify-center items-start q-px-md">
            <q-radio
              v-model="role"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="agent"
              label="Agent"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
              color="primary"
              keep-color
            />
            <q-radio
              v-model="role"
              :disable="true"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="admin"
              label="Admin"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
              color="primary"
              keep-color
            />
          </div>
        </div>
      </div>
      <div class="col-2 q-pa-xl q-gutter-y-sm">
        <q-input
          ref="regemailRef"
          v-model="regemail"
          :dense="true"
          filled
          class="col-12"
          outline
          placeholder="Email"
          :rules="regemailRules"
          :input-class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
        >
          <template #prepend>
            <MailIcon size="16" />
          </template>
        </q-input>
        <q-input
          ref="regpasswordRef"
          v-model="regpassword"
          :autocomplete="false"
          :type="isPwd1 ? 'password' : 'text'"
          :dense="true"
          filled
          outline
          placeholder="Password"
          :rules="regpasswordRules"
          :input-class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
        >
          <template #prepend>
            <LockIcon size="16" />
          </template>
          <template #append>
            <EyeIcon v-if="!isPwd1" size="16" @click="isPwd1 = !isPwd1" />
            <EyeClosed v-if="isPwd1" size="16" @click="isPwd1 = !isPwd1" />
          </template>
        </q-input>
        <q-input
          ref="regverifiedpassRef"
          v-model="regverifiedpass"
          autocomplete="off"
          :type="isPwd2 ? 'password' : 'text'"
          :dense="true"
          filled
          outline
          placeholder="Confirm Password"
          :rules="regverifiedpassRules"
          :input-class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
          @keyup.enter="register"
        >
          <template #prepend>
            <LockKeyholeIcon size="16" />
          </template>
          <template #append>
            <EyeIcon v-if="!isPwd2" size="16" @click="isPwd2 = !isPwd2" />
            <EyeClosed v-if="isPwd2" size="16" @click="isPwd2 = !isPwd2" />
          </template>
        </q-input>
        <q-btn
          label="Clear"
          type="reset"
          :color="[$q.dark.isActive ? 'accent' : 'grey']"
          flat
          class="text-capitalize pull-right text-weight-light round-btn"
          style="float: left"
          @click="reset"
        />
        <q-btn
          label="Back to login"
          :color="[$q.dark.isActive ? 'accent' : 'grey']"
          flat
          no-caps
          class="pull-right text-weight-light round-btn"
          style="float: right"
          @click="$router.push('/login')"
        />
      </div>
      <div class="col-2 q-py-xs q-px-xl q-mt-xs">
        <q-btn
          size="lg"
          :color="[$q.dark.isActive ? 'accent' : 'primary']"
          label="Register"
          class="text-capitalize full-width round-btn"
          :loading="registerLoader"
          :disable="registerLoader"
          @click="register"
        >
          <template #loading>
            <q-spinner-ios class="on-left" />
            <small>Creating account..</small>
          </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useMainStore } from 'stores/main'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'UserRegistration',
  props: {
    title: String,
    likes: Number
  },
  emits: ['showHeader'],
  setup() {
    const visible = ref(false)
    const question = ref('')

    const regemail = ref(null)
    const regemailRef = ref(null)

    const regpassword = ref(null)
    const regpasswordRef = ref(null)

    const regverifiedpass = ref(null)
    const regverifiedpassRef = ref(null)

    const mainStore = useMainStore()

    return {
      mainStore,
      visible,
      question,
      role: ref('constructor'),
      regemail,
      regemailRef,
      regemailRules: [
        val => (val && val.length > 0) || 'Please type your email'
      ],
      regemailRefRules: [
        val => (val !== null && val !== '') || 'Please input username'
      ],
      passwordRules: [
        val => (val !== null && val !== '') || 'Please input password'
      ],
      regpassword,
      regpasswordRef,
      regpasswordRules: [
        val => (val && val.length > 0) || 'Please type your password',
        val =>
          /^(?=.*[a-z])/.test(val) ||
          'Password should have atleast a lowercase',
        val =>
          /^(?=.*[A-Z])/.test(val) ||
          'Password should have atleast an uppercase',
        val =>
          /^(?=.*[0-9])/.test(val) || 'Password should have atleast a number',
        val =>
          /^(?=.*[!@#$%^&*])/.test(val) ||
          'Password should have atleast a special character',
        val =>
          /^(?=.{6,})/.test(val) || 'Password should have atleast 6 characters'
      ],
      regverifiedpass,
      regverifiedpassRef,
      regverifiedpassRules: [
        val => (val && val.length > 0) || 'Please type your verified pass',
        val => val === regpassword.value || 'Password not match'
      ],
      isPwd1: ref(true),
      isPwd2: ref(true),
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      registerLoader: ref(false)
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
    this.mainStore.showNav = false
    console.log(this.$route.query)
    const { e, clientId, agentId, pid } = this.$route.query
    this.regemail = e
    if (pid) {
      if (clientId) {
        this.role = 'client'
      } else if (agentId) {
        this.role = 'agent'
      } else {
        this.role = 'constructor'
      }
    } else {
      this.role = 'constructor'
    }
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
    register() {
      // console.log('Logging in..')
      this.registerLoader = true
      const auth = getAuth()
      createUserWithEmailAndPassword(
        auth,
        this.regemail,
        this.regpassword
      ).then(userCredential => {
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
            this.$router.push('/login')
          })
          .catch(error => {
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
    reset() {
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
<style lang="scss" scoped>
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
