<template>
  <q-layout view="lHh lpR lFf" :class="{
    'bg-black': $q.dark.isActive,
    'bg-white': !$q.dark.isActive
  }" class="full-height">

    <q-header class="text-white" :class="{
      'bg-black': $q.dark.isActive,
      'bg-white text-black': !$q.dark.isActive
    }" height-hint="98" style="border-bottom: .2px solid #3a3a3a;">
      <q-toolbar>
        <q-toolbar-title>
          {{ routeName }}
        </q-toolbar-title>
        <q-toggle dense v-model="isDark" checked-icon="check" color="grey" unchecked-icon="clear" label=""
          @update:model-value="toggleMode" />
        <q-btn v-if="!mainStore?.adminUser?.uid" flat round :dense="true" icon="las la-exchange-alt" class="round-btn" to="/login" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="mainStore?.adminUser?.uid" v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick"
      class="hide-scrollbar" :class="{
        'bg-black': $q.dark.isActive,
        'bg-white': !$q.dark.isActive
      }" style="border-right: .1px solid #3a3a3a;">
      <template v-slot:mini>
        <div class="column justify-between full-height full-width">
          <div>
            <div class="row items-center justify-center pt-4">
              <div class="py-5">
                <q-btn to="/admin-portal" square icon="las la-play" class="q-px-sm text-red"
                  style="border-radius: 8px;" />
              </div>
              <div class="py-5 mt-10">
                <q-btn to="/manage-sow" square icon="las la-tools" class="q-px-sm text-grey" style="border-radius: 8px;"
                  :class="{
                    'text-black': !$q.dark.isActive
                  }" />
              </div>
              <div class="py-5">
                <q-btn to="/manage-projects" square icon="las la-folder-open" class="q-px-sm text-grey"
                  style="border-radius: 8px;" :class="{
                    'text-black': !$q.dark.isActive
                  }" />
              </div>
              <div class="py-5">
                <q-btn to="/manage-invites" square icon="lab la-telegram-plane" class="q-px-sm text-grey"
                  style="border-radius: 8px;" :class="{
                    'text-black': !$q.dark.isActive
                  }" />
              </div>
              <div class="py-5 full-width q-px-md">
                <q-separator style="border-bottom: .1px solid #3a3a3a;" />
              </div>
              <div class="py-5">
                <q-btn to="/manage-accounts" square icon="las la-user-tag" class="q-px-sm text-grey"
                  style="border-radius: 8px;" :class="{
                    'text-black': !$q.dark.isActive
                  }" />
              </div>
              <div class="py-5">
                <q-btn to="/whats-new" square icon="las la-bell" class="q-px-sm text-grey" style="border-radius: 8px;"
                  :class="{
                    'text-black': !$q.dark.isActive
                  }" />
              </div>
              <div class="py-5">
                <q-btn square icon="las la-comments" class="q-px-sm text-grey" style="border-radius: 8px;" :class="{
                  'text-black': !$q.dark.isActive
                }" />
              </div>
            </div>
          </div>
          <div>
            <div class="row items-center justify-center">
              <div class="py-5">
              <q-btn square icon="las la-headset" class="q-px-sm text-grey" style="border-radius: 8px;" :class="{
                'text-black': !$q.dark.isActive
              }" />
            </div>
            <div class="py-5">
              <q-btn square icon="las la-cog" class="q-px-sm text-grey" style="border-radius: 8px;" :class="{
                'text-black': !$q.dark.isActive
              }" />
            </div>
            <div class="py-5">
              <q-btn square icon="las la-user-circle" class="q-px-sm text-grey" style="border-radius: 8px;" :class="{
                'text-black': !$q.dark.isActive
              }" />
            </div>
            <div class="py-5 full-width q-px-md">
              <q-separator style="border-bottom: .1px solid #3a3a3a;" />
            </div>
            <div class="py-10">
              <q-btn @click="openConfirmDialog('Confirm Logout', 'logout')" square icon="las la-sign-out-alt"
                class="q-px-sm text-grey" style="border-radius: 8px;" :class="{
                  'text-black': !$q.dark.isActive
                }" />
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

    <q-page-container class="hide-scrollbar full-height" :class="{
      'bg-black': $q.dark.isActive,
      'bg-white': !$q.dark.isActive
    }">
      <router-view />
    </q-page-container>

  </q-layout>

  <q-dialog v-model="confirm" persistent>
    <q-card :class="{
      'no-shadow': $q.dark.isActive
    }">
      <q-card-section class="row items-center">
        <q-avatar size="sm" icon="las la-exclamation" color="cancel" text-color="white" />
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative"
          v-close-popup />
        <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="primary"
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

export default {
  setup () {
    const miniState = ref(true)
    const isDark = ref(true)
    const mainStore = useMainStore()

    return {
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      actionAccountLoader: ref(false),
      authUser: ref(null),
      drawer: ref(true),
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
      }
    }
  },
  methods: {
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
        this.mainStore.adminUser = null
        this.actionAccountLoader = false
        this.confirm = false
        this.$router.push('/admin-portal')
      }, 2000)
    }
  },
  mounted () {
    this.$q.dark.isActive = true
    this.authUser = LocalStorage.getItem('authUser')
    console.log(this.$route)
  },
  computed: {
    routeName: function () {
      return this.$route.name
    }
  }
}
</script>
<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em
  padding: 2px 16px

  & + &
    margin-top: 18px
</style>
<style lang="scss" scoped>
</style>
