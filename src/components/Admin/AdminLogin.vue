<template>
  <!-- Admin Login -->
  <div class="row hide-scrollbar items-center justify-center" :style="`height: 100vh; background: #f2f4f7`">
    <q-card class="q-ma-sm shadow-12" :class="[$q.screen > xs ? 'max-width-px-400' : 'width-px-400']">
      <q-card-section class="">
        <div class="text-h6">Admin Login</div>
        <div class="text-subtitle2 row justify-between">
          <div>Login required to use the portal</div>
        </div>
      </q-card-section>
      <q-card-section class="column gap-10">
        <q-input :dense="true" filled v-model="username" placeholder="Username" @keydown.enter.prevent="login" style="font-size: 18px;" />
        <q-input :dense="true" filled v-model="password" placeholder="Password" @keydown.enter.prevent="login" type="password"
          style="font-size: 20px;" />
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2 row justify-center">
          <a class="clickable" @click="$router.push('/login')">Swith to mobile</a>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn icon="las la-undo" padding="sm xl" flat class="text-capitalize bg-negative round-btn" label="Clear"
          :disable="loadingSubmit" :style="{
            'width': '47%'
          }">
        </q-btn>
        <q-btn icon="las la-check" padding="sm xl" @click="login" color="primary" label="Sign in"
          class="text-capitalize bg-info round-btn" :loading="loadingSubmit"
          :disable="loadingSubmit || !username || !password" :style="{
            'width': '47%'
          }">
          <template v-slot:loading>
            <q-spinner-ios class="on-left" />
            <small>Logging in..</small>
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

import {
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
const auth = getAuth()

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'AdminLogin',
  emits: ['emitFromChild'],
  setup () {
    const mainStore = useMainStore()
    const visible = ref(false)
    const question = ref('')

    return {
      visible,
      question,
      mainStore,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      username: ref('tagailo.danvincent@gmail.com'),
      password: ref('Admin@123'),
      loadingSubmit: ref(false)
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
    login () {
      if (!this.username || !this.password) {
        return
      }
      this.loadingSubmit = true
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then(async (userCredential) => {
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
            this.username = ''
            this.password = ''
            this.$q.notify({
              icon: 'check_circle',
              color: 'green',
              message: 'Login Success',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
            this.$router.push('/admin-portal')
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
        .catch((error) => {
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
    handleEventMount (info) {
      info.el.style.backgroundColor = 'transparent'
      info.el.style.border = 'none'
      info.el.style.color = 'black'
    }
  }
}
</script>
