<template>
  <div class="row full-width justify-center absolute">
    <div class="col text-center" style="max-width: 600px;">
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary"/>
      </q-inner-loading>
      <div class="col-4 q-mt-xl q-mb-md q-pt-xl">
        <q-icon name="las la-user-circle" size="100px" class="q-pa-xs" color="primary"/>
        <p class="text-h2 q-mb-xl text-primary">Login</p>
      </div>
      <div class="col-2 q-mt-xl q-mb-md">
        <!-- <hr class="q-ml-xl q-mr-xl" color="black"/> -->
        <q-separator class="q-ml-xl q-mr-xl" color="primary" inset/>
      </div>
      <div class="col-6 q-mt-lg" v-if="false">
        <p class="q-mt-xl" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']">Choose a role to login</p>
        <div class="q-gutter-sm">
          <q-radio
            v-model="role"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            val="contructor"
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
      <div class="col-2 q-mt-sm q-pa-xl q-gutter-y-md">
        <q-input
          outline
          :dense="true"
          clearable
          ref="emailRef"
          v-model="email"
          placeholder="Email"
          :rules="emailRules"
          v-on:keyup.enter="login"
          color="positive"
          input-class="text-primary"
          filled
          style="font-size: 15px;"
        >
          <template v-slot:prepend>
            <q-icon name="perm_identity" color="secondary"/>
          </template>
        </q-input>
        <q-input
          :type="isPwd ? 'password' : 'text'"
          :dense="true"
          clearable
          ref="passwordRef"
          outline
          v-model="password"
          placeholder="Password"
          :rules="passwordRules"
          v-on:keyup.enter="login"
          color="positive"
          input-class="text-primary"
          filled
          style="font-size: 20px;"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="secondary"/>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
              color="secondary"
          />
          </template>
        </q-input>
        <q-btn
          @click="reset"
          label="Clear"
          type="reset"
          color="secondary"
          flat
          class="text-capitalize pull-right text-weight-light round-btn"
          style="float: left"
      />
        <q-btn
          @click="register"
          label="Register"
          color="secondary"
          flat
          class="text-capitalize pull-right text-weight-light round-btn"
          style="float: right"
      />
      </div>
      <div class="col-2 q-mt-sm q-px-xl">
        <q-btn
          :disable="$isFalsyString(email) || $isFalsyString(password) || loading"
          :loading="loading"
          size="lg"
          color="primary"
          label="Login"
          class="text-capitalize full-width round-btn"
          @click="login"
        >
          <template v-slot:loading>
            <q-spinner-ios class="on-left"/>
            <small>Logging in..</small>
          </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { LocalStorage, SessionStorage } from 'quasar'
import { useMainStore } from 'stores/main'
import {
  // signInWithRedirect,
  // getRedirectResult,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
const auth = getAuth()

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'UserLogin',
  emits: ['showHeader'],
  setup () {
    const visible = ref(false)
    const loading = ref(false)
    const question = ref('')
    const username = ref(null)
    const usernameRef = ref(null)
    const email = ref('tagailo.danvincent@gmail.com')
    const emailRef = ref(null)
    const password = ref('Admin@123')
    const passwordRef = ref(null)
    const mainStore = useMainStore()

    return {
      mainStore,
      visible,
      loading,
      question,
      role: ref('line'),
      username,
      usernameRef,
      usernameRules: [
        (val) => (val !== null && val !== '') || 'Please input username'
      ],
      email,
      emailRef,
      emailRules: [
        (val) => (val && val.length > 0) || 'Please type your email'
      ],
      password,
      passwordRef,
      passwordRules: [
        (val) => (val !== null && val !== '') || 'Please input password'
      ],
      isPwd: ref(true),
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
    // this.showTextLoading()
    // this.$emit('showHeader', false, [])
    this.mainStore.showNav = false
    this.clearLocalStorage()
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
    clearLocalStorage () {
      LocalStorage.set('adminUser', null)
      LocalStorage.set('authUser', null)
      LocalStorage.set('mobileSelectedProjectTodo', null)
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async login () {
      // console.log('Logging in..')
      this.loading = true
      const [email, password] = [this.email, this.password]
      // console.log({ email, password })
      if (this.$isFalsyString(email) || this.$isFalsyString(password)) {
        this.$q.notify({
          icon: 'negative',
          color: 'warning',
          message: 'Please input username or password',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
        setTimeout(() => {
          this.loading = false
        }, 2000)
        return
      }
      // try {
      //   const resp = await signInWithRedirect(this.$fbauth, this.$provider)
      //   console.log({ resp })
      // } catch (error) {
      //   console.error('Error signing in:', error)
      // }

      // getRedirectResult(this.$fbauth).then((result) => {
      //   if (result) {
      //     console.log('Signed in user:', result.user)
      //   } else {
      //     console.log('No user signed in')
      //   }
      // }).catch((error) => {
      //   console.error('Error handling redirect result:', error)
      // })

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const userRef = this.$fbref(this.$fbdb, 'users/' + user.uid)
          const userInfoSnapshot = await this.$fbget(userRef)
          const currentDbUser = userInfoSnapshot?.val()
          LocalStorage.set('currentUser', currentDbUser)
          LocalStorage.set('authUser', user)
          LocalStorage.set('showNav', true)
          SessionStorage.set('currentUser', currentDbUser)
          SessionStorage.set('authUser', user)
          this.mainStore.showNav = true
          this.loading = false
          this.$router.push('/projects')
        })
        .catch((error) => {
          // console.log(error)
          this.loading = false
          this.$q.notify({
            icon: 'cancel',
            color: 'negative',
            message: error.message?.includes('email-already-in-use')
              ? 'User not registered: Email already in use'
              : 'User not registered!',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    },
    register () {
      // console.log('Registration..')
      this.$router.push('/login-register')
    },
    reset () {
      this.email = null
      this.password = null

      this.emailRef.resetValidation()
      this.passwordRef.resetValidation()
    }
  }
}
</script>
