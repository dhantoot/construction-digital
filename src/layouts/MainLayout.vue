<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="bg-negative text-white">
      <q-btn @click="leftDrawerOpen = !leftDrawerOpen" flat round dense icon="menu" class="q-mr-sm" />
      <!-- <q-space/> -->
      <!-- <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar> -->

      <q-toolbar-title class="text-center">My Projects</q-toolbar-title>
      <!-- <q-space/> -->
      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-list bordered separator padding class="text-dark text-caption">
      <q-item
        clickable
        v-ripple
        :active="link === 'back'"
        @click="leftDrawerOpen=false"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-arrow-left" />
        </q-item-section>

        <q-item-section></q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :active="link === 'profile'"
        @click="link = 'profile'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-user" />
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
          <q-icon name="las la-building" />
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
          <q-icon name="las la-envelope" />
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
          <q-icon name="las la-trash" />
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
          <q-icon name="las la-file-alt" />
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
          <q-icon name="las la-shield-alt" />
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
          <q-icon name="las la-question" />
        </q-item-section>

        <q-item-section>About Us</q-item-section>
      </q-item>

      <q-separator spaced class="q-pa-xs"/>

      <q-item
        clickable
        v-ripple
        :active="link === 'signout'"
        @click="link = 'signout'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="las la-sign-out-alt" />
        </q-item-section>

        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <q-tabs
        v-model="tab"
        dense
        no-caps
        inline-label
        class="shadow-2 text-weight-light q-mb-lg"
      >
        <q-tab name="mails" label="Projects" class="text-weight-light text-negative" @click='$router.push({ path: `/projects` })'/>
        <q-tab name="alarms" label="Dashboard" class="text-weight-light text-negative" @click='$router.push({ path: `/dashboard` })'/>
        <q-tab name="movies" label="Planning" class="text-weight-light text-negative" @click='$router.push({ path: `/projectplan` })'/>
      </q-tabs>

      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      tab: ref('mails'),
      lorem: 'Lorem ipsum do'
    }
  }
}
</script>
