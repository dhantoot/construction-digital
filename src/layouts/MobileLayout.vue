<template>
  <q-layout
    view="lHh lpR lFf"
    class="no-scroll"
    :style="{
      background: $q.dark.isActive ? 'black' : ''
    }"
  >
    <q-page-container
      class="page-container"
      :style="{
        'background: black': $q.dark.isActive,
        'background: #f2f4f7': !$q.dark.isActive,
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
          :style="{
            background: $q.dark.isActive ? 'black' : ''
          }"
          :class="[
            $q.dark.isActive ? 'text-accent bg-black' : 'text-primary bg-light'
          ]"
          class="full-width"
        >
          <!-- Replaces q-toolbar: uses flex classes for alignment -->
          <div class="row justify-between full-width items-center px-5">
            <q-btn title="x" flat round dense icon="menu" />

            <div class="column items-center justify-center">
              <strong class="caption text-h6">{{ 'Hofstee' }}</strong>
            </div>

            <div class="" style="min-width: 20px">
              <div
                v-if="mainStore.showNav || routeName === 'mobile.my-profile'"
                class=""
              >
                <q-avatar>
                  <HofsteeAvatar
                    :src="
                      obj?.avatar?.length > 0
                        ? `${obj.avatar}`
                        : `default-user.jpeg`
                    "
                    size="35px"
                  />
                </q-avatar>
                <q-menu
                  style="border-radius: 10px"
                  :class="[
                    $q.dark.isActive
                      ? 'bg-contrast text-accent no-shadow'
                      : 'bg-light text-primary'
                  ]"
                  :offset="[13, 16]"
                >
                  <template #activator="{ on }">
                    <q-btn flat dense icon="more_vert" v-on="on" />
                  </template>
                  <q-list style="min-width: 200px">
                    <q-item>
                      <q-item-section>Dark Mode</q-item-section>
                      <q-item-section side>
                        <q-toggle
                          v-if="mainStore.showNav || routeName === 'MyProfile'"
                          v-model="isDark"
                          dense
                          checked-icon="las la-moon"
                          color="grey"
                          unchecked-icon="las la-sun"
                          label=""
                          @update:model-value="toggleMode"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple clickable :to="`/profile/${authUser.uid}`">
                      <q-item-section>My Profile</q-item-section>
                      <q-item-section side>
                        <UserIcon size="20" />
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple clickable @click="signOut">
                      <q-item-section>Logout</q-item-section>
                      <q-item-section side>
                        <Log-outIcon size="18" />
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
        class="modern-bottom-nav shadow-4"
        active-color="white"
        glossy
        :class="{
          'bg-light': !$q.dark.isActive,
          'bg-primary text-accent': $q.dark.isActive
        }"
      >
        <q-btn
          aria-label="Go to Dashboard"
          round
          flat
          :class="{ 'text-purple': activeTab === 'dashboard' }"
          @click="activatePage('dashboard')"
        >
          <div class="column justify-start items-center">
            <HomeIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          aria-label="Go to Projects"
          round
          flat
          :class="{ 'text-purple': activeTab === 'projects' }"
          @click="activatePage('projects')"
        >
          <div class="column justify-start items-center">
            <ListIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          aria-label="Go to Search"
          round
          flat
          :class="{ 'text-purple': activeTab === 'search' }"
          @click="activatePage('search')"
        >
          <div class="column justify-start items-center">
            <!-- <SearchIcon size="24" />-->
            <HexagonIcon size="30" />
          </div>
        </q-btn>
        <q-btn
          aria-label="Go to Plans"
          round
          flat
          :class="{ 'text-purple': activeTab === 'plans' }"
          @click="activatePage('plans')"
        >
          <div class="column justify-start items-center">
            <CalendarIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          aria-label="Go to Profile"
          round
          flat
          :class="{ 'text-purple': activeTab === 'profile' }"
          @click="activatePage('profile')"
        >
          <div class="column justify-start items-center">
            <UserIcon size="24" />
          </div>
        </q-btn>
      </div>

      <!-- Center Label -->
      <!-- <div v-if="tab === 'analytics'" class="center-label text-white">
        Analytics
      </div> -->
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
