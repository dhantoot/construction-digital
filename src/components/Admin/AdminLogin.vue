<template>
  <!-- Admin Login -->
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
        <div class="text-h6">Admin Login</div>
        <div class="text-subtitle2 row justify-between">
          <div>Login required to use the portal</div>
        </div>
      </q-card-section>

      <q-card-section class="column gap-10">
        <q-input
          v-model="username"
          outline
          :dense="true"
          placeholder="Email / Username"
          :rules="usernameRules"
          color="positive"
          input-class="text-primary"
          filled
          class="full-width"
          @keydown.enter.prevent="login"
        >
          <template #prepend>
            <ShieldUser size="16" />
          </template>
        </q-input>

        <q-input
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

      <q-card-section class="">
        <div class="text-subtitle2 row justify-between items-center">
          <q-btn
            dense
            padding="xs lg"
            :label="$q.screen.lt.sm ? '' : 'Clear'"
            flat
            no-caps
            class="pull-right round-btn text-grey-9 text-caption ghost"
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
            @click="$router.push('/login')"
          >
            <template #default>
              <div class="row justify-between items-center gap-10">
                <Smartphone size="16" />
                Switch to Mobile
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
          :loading="loadingSubmit"
          :disable="loadingSubmit || !username || !password"
          :style="{
            width: '96%'
          }"
          @click="login"
        >
          <template #default>
            <div class="px-5 full-width row justify-between items-center">
              <ShieldUser size="20" />
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
<style lang="scss" scoped>
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
