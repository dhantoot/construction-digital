<template>
  <q-layout
    view="lHh lpR lFf"
    class="full-height"
    :style="{
        'background': $q.dark.isActive ? 'black' : '#f2f4f7'
    }">

    <q-header
      v-if="$route.name !== 'Admin Login'"
      :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
      height-hint="98"
      :style="{
        'border-bottom': $q.dark.isActive ? '.1px solid #3a3a3a' : '.1px solid rgb(198 198 198 / 50%)',
        'background': $q.dark.isActive ? 'black' : '#f2f4f7',
      }">
      <q-toolbar>
        <q-toolbar-title>
          {{ routeName }}
        </q-toolbar-title>

        <div class="row gap-10">
          <q-toggle
            dense
            v-model="isDark"
            checked-icon="las la-moon"
            color="accent"
            unchecked-icon="las la-sun"
            label=""
            @update:model-value="toggleMode"
          />
          <q-btn v-if="mainStore?.adminUser && authUser && $route.name !== 'Admin Login'" size="12px" flat round color="accent" icon="las la-bell" />
          <div v-if="mainStore?.adminUser && authUser && $route.name !== 'Admin Login'" class="clickable">
            <HofsteeAvatar :src="obj?.avatar?.length > 0 ? `${obj.avatar}` : `default-user.jpeg`" size="32px"/>
            <q-menu
              style="border-radius: 10px;"
              :class="[$q.dark.isActive ? 'no-shadow bg-dark text-accent' : 'bg-primary text-accent']"
              :offset="[5, 15]">
              <template v-slot:activator="{ on }">
                <q-btn flat dense icon="more_vert" v-on="on" />
              </template>
              <q-list class="text-accent bg-idk" style="min-width: 200px;">
                <q-item>
                  <q-item-section>Dark Mode</q-item-section>
                  <q-item-section side>
                    <q-toggle
                      dense
                      v-model="isDark"
                      checked-icon="las la-moon"
                      color="text-accent"
                      unchecked-icon="las la-sun"
                      label=""
                      @update:model-value="toggleMode"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>My Profile</q-item-section>
                  <q-item-section side>
                    <q-icon name="las la-user" class="text-accent"/>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="openConfirmDialog('Confirm Logout', 'logout')">
                  <q-item-section>Logout</q-item-section>
                  <q-item-section side>
                    <q-icon name="las la-sign-out-alt" class="text-accent"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="routeName !== 'Admin Login'"
      v-model="drawer"
      show-if-above
      class="hide-scrollbar"
      :mini="drawer"
      :style="{
        'border-right': $q.dark.isActive ? '.1px solid #3a3a3a' : '.1px solid rgb(198 198 198 / 50%)',
        'background': $q.dark.isActive ? 'black' : '#f2f4f7'
      }"
      @click.capture="drawerClick">
      <template v-slot:mini>
        <div class="column justify-between full-height full-width">
          <div>
            <div class="row items-center justify-center pt-4">
              <div class="py-5">
                <q-btn to="/admin-portal" flat icon="las la-play" class="q-px-sm text-red"
                  style="border-radius: 8px;" />
              </div>
              <div class="py-5 mt-10">
                <q-btn to="/manage-sow" flat icon="las la-tools" class="q-px-sm" style="border-radius: 8px;"
                :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
              </div>
              <div class="py-5">
                <q-btn to="/manage-projects" flat icon="las la-folder-open" class="q-px-sm"
                  style="border-radius: 8px;" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
              </div>
              <div class="py-5">
                <q-btn to="/manage-invites" flat icon="lab la-telegram-plane" class="q-px-sm"
                  style="border-radius: 8px;" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
              </div>
              <div class="py-5 full-width q-px-md">
                <q-separator style="border-bottom: .1px solid #3a3a3a;" />
              </div>
              <div class="py-5">
                <q-btn to="/manage-accounts" flat icon="las la-user-tag" class="q-px-sm"
                  style="border-radius: 8px;" :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
              </div>
              <div class="py-5">
                <q-btn to="/whats-new" flat icon="las la-bell" class="q-px-sm" style="border-radius: 8px;"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
              </div>
              <div class="py-5">
                <q-btn flat icon="las la-comments" class="q-px-sm" style="border-radius: 8px;"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
              </div>
            </div>
          </div>
          <div>
            <div class="row items-center justify-center">
              <div class="py-5">
              <q-btn flat icon="las la-headset" class="q-px-sm" style="border-radius: 8px;"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
            </div>
            <div class="py-5">
              <q-btn flat icon="las la-cog" class="q-px-sm" style="border-radius: 8px;"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
            </div>
            <div class="py-5">
              <q-btn flat icon="las la-user-circle" class="q-px-sm" style="border-radius: 8px;"
              :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
            </div>
            <div class="py-5 full-width q-px-md">
              <q-separator style="border-bottom: .1px solid #3a3a3a;" />
            </div>
            <div class="py-10">
              <q-btn @click="openConfirmDialog('Confirm Logout', 'logout')" square icon="las la-sign-out-alt"
                class="q-px-sm" style="border-radius: 8px;"
                :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"/>
            </div>
            </div>
          </div>
        </div>
      </template>

      <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn dense round unelevated color="accent" icon="chevron_left" @click="miniState = true" />
      </div>
    </q-drawer>

    <q-page-container
    class="hide-scrollbar"
    :style="{
      'background: black': $q.dark.isActive,
      'background: #f2f4f7': !$q.dark.isActive,
      'height: auto': $q.screen.lt.md,
      'height: 94.5vh': !$q.screen.lt.md
    }">

      <router-view @emitFromChild="emitFromChild"/>

      <q-footer v-if="$route.name !== 'Admin Login' && !$q.screen.gt.xs" dense bordered :class="{
        'bg-dark': $q.dark.isActive,
        'bg-white text-black': !$q.dark.isActive
      }">
          <q-tabs
            v-model="tab"
            class="shadow-2"
            no-caps
            switch-indicator
            indicator-color="primary"
          >
            <q-tab
              @click="$router.push('/admin-portal')"
              alert=""
              name="Home"
              square icon="las la-play"
            >
              <q-badge color="negative" floating>7</q-badge>
            </q-tab>

            <q-tab
              @click="$router.push('/manage-sow')"
              name="SOW"
              square icon="las la-tools"
            ></q-tab>

            <q-tab
              @click="$router.push('/manage-projects')"
              name="Projects"
              square icon="las la-folder-open"
            >
              <q-badge color="negative" floating>2</q-badge>
            </q-tab>

            <q-tab
              @click="$router.push('/manage-invites')"
              name="Invites"
              square icon="lab la-telegram-plane"
            >
            </q-tab>

            <q-tab
              @click="$router.push('/manage-accounts')"
              name="User"
              square icon="las la-user-tag"
            >
            </q-tab>

          </q-tabs>
      </q-footer>

    </q-page-container>
  </q-layout>

  <q-dialog v-model="confirm" persistent>
    <q-card :class="{
      'no-shadow': $q.dark.isActive
    }">
      <q-card-section class="row items-center">
        <q-avatar size="sm" icon="las la-exclamation" color="negative" text-color="white" />
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative"
          v-close-popup />
        <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="info"
          @click="callConfirmFn()" :loading="actionAccountLoader" :disable="actionAccountLoader">
          <template v-slot:loading>
            <q-spinner-ios class="on-left" />
            <small>Logging out..</small>
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage } from 'quasar'
import HofsteeAvatar from 'src/components/Common/Badge/HofsteeAvatar.vue'

export default {
  components: {
    HofsteeAvatar
  },
  setup () {
    const miniState = ref(false)
    const isDark = ref(false)
    const mainStore = useMainStore()

    return {
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      actionAccountLoader: ref(false),
      authUser: ref(null),
      drawer: ref(false),
      mainStore,
      miniState,
      isDark,
      drawerClick (e) {
        // // if in "mini" state and user
        // // click on drawer, we switch it to "normal" mode
        // if (miniState.value) {
        //   miniState.value = false

        //   // notice we have registered an event with capture flag;
        //   // we need to stop further propagation as this click is
        //   // intended for switching drawer to "normal" mode only
        //   e.stopPropagation()
        // }
      },
      obj: ref({})
    }
  },
  methods: {
    emitFromChild () {
      this.fetchUserProfile()
    },
    async fetchUserProfile () {
      console.log('fetchUserProfile..')
      this.authUser = LocalStorage.getItem('authUser')
      if (!this.authUser) {
        return
      }
      const users = this.$fbref(this.$fbdb, `users/${this.authUser.uid}`)
      this.$fbonValue(users, (snapshot) => {
        const data = snapshot.val()
        this.obj = data
      })
    },
    toggleMode (val) {
      this.$q.dark.isActive = val
    },
    openConfirmDialog (confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn () {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    logout () {
      this.actionAccountLoader = true
      setTimeout(() => {
        LocalStorage.removeItem('adminUser')
        LocalStorage.removeItem('authUser')
        LocalStorage.removeItem('currentUser')
        LocalStorage.removeItem('mobileSelectedProject')
        LocalStorage.removeItem('mobileSelectedProjectTodo')
        LocalStorage.removeItem('showNav')

        this.mainStore.adminUser = null
        this.actionAccountLoader = false
        this.confirm = false
        this.$router.push('/admin-login')
      }, 2000)
    }
  },
  mounted () {
    // this.mainStore.adminUser = null
    // this.mainStore.authUser = null
    this.$q.dark.isActive = false
    this.authUser = LocalStorage.getItem('authUser')
    // this.fetchUserProfile()
  },
  computed: {
    routeName: function () {
      return this.$route.name
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
