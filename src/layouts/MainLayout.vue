<template>
  <q-layout view="lHh lpR fFf" :class="{
    'bg-light': !$q.dark.isActive,
    'bg-black': $q.dark.isActive
  }">
    <q-header elevated class="text-warning" :class="{
      'bg-primary': !$q.dark.isActive,
      'bg-black': $q.dark.isActive
    }" height-hint="61.59">
      <q-toolbar class="text-accent q-py-sm q-px-md">
        <div class="row full-width items-center">
          <q-btn @click="leftDrawerOpen = !leftDrawerOpen" flat round :dense="true" icon="menu" class="q-mr-sm round-btn"/>
          <q-toolbar-title class="text-center">Hofstee Inc.</q-toolbar-title>
          <q-btn v-if="!mainStore.showNav" flat round :dense="true" icon="las la-exchange-alt" class="round-btn" to="/admin-portal"/>
          <q-toggle v-if="mainStore.showNav" dense v-model="isDark" checked-icon="las la-moon" color="grey" unchecked-icon="las la-sun" label=""
          @update:model-value="toggleMode" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" class="q-mt-xl q-pt-lg">
      <q-list :bordered="!$q.dark.isActive" separator padding class="text-caption" :class="{
        'text-accent': $q.dark.isActive,
        'text-primary': $q.dark.isActive
      }">
      <q-item
        clickable
        v-ripple
        :active="link === 'back'"
        @click="leftDrawerOpen=false"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-arrow-left"/>
        </q-item-section>

        <q-item-section></q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :active="link === 'profile'"
        @click="link = 'profile'; mainStore.showNav = false; $router.push(`/profile/${authUser.uid}`);"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-user"/>
        </q-item-section>

        <q-item-section>My profile</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'company'"
        @click="link = 'company'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-building"/>
        </q-item-section>

        <q-item-section>Company Info</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'emailsettings'"
        @click="link = 'emailsettings'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-envelope"/>
        </q-item-section>

        <q-item-section>Email Settings</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'trash'"
        @click="link = 'trash'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-trash"/>
        </q-item-section>

        <q-item-section>Archive Projects</q-item-section>
      </q-item>

      <q-separator spaced class="q-pa-xs"/>

      <q-item
        clickable
        v-ripple
        :active="link === 'terms'"
        @click="link = 'terms'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-file-alt"/>
        </q-item-section>

        <q-item-section>Terms and Condition</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'privacy'"
        @click="link = 'privacy'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-shield-alt"/>
        </q-item-section>

        <q-item-section>Privacy Statement</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'about'"
        @click="link = 'about'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-question"/>
        </q-item-section>

        <q-item-section>About Us</q-item-section>
      </q-item>

      <q-separator spaced class="q-pa-xs"/>

      <q-item
        clickable
        v-ripple
        :active="link === 'signout'"
        @click="signOut"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-sign-out-alt"/>
        </q-item-section>

        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <q-tabs
        v-if="mainStore.showNav"
        v-model="tab"
        no-caps
        inline-label
        class="q-mb-none shadow-2"
        :indicator-color="$q.dark.isActive ? 'accent' : 'primary'"
      >
        <q-tab name="mails" label="Projects" :class="{
          'text-primary': !$q.dark.isActive,
          'text-accent': $q.dark.isActive
        }" @click='$router.push({ path: `/projects` })'/>
        <q-tab name="alarms" label="Dashboard" :class="{
          'text-primary': !$q.dark.isActive,
          'text-accent': $q.dark.isActive
        }" @click='$router.push({ path: `/dashboard` })'/>
        <q-tab name="movies" label="Planning" :class="{
          'text-primary': !$q.dark.isActive,
          'text-accent': $q.dark.isActive
        }" @click='$router.push({ path: `/plans` })'/>
      </q-tabs>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage, useQuasar } from 'quasar'
import { useThemeStore } from 'stores/theme'

export default {
  setup () {
    const themeStore = useThemeStore()
    const leftDrawerOpen = ref(false)
    const deviceIsReady = ref(false)
    const mainStore = useMainStore()
    const authUser = ref(null)
    const $q = useQuasar()
    const isDark = ref(false)
    // const bgPhoto = ''
    $q.addressbarColor.set('#14252C')
    // document.addEventListener('deviceready', () => {
    //   deviceIsReady.value = true
    //   // eslint-disable-next-line no-undef
    //   StatusBar.overlaysWebView(false)
    //   // eslint-disable-next-line no-undef
    //   StatusBar.backgroundColorByHexString('#C10015')
    // }, false)

    return {
      isDark,
      themeStore,
      authUser,
      mainStore,
      deviceIsReady,
      headerState: ref(true),
      breadcrumbs: [],
      leftDrawerOpen,
      link: ref(''),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      tab: ref('mails'),
      lorem: 'Lorem ipsum dolor'
    }
  },
  mounted () {
    this.authUser = LocalStorage.getItem('authUser')
    console.log('MainLayout monunter')
    this.themeStore.setCurrentTheme(17) // 1,17, 20(light), 22(light)
  },
  methods: {
    toggleMode (val) {
      this.$q.dark.isActive = val
    },
    showHeader (arg, breadcrumbs) {
      console.log('--receiving emits from login page', arg)
      this.headerState = arg
      this.breadcrumbs = breadcrumbs
    },
    signOut () {
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
