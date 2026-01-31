<template>
  <!-- User Login -->
  <div
    class="row hide-scrollbar items-center justify-center"
    :style="`height: 100vh;`"
  >
    <q-card
      flat
      class="q-ma-sm no-shadow"
      :class="[
        $q.screen.gt.xs ? 'width-px-500' : 'width-px-400 bg-transparent'
      ]"
    >
      <q-card-section class="">
        <div class="text-h6">User Login</div>
        <div class="text-subtitle2 row justify-between">
          <div>Login required to use the portal</div>
        </div>
      </q-card-section>

      <q-card-section class="column gap-10">
        <q-input
          ref="emailRef"
          v-model="email"
          outline
          :dense="true"
          placeholder="Email / Username"
          :rules="usernameRules"
          color="positive"
          input-class="text-primary"
          filled
          class="full-width"
          @keyup.enter.prevent="login"
        >
          <template #prepend>
            <User size="16" />
          </template>
        </q-input>

        <q-input
          ref="passwordRef"
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :dense="true"
          outline
          placeholder="Password"
          :rules="passwordRules"
          color="positive"
          input-class="text-primary"
          filled
          class="full-width"
          @keyup.enter="login"
        >
          <template #prepend>
            <LockIcon size="16" />
          </template>
          <template #append>
            <EyeIcon v-if="!isPwd" size="16" @click="isPwd = !isPwd" />
            <EyeClosed v-if="isPwd" size="16" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 row justify-between items-center">
          <q-btn
            dense
            padding="xs lg"
            :label="$q.screen.lt.sm ? '' : 'Clear'"
            flat
            no-caps
            class="pull-right round-btn text-grey-9 text-caption ghost"
            @click="reset"
          >
            <template v-if="$q.screen.lt.sm" #default>
              <div class="row justify-between items-center gap-10">
                <X size="16" />
              </div>
            </template>
          </q-btn>

          <q-btn
            dense
            padding="xs lg"
            flat
            no-caps
            class="pull-right round-btn text-grey-9 text-caption ghost"
            @click="goToAdminView"
          >
            <template #default>
              <div class="row justify-between items-center gap-10">
                <LaptopMinimal size="16" />
                Switch to Admin
              </div>
            </template>
          </q-btn>

          <q-btn
            dense
            padding="xs lg"
            :label="$q.screen.lt.sm ? '' : 'Register'"
            flat
            no-caps
            class="pull-right round-btn text-grey-9 text-caption ghost"
            @click="register"
          >
            <template v-if="$q.screen.lt.sm" #default>
              <div class="row justify-between items-center gap-10">
                <PencilLine size="16" />
              </div>
            </template>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-actions class="mb-4" align="center">
        <q-btn
          padding="sm sm"
          color="primary"
          class="text-capitalize bg-info round-btn"
          :loading="loading"
          :disable="
            $isFalsyString(email) || $isFalsyString(password) || loading
          "
          :style="{
            width: '96%'
          }"
          @click="login"
        >
          <template #default>
            <div class="px-5 full-width row justify-between items-center">
              <User size="20" />
              <span class="text-capitalize text-h6">Sign In</span>
              <LogIn size="20" />
            </div>
          </template>
          <template #loading>
            <q-spinner-ios class="on-left" />
            Logging in..
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
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
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    likes: {
      type: Number,
      required: false,
      default: 0
    }
  },
  emits: ['showHeader'],
  setup() {
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
        val => (val !== null && val !== '') || 'Please input username'
      ],
      email,
      emailRef,
      emailRules: [val => (val && val.length > 0) || 'Please type your email'],
      password,
      passwordRef,
      passwordRules: [
        val => (val !== null && val !== '') || 'Please input password'
      ],
      isPwd: ref(true),
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
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
    // this.showTextLoading()
    // this.$emit('showHeader', false, [])
    this.mainStore.showNav = false
    this.clearLocalStorage()
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
    goToAdminView() {
      localStorage.removeItem('adminUser')
      localStorage.removeItem('authUser')
      localStorage.removeItem('mobileSelectedProjectTodo')
      localStorage.setItem('showNav', false)
      Object.keys(localStorage)
        .filter(k => k.startsWith('firebase:'))
        .forEach(k => localStorage.removeItem(k))
      this.$router.push('/admin-login')
    },
    clearLocalStorage() {
      LocalStorage.set('adminUser', null)
      LocalStorage.set('authUser', null)
      LocalStorage.set('mobileSelectedProjectTodo', null)
    },
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async login() {
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
        .then(async userCredential => {
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
          this.$router.push('/dashboard')
        })
        .catch(error => {
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
    register() {
      // console.log('Registration..')
      this.$router.push('/login-register')
    },
    reset() {
      this.email = null
      this.password = null

      this.emailRef.resetValidation()
      this.passwordRef.resetValidation()
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
