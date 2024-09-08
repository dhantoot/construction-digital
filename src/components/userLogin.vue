<template>
    <div style="height:75.4vh">
      <div class="col text-center justify-center">
        <q-inner-loading :showing="visible"/>
        <div class="col-4 q-mt-lg q-mb-md">
          <img src="~assets/user.png" width="200px" class="q-pa-xs">
          <p class="text-h2 q-mb-xl">Login</p>
        </div>
        <div class="col-2 q-mt-xl q-mb-md">
          <hr class="text-white q-ml-xl q-mr-xl" />
        </div>
        <div class="col-6 q-mt-lg">
          <p class="q-mt-xl">Choose a role to login</p>
          <div class="q-gutter-sm">
            <q-radio v-model="role" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="contructor" label="Constructor" />
            <q-radio v-model="role" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="home owner" label="Home Owner" />
          </div>
        </div>
        <div class="col-2 q-mt-sm q-pa-xl">
          <!-- <q-input
            outline
            dense
            clearable
            ref="usernameRef"
            v-model="username"
            label="Username"
            lazy-rules
            :rules="usernameRules"
          >
            <template v-slot:prepend>
              <q-icon name="perm_identity"/>
            </template>
          </q-input> -->
          <q-input
            outline
            dense
            clearable
            ref="emailRef"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="emailRules"
            v-on:keyup.enter="login"
          >
              <template v-slot:prepend>
                <q-icon name="perm_identity"/>
              </template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            dense
            ref="passwordRef"
            outline
            v-model="password"
            label="Password"
            lazy-rules
            :rules="passwordRules"
            v-on:keyup.enter="login">
              <template v-slot:prepend>
                <q-icon name="lock"/>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
          </q-input>
          <q-btn @click="reset" label="Clear" type="reset" color="secondary" flat class="q-pl-none q-ml-sm text-capitalize pull-right text-weight-light" style="float:left"/>
          <q-btn @click="register" label="Register" color="primary" flat class="q-pr-none text-capitalize pull-right text-weight-light" style="float:right"/>
        </div>
        <div class="col-2 q-mt-xs q-pa-xl">
          <q-btn
            :disabled="$isFalsyString(email) || $isFalsyString(password)"
            :loading="loading"
            size="lg"
            color="primary"
            label="Login"
            class="text-capitalize full-width q-mb-md"
            @click="login">
            <template v-slot:loading>
              <q-spinner-facebook class="on-center"/>
            </template>
          </q-btn>
        </div>
      </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { LocalStorage, SessionStorage } from 'quasar'
import { getAuth, /* createUserWithEmailAndPassword, */ signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth()

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'LoginRegister',
  emits: ['showHeader'],
  setup () {
    const visible = ref(false)
    const loading = ref(false)
    const question = ref('')
    const username = ref(null)
    const usernameRef = ref(null)
    const email = ref('dt@yopmail.com')
    const emailRef = ref(null)
    const password = ref('12345678')
    const passwordRef = ref(null)

    return {
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
      emailRules: [
        val => (val && val.length > 0) || 'Please type your email'
      ],
      password,
      passwordRef,
      passwordRules: [
        val => (val !== null && val !== '') || 'Please input password'
      ],
      isPwd: ref(true),
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
      this.loading = true
      const [email, password] = [this.email, this.password]
      console.log({ email, password })
      if (this.$isFalsyString(email) || this.$isFalsyString(password)) {
        this.$q.notify({
          icon: 'cancel',
          color: 'warning',
          message: 'Please input username or password',
          position: 'bottom-left'
        })
        setTimeout(() => {
          this.loading = false
        }, 2000)
        return -1
      }
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const userRef = this.$fbref(this.$fbdb, 'user/' + user.uid)
          const userInfoSnapshot = await this.$fbget(userRef)
          const currentDbUser = userInfoSnapshot?.val()
          LocalStorage.set('currentUser', currentDbUser)
          LocalStorage.set('authUser', user)
          SessionStorage.set('currentUser', currentDbUser)
          SessionStorage.set('authUser', user)
          this.loading = false
          this.$router.push('/projects')
        })
        .catch(error => {
          console.log(error)
          this.loading = false
          this.$q.notify({
            icon: 'cancel',
            color: 'negative',
            message: error.message?.includes('email-already-in-use') ? 'User not registered: Email already in use' : 'User not registered!',
            position: 'top-right'
          })
        })
    },
    register () {
      console.log('Registration..')
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
