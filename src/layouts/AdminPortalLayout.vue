<template>
  <q-layout
    view="lHh lpR lFf"
    class="no-scroll"
    :style="{
      background: $q.dark.isActive ? 'black' : ''
    }"
  >
    <q-drawer
      v-if="routeName !== 'Admin Login'"
      v-model="drawer"
      show-if-above
      class="hide-scrollbar"
      :mini="drawer"
      :style="{
        'border-right': $q.dark.isActive
          ? '.1px solid #3a3a3a'
          : '.1px solid rgb(198 198 198 / 50%)',
        background: $q.dark.isActive ? 'black' : '#F0F0F0'
      }"
      @click.capture="drawerClick"
    >
      <template #mini>
        <div class="column justify-between full-height full-width">
          <div>
            <div class="row items-center justify-center pt-4">
              <div class="py-5">
                <q-btn
                  to="/admin-portal"
                  flat
                  icon="las la-play"
                  class="q-px-sm text-red"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 0
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  @click="activeBtn = 0"
                />
              </div>
              <div class="py-5 mt-10">
                <q-btn
                  to="/manage-sow"
                  flat
                  icon="las la-tools"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 1
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 1"
                />
              </div>
              <div class="py-5">
                <q-btn
                  to="/manage-projects"
                  flat
                  icon="las la-folder-open"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 2
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 2"
                />
              </div>
              <div class="py-5">
                <q-btn
                  to="/manage-invites"
                  flat
                  icon="lab la-telegram-plane"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 3
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 3"
                />
              </div>
              <div class="py-5 full-width q-px-md">
                <q-separator style="border-bottom: 0.1px solid #3a3a3a" />
              </div>
              <div class="py-5">
                <q-btn
                  to="/manage-accounts"
                  flat
                  icon="las la-user-tag"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 4
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 4"
                />
              </div>
              <div class="py-5">
                <q-btn
                  to="/whats-new"
                  flat
                  icon="las la-bell"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 5
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 5"
                />
              </div>
              <div class="py-5">
                <q-btn
                  flat
                  icon="las la-comments"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 6
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 6"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="row items-center justify-center">
              <div class="py-5">
                <q-btn
                  flat
                  icon="las la-headset"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 7
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 7"
                />
              </div>
              <div class="py-5">
                <q-btn
                  flat
                  icon="las la-cog"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 8
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 8"
                />
              </div>
              <div class="py-5">
                <q-btn
                  flat
                  icon="las la-user-circle"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :style="{
                    background:
                      activeBtn == 9
                        ? $q.dark.isActive
                          ? '#1e1f1f'
                          : '#e0e2e5'
                        : ''
                  }"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="activeBtn = 9"
                />
              </div>
              <div class="py-5 full-width q-px-md">
                <q-separator style="border-bottom: 0.1px solid #3a3a3a" />
              </div>
              <div class="py-10">
                <q-btn
                  square
                  icon="las la-sign-out-alt"
                  class="q-px-sm"
                  style="border-radius: 8px"
                  :class="[$q.dark.isActive ? 'text-accent' : 'text-primary']"
                  @click="openConfirmDialog('Confirm Logout', 'logout')"
                />
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
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container
      class="page-container"
      :style="{
        'background: black': $q.dark.isActive,
        'background: #f2f4f7': !$q.dark.isActive,
        'height: 100vh': $q.screen.gt.sm
      }"
    >
      <div class="row full-width mt-45 items-center">

        <div
          v-if="$route.name !== 'Admin Login'"
          :style="{
            background: $q.dark.isActive ? 'black' : ''
          }"
          :class="[
            $q.dark.isActive ? 'text-accent bg-black' : 'text-primary bg-light'
          ]"
          class="full-width"
        >
          <!-- Replaces q-toolbar: uses 'row' and 'items-center' for alignment -->
          <div class="row justify-between full-width items-center">
            <!-- Replaces q-toolbar-title, uses 'col' or margins for spacing -->
            <div class="column items-center justify-center mx-8">
              <strong class="caption text-h6">{{ routeName }}</strong>
            </div>

            <div class="row gap-10">
              <q-toggle
                v-model="isDark"
                dense
                checked-icon="las la-moon"
                color="accent"
                unchecked-icon="las la-sun"
                label=""
                @update:model-value="toggleMode"
              />
              <q-btn
                v-if="
                  mainStore?.adminUser &&
                  authUser &&
                  $route.name !== 'Admin Login'
                "
                size="12px"
                flat
                round
                color="accent"
                icon="las la-bell"
              />
              <div
                v-if="
                  mainStore?.adminUser &&
                  authUser &&
                  $route.name !== 'Admin Login'
                "
                class="clickable mr-5"
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
                  :offset="[5, 15]"
                >
                  <!-- ... q-list items remain the same ... -->
                  <template #activator="{ on }">
                    <q-btn flat dense icon="more_vert" v-on="on" />
                  </template>
                  <q-list style="min-width: 200px">
                    <q-item>
                      <q-item-section>Dark Mode</q-item-section>
                      <q-item-section side>
                        <q-toggle
                          v-model="isDark"
                          dense
                          checked-icon="las la-moon"
                          color="text-accent"
                          unchecked-icon="las la-sun"
                          label=""
                          @update:model-value="toggleMode"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple clickable>
                      <q-item-section>My Profile</q-item-section>
                      <q-item-section side>
                        <q-icon name="las la-user" class="text-accent" />
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-ripple
                      clickable
                      @click="openConfirmDialog('Confirm Logout', 'logout')"
                    >
                      <q-item-section>Logout</q-item-section>
                      <q-item-section side>
                        <q-icon
                          name="las la-sign-out-alt"
                          class="text-accent"
                        />
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
      v-if="$route.name !== 'Admin Login' && !$q.screen.gt.xs"
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
          round
          flat
          :class="{ 'text-purple': activeTab === 'dashboard' }"
          @click="
            () => {
              $router.push({ path: `/admin-portal` })
              activeTab = 'dashboard'
            }
          "
        >
          <div class="column justify-start items-center">
            <PlayIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          round
          flat
          :class="{ 'text-purple': activeTab === 'sow' }"
          @click="
            () => {
              $router.push({ path: `/manage-sow` })
              activeTab = 'sow'
            }
          "
        >
          <div class="column justify-start items-center">
            <WrenchIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          round
          flat
          :class="{ 'text-purple': activeTab === 'projects' }"
          @click="
            () => {
              $router.push(`/manage-projects`)
              activeTab = 'projects'
            }
          "
        >
          <div class="column justify-start items-center">
            <FolderKanbanIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          round
          flat
          :class="{ 'text-purple': activeTab === 'invites' }"
          @click="
            () => {
              $router.push(`/manage-invites`)
              activeTab = 'invites'
            }
          "
        >
          <div class="column justify-start items-center">
            <SendIcon size="24" />
          </div>
        </q-btn>
        <q-btn
          round
          flat
          :class="{ 'text-purple': activeTab === 'accounts' }"
          @click="
            () => {
              $router.push(`/manage-accounts`)
              activeTab = 'accounts'
            }
          "
        >
          <div class="column justify-start items-center">
            <UserSearchIcon size="24" />
          </div>
        </q-btn>
      </div>
    </div>
  </q-layout>

  <q-dialog v-model="confirm" persistent>
    <q-card
      :class="{
        'no-shadow': $q.dark.isActive
      }"
    >
      <q-card-section class="row items-center">
        <q-avatar size="sm">
          <template #default>
            <CircleAlertIcon size="20" />
          </template>
        </q-avatar>
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          v-close-popup
          padding="sm xl"
          class="round-btn text-capitalize"
          color="negative"
        >
          <template #default>
            <XIcon class="q-mr-sm" />
            <span class="text-capitalize">Close</span>
          </template>
        </q-btn>

        <q-btn
          padding="sm xl"
          class="round-btn text-capitalize"
          color="info"
          :loading="actionAccountLoader"
          :disable="actionAccountLoader"
          @click="callConfirmFn()"
        >
          <template #loading>
            <q-spinner-ios class="on-left" />
            <small>Logging out..</small>
          </template>

          <template #default>
            <CheckIcon class="q-mr-sm" />
            <span class="text-capitalize">Confirm</span>
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, nextTick } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage } from 'quasar'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar'
import HofsteeAvatar from 'src/components/Common/Badge/HofsteeAvatar.vue'

export default {
  components: {
    HofsteeAvatar
  },
  setup() {
    const miniState = ref(false)
    const isDark = ref(false)
    const mainStore = useMainStore()
    const activeBtn = ref(0)

    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: '#f0f0f0' })
      StatusBar.setStyle({ style: Style.Light })
    }

    return {
      activeBtn,
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      actionAccountLoader: ref(false),
      authUser: ref(null),
      drawer: ref(false),
      mainStore,
      miniState,
      isDark,
      drawerClick() {},
      obj: ref({})
    }
  },
  computed: {
    routeName: function () {
      return this.$route.name
    }
  },
  async mounted() {
    this.$q.dark.isActive = false
    // if (Capacitor.isNativePlatform()) {
    //   await StatusBar.setBackgroundColor({color: '#f0f0f0'})
    //   await StatusBar.setStyle({style: Style.Light})
    // }

    this.authUser = LocalStorage.getItem('authUser')
  },
  methods: {
    async emitFromChild() {
      await nextTick()
      await this.fetchUserProfile()
    },
    async fetchUserProfile() {
      console.log('fetchUserProfile..')
      this.authUser = LocalStorage.getItem('authUser')
      if (!this.authUser) {
        return
      }
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
    openConfirmDialog(confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn() {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    logout() {
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
  }
}
</script>

<style lang="scss" scoped>
.hovered:active {
  background: #e0e2e5;
}
</style>
