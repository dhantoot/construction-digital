<template>
  <q-layout view="lHh lpR fFf">
    <q-img
     src="background3.jpg"
     class="fit absolute"
     v-if="true"
   />

    <q-header elevated class="text-accent" height-hint="98">
      <q-toolbar class="text-warning q-pt-lg" :style="{ 'margin-top': '-1px'}">
        <q-btn @click="leftDrawerOpen = !leftDrawerOpen" flat round :dense="true" icon="menu" class="q-mr-sm round-btn"/>
        <q-toolbar-title class="text-center q-pb-xs">Hofstee Inc.</q-toolbar-title>
        <q-btn flat round :dense="true" icon="whatshot" class="round-btn"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" class="q-mt-xl q-pt-lg">
      <q-list bordered separator padding class="text-secondary text-caption">
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
        class="shadow-2 q-mb-none"
        indicator-color="warning"
      >
        <q-tab name="mails" label="Projects" class="text-accent" @click='$router.push({ path: `/projects` })'/>
        <q-tab name="alarms" label="Dashboard" class="text-accent" @click='$router.push({ path: `/dashboard` })'/>
        <q-tab name="movies" label="Planning" class="text-accent" @click='$router.push({ path: `/plans` })'/>
      </q-tabs>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage, useQuasar } from 'quasar'
export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const deviceIsReady = ref(false)
    const mainStore = useMainStore()
    const authUser = LocalStorage.getItem('authUser')
    const $q = useQuasar()
    $q.addressbarColor.set('#14252C')
    // document.addEventListener('deviceready', () => {
    //   deviceIsReady.value = true
    //   // eslint-disable-next-line no-undef
    //   StatusBar.overlaysWebView(false)
    //   // eslint-disable-next-line no-undef
    //   StatusBar.backgroundColorByHexString('#C10015')
    // }, false)

    return {
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
    console.log('MainLayout monunter')
  },
  methods: {
    showHeader (arg, breadcrumbs) {
      console.log('--receiving emits from login page', arg)
      this.headerState = arg
      this.breadcrumbs = breadcrumbs
    },
    signOut () {
      this.link = 'signout'
      this.$router.push('/login')
    }
  }
}
</script>
