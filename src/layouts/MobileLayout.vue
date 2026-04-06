<template>
  <q-layout
    view="lHh lpR lFf"
    class="no-scroll"
    style="background: transparent"
  >
    <q-page-container
      class="page-container"
      :style="{
        'background: transparent': true,
        'height: 100vh': $q.screen.gt.sm
      }"
    >
      <div
        class="row full-width items-center"
        :class="$isCapacitorMode ? 'mt-45' : ''"
      >
        <div
          v-if="
            !['mobile.userlogin', 'mobile.login-register'].includes($route.name)
          "
          class="full-width glass-panel no-border-radius-top"
          style="border-radius: 0 0 20px 20px; border-top: none"
        >
          <!-- Replaces q-toolbar: uses flex classes for alignment -->
          <div class="row justify-between full-width items-center px-5 py-3">
            <q-btn
              title="x"
              flat
              round
              dense
              icon="menu"
              class="neon-text-blue"
            />

            <div class="column items-center justify-center">
              <strong class="caption text-h6 neon-text-blue">{{
                'Hofstee'
              }}</strong>
            </div>

            <div class="" style="min-width: 32px">
              <div
                v-if="mainStore.showNav || routeName === 'mobile.my-profile'"
                class="row items-center no-wrap relative-position"
              >
                <HofsteeAvatar
                  :src="
                    obj?.avatar?.length > 0
                      ? `${obj.avatar}`
                      : `default-user.jpeg`
                  "
                  size="38px"
                />
                <q-menu
                  class="glass-panel"
                  :offset="[0, 10]"
                  anchor="bottom end"
                  self="top end"
                  transition-show="fade"
                  transition-hide="fade"
                >
                  <template #activator="{ on }">
                    <q-btn
                      flat
                      dense
                      icon="more_vert"
                      class="neon-text-blue"
                      v-on="on"
                    />
                  </template>
                  <q-list style="min-width: 200px" class="text-white">
                    <q-item>
                      <q-item-section>Dark Mode</q-item-section>
                      <q-item-section side>
                        <q-toggle
                          v-if="mainStore.showNav || routeName === 'MyProfile'"
                          v-model="isDark"
                          dense
                          color="accent"
                          @update:model-value="toggleMode"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple clickable :to="`/profile/${authUser.uid}`">
                      <q-item-section>My Profile</q-item-section>
                      <q-item-section side>
                        <UserIcon size="20" color="white" />
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple clickable @click="signOut">
                      <q-item-section class="text-negative"
                        >Logout</q-item-section
                      >
                      <q-item-section side>
                        <Log-outIcon size="18" color="red" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-view @emit-from-child="emitFromChild" />
    </q-page-container>

    <div
      v-if="
        !routeName.includes('project.details') &&
        routeName !== 'mobile.userlogin' &&
        routeName !== 'mobile.my-profile' &&
        routeName !== 'mobile.login-register'
      "
      class="bottom-nav-container"
    >
      <div
        class="modern-bottom-nav glass-panel"
        style="height: 65px; border-radius: 32px; padding: 0 10px"
      >
        <!-- Dashboard -->
        <q-btn
          aria-label="Go to Dashboard"
          round
          flat
          :class="{
            'neon-text-blue': activeTab === 'dashboard',
            'text-grey-5': activeTab !== 'dashboard'
          }"
          @click="activatePage('dashboard')"
        >
          <div class="column justify-start items-center">
            <HomeIcon size="24" />
          </div>
        </q-btn>

        <!-- Projects -->
        <q-btn
          aria-label="Go to Projects"
          round
          flat
          :class="{
            'neon-text-violet': activeTab === 'projects',
            'text-grey-5': activeTab !== 'projects'
          }"
          @click="activatePage('projects')"
        >
          <div class="column justify-start items-center">
            <FolderKanbanIcon size="24" />
          </div>
        </q-btn>

        <!-- Search -->
        <q-btn
          aria-label="Go to Search"
          round
          flat
          :class="{
            'neon-text-blue': activeTab === 'search',
            'text-grey-5': activeTab !== 'search'
          }"
          @click="activatePage('search')"
        >
          <div class="column justify-start items-center">
            <HexagonIcon size="32" />
          </div>
        </q-btn>

        <!-- Plans -->
        <q-btn
          aria-label="Go to Plans"
          round
          flat
          :class="{
            'neon-text-pink': activeTab === 'plans',
            'text-grey-5': activeTab !== 'plans'
          }"
          @click="activatePage('plans')"
        >
          <div class="column justify-start items-center">
            <CalendarIcon size="24" />
          </div>
        </q-btn>

        <!-- Settings -->
        <q-btn
          aria-label="Go to Settings"
          round
          flat
          :class="{
            'neon-text-blue': activeTab === 'more',
            'text-grey-5': activeTab !== 'more'
          }"
          @click="activatePage('more')"
        >
          <div class="column justify-start items-center">
            <Cog size="24" />
          </div>
        </q-btn>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { nextTick, ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage } from 'quasar'
import { useThemeStore } from 'stores/theme'
import { StatusBar, Style } from '@capacitor/status-bar'
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar'
import { Capacitor } from '@capacitor/core'
import HofsteeAvatar from 'src/components/Common/Badge/HofsteeAvatar.vue'

export default {
  components: {
    HofsteeAvatar
  },
  setup() {
    const themeStore = useThemeStore()
    const leftDrawerOpen = ref(false)
    const deviceIsReady = ref(false)
    const mainStore = useMainStore()
    const authUser = ref(null)
    const isDark = ref(false)
    const activeTab = ref('dashboard')

    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: '#f0f0f0' })
      StatusBar.setStyle({ style: Style.Light })
    }

    return {
      selectedTab: ref(null),
      activeTab,
      isDark,
      themeStore,
      authUser,
      mainStore,
      deviceIsReady,
      headerState: ref(true),
      breadcrumbs: [],
      leftDrawerOpen,
      link: ref(''),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      lorem: 'Lorem ipsum dolor',
      obj: ref({})
    }
  },
  computed: {
    routeName: function () {
      return this.$route.name
    },
    avatar: function () {
      return this.obj?.avatar || null
    }
  },
  async mounted() {
    // if (Capacitor.isNativePlatform()) {
    //   StatusBar.setBackgroundColor({color: '#f0f0f0'})
    //   StatusBar.setStyle({style: Style.Light})
    // }

    this.authUser = LocalStorage.getItem('authUser')
    console.log('MainLayout monunter')
    this.themeStore.setCurrentTheme(17) // 1,17, 20(light), 22(light)
    await nextTick()
    await this.fetchUserProfile()
  },
  methods: {
    activatePage(page) {
      if (page == 'profile') {
        this.$router.push(`/profile/${this.authUser.uid}`)
        this.activeTab = 'profile'

        return
      }

      if (page == 'search') {
        return
      }

      this.$router.push({ path: `/${page}` })
      this.activeTab = page
    },
    async emitFromChild() {
      console.log('emitFromChild..')
      await nextTick()
      await this.fetchUserProfile()
    },
    async fetchUserProfile() {
      this.authUser = LocalStorage.getItem('authUser')
      const users = this.$fbref(this.$fbdb, `users/${this.authUser.uid}`)
      this.$fbonValue(users, snapshot => {
        const data = snapshot.val()
        this.obj = data
      })
    },
    toggleMode(val) {
      this.$q.dark.isActive = val
      if (val) {
        // this.$q.addressbarColor.set('#000000')
        StatusBar.setBackgroundColor({ color: '#000000' })
        StatusBar.setStyle({ style: Style.Dark })
        NavigationBar.setColor({
          color: '#00000000',
          darkButtons: false
        })
      } else {
        // this.$q.addressbarColor.set('#f0f0f0')
        StatusBar.setBackgroundColor({ color: '#f0f0f0' })
        StatusBar.setStyle({ style: Style.Light })
        NavigationBar.setTransparency({
          isTransparent: true
        })
      }
    },
    showHeader(arg, breadcrumbs) {
      console.log('--receiving emits from login page', arg)
      this.headerState = arg
      this.breadcrumbs = breadcrumbs
    },
    signOut() {
      console.log('logging out..')
      this.link = 'signout'
      LocalStorage.removeItem('authUser')
      LocalStorage.removeItem('currentUser')
      LocalStorage.removeItem('mobileSelectedProject')
      LocalStorage.removeItem('showNav')
      this.mainStore.mobileSelectedProject = null
      this.mainStore.showNav = false
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.bgcover {
  background-image: url('/bg-1.jpeg'); /** bg-17 bg-23 */
  // background-size: cover; /* Cover the entire div with the image */
  // background-repeat: no-repeat; /* Prevent the image from repeating */
  // background-color: #dfe1de;
}
</style>
