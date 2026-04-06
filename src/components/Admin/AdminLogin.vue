<template>
  <!-- Admin Login -->
  <div
    class="row hide-scrollbar items-center justify-center"
    :style="`height: 100vh;`"
  >
    <q-card
      class="q-ma-sm glass-card px-20"
      :class="[
        $q.screen.gt.xs ? 'width-px-500' : 'width-px-400 bg-transparent'
      ]"
    >
      <q-card-section class="column items-center">
        <div class="text-h4 neon-text-blue text-weight-bold">Hofstee</div>
        <div class="text-h6 text-white mt-5">Admin Portal</div>
        <div class="text-subtitle2 text-grey-5">
          Login required to use the portal
        </div>
      </q-card-section>

      <q-card-section class="column gap-15 px-10">
        <q-input
          v-model="username"
          outlined
          placeholder="Email / Username"
          :rules="usernameRules"
          color="accent"
          dark
          input-class="text-white"
          @keydown.enter.prevent="login"
        >
          <template #prepend>
            <ShieldUser size="18" class="neon-text-blue" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          outlined
          placeholder="Password"
          :rules="passwordRules"
          color="accent"
          dark
          input-class="text-white"
          @keyup.enter="login"
        >
          <template #prepend>
            <LockIcon size="18" class="neon-text-blue" />
          </template>
          <template #append>
            <q-btn
              flat
              round
              dense
              :icon="isPwd ? 'visibility_off' : 'visibility'"
              class="text-grey-5"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <div class="row justify-between items-center">
          <q-btn
            flat
            no-caps
            label="Switch to Mobile"
            class="neon-text-violet text-weight-bold"
            @click="$router.push('/login')"
          />
          <q-btn
            flat
            no-caps
            label="Forgot Password?"
            class="text-grey-5 text-caption"
          />
        </div>
      </q-card-section>

      <q-card-actions class="mb-4" align="center">
        <q-btn
          padding="sm sm"
          color="primary"
          class="text-capitalize bg-info round-btn"
          :loading="loadingSubmit"
          :disable="loadingSubmit || !username || !password"
          :style="{
            width: '100%'
          }"
          @click="login"
        >
          <template #default>
            <div class="row items-center gap-10">
              <span class="text-h6 text-weight-bold">Sign In</span>
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
import { LocalStorage } from 'quasar'
import { useMainStore } from 'stores/main'

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
const auth = getAuth()

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'AdminLogin',
  props: {
    title: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  emits: ['emitFromChild'],
  setup() {
    const mainStore = useMainStore()
    const visible = ref(false)
    const question = ref('')

    return {
      visible,
      question,
      mainStore,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      username: ref('tagailo.danvincent@gmail.com'),
      password: ref('Admin@123'),
      usernameRules: [
        val => (val !== null && val !== '') || 'Please input username'
      ],
      passwordRules: [
        val => (val !== null && val !== '') || 'Please input password'
      ],
      loadingSubmit: ref(false),
      isPwd: ref(true)
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
    // this.$emit('showHeader', true, [])
    this.showTextLoading()
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
    login() {
      if (!this.username || !this.password) {
        return
      }
      this.loadingSubmit = true
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then(async userCredential => {
          const user = userCredential.user
          const userRef = this.$fbref(this.$fbdb, 'users/' + user.uid)
          const userInfoSnapshot = await this.$fbget(userRef)
          const adminUser = userInfoSnapshot?.val()
          const isAdmin = adminUser.role === 'admin'
          if (isAdmin) {
            LocalStorage.set('adminUser', adminUser)
            LocalStorage.set('authUser', adminUser)
            this.mainStore.adminUser = adminUser
            this.loadingSubmit = false
            this.$q.notify({
              icon: 'check_circle',
              color: 'green',
              message: 'Login Success',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
            this.$router.push('/admin-portal')
            this.username = ''
            this.password = ''
          } else {
            this.$q.notify({
              icon: 'cancel',
              color: 'negative',
              message: 'User is not allowed',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
            this.loadingSubmit = false
            this.$router.push('/admin-login')
            this.$emit('emitFromChild')
          }
        })
        .catch(error => {
          this.loadingSubmit = false
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
    handleEventMount(info) {
      info.el.style.backgroundColor = 'transparent'
      info.el.style.border = 'none'
      info.el.style.color = 'black'
    }
  }
}
</script>
