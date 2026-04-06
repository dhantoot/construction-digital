<template>
  <q-layout
    view="lHh lpR lFf"
    class="no-scroll"
    style="background: transparent"
  >
    <q-drawer
      v-if="routeName !== 'Admin Login'"
      v-model="drawer"
      show-if-above
      :width="310"
      class="hide-scrollbar bg-transparent"
      :mini="miniState"
      @click.capture="drawerClick"
    >
      <div
        class="column justify-between glass-panel"
        style="
          margin: 7px;
          height: calc(100vh - 14px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        "
      >
        <div class="column justify-between full-height mb-15">
          <q-scroll-area class="col hide-scrollbar">
            <q-list padding class="text-white">
              <q-item
                v-ripple
                clickable
                to="/admin-portal"
                :class="{ 'active-item-glass': activeBtn === 0 }"
                @click="activeBtn = 0"
              >
                <q-item-section side>
                  <Play
                    :class="{ 'neon-text-blue': activeBtn === 0 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-blue': activeBtn === 0 }"
                  >Dashboard</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/manage-sow"
                class="mt-10"
                :class="{ 'active-item-glass': activeBtn === 1 }"
                @click="activeBtn = 1"
              >
                <q-item-section side>
                  <PencilRuler
                    :class="{ 'neon-text-violet': activeBtn === 1 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-violet': activeBtn === 1 }"
                  >Manage SOW</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/manage-projects"
                :class="{ 'active-item-glass': activeBtn === 2 }"
                @click="activeBtn = 2"
              >
                <q-item-section side>
                  <FolderKanbanIcon
                    :class="{ 'neon-text-pink': activeBtn === 2 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-pink': activeBtn === 2 }"
                  >Manage Projects</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/manage-invites"
                :class="{ 'active-item-glass': activeBtn === 3 }"
                @click="activeBtn = 3"
              >
                <q-item-section side>
                  <Send
                    :class="{ 'neon-text-blue': activeBtn === 3 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-blue': activeBtn === 3 }"
                  >Manage Invites</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/manage-accounts"
                :class="{ 'active-item-glass': activeBtn === 4 }"
                @click="activeBtn = 4"
              >
                <q-item-section side>
                  <Users
                    :class="{ 'neon-text-violet': activeBtn === 4 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-violet': activeBtn === 4 }"
                  >Manage Accounts</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/chats"
                :class="{ 'active-item-glass': activeBtn === 5 }"
                @click="activeBtn = 5"
              >
                <q-item-section side>
                  <MessageCircleMore
                    :class="{ 'neon-text-pink': activeBtn === 5 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-pink': activeBtn === 5 }"
                  >Messages</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/whats-new"
                :class="{ 'neon-text-cyan': activeBtn === 6 }"
                @click="activeBtn = 6"
              >
                <q-item-section side>
                  <TrendingUp
                    :class="{ 'neon-text-cyan': activeBtn === 6 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-cyan': activeBtn === 6 }"
                  >Trends</q-item-section
                >
              </q-item>

              <q-item
                v-ripple
                clickable
                to="/manage-reports"
                :class="{ 'neon-text-blue': activeBtn === 7 }"
                @click="activeBtn = 7"
              >
                <q-item-section side>
                  <BarChart3
                    :class="{ 'neon-text-blue': activeBtn === 7 }"
                    size="20"
                  />
                </q-item-section>
                <q-item-section
                  v-if="!miniState"
                  :class="{ 'neon-text-blue': activeBtn === 7 }"
                  >Reports</q-item-section
                >
              </q-item>
            </q-list>
          </q-scroll-area>

          <q-spacer />

          <q-list padding class="text-white q-mb-md">
            <q-item
              v-ripple
              clickable
              to="/support"
              :class="{ 'neon-text-violet': activeBtn === 8 }"
              @click="activeBtn = 8"
            >
              <q-item-section side>
                <LifeBuoy
                  :class="{ 'neon-text-violet': activeBtn === 8 }"
                  size="20"
                />
              </q-item-section>
              <q-item-section
                v-if="!miniState"
                :class="{ 'neon-text-violet': activeBtn === 8 }"
                >Support</q-item-section
              >
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/settings"
              :class="{ 'neon-text-pink': activeBtn === 9 }"
              @click="activeBtn = 9"
            >
              <q-item-section side>
                <Settings
                  :class="{ 'neon-text-pink': activeBtn === 9 }"
                  size="20"
                />
              </q-item-section>
              <q-item-section
                v-if="!miniState"
                :class="{ 'neon-text-pink': activeBtn === 9 }"
                >Settings</q-item-section
              >
            </q-item>

            <q-item
              v-ripple
              clickable
              class="text-negative"
              @click="openConfirmDialog('Confirm Logout', 'logout')"
            >
              <q-item-section side>
                <LogOut color="red" size="20" />
              </q-item-section>
              <q-item-section v-if="!miniState">Logout</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="page-container" style="background: transparent">
      <div
        class="row full-width items-center q-px-sm"
        :class="$isCapacitorMode ? 'mt-45' : ''"
      >
        <div
          v-if="$route.name !== 'Admin Login'"
          class="full-width glass-panel no-border-radius-top"
          style="border-radius: 0 0 20px 20px; border-top: none"
        >
          <!-- Replaces q-toolbar: uses 'row' and 'items-center' for alignment -->
          <div class="row justify-between full-width items-center px-4 py-2">
            <div class="row items-center no-wrap">
              <q-btn
                v-if="$route.name !== 'Admin Login'"
                flat
                dense
                round
                icon="menu"
                class="q-mr-sm neon-text-blue"
                @click="toggleSidebar"
              />
              <div class="column items-center justify-center mx-8">
                <strong
                  class="caption neon-text-blue"
                  :class="[$q.screen.lt.sm ? 'caption' : 'text-h6']"
                >
                  {{
                    routeName === 'admin.my-profile'
                      ? 'User Details'
                      : routeName
                  }}
                </strong>
              </div>
            </div>

            <div class="row gap-10 items-center">
              <q-btn
                v-if="
                  mainStore?.adminUser &&
                  authUser &&
                  $route.name !== 'Admin Login'
                "
                flat
                round
                class="neon-text-violet"
                icon="las la-bell"
              />
              <div
                v-if="
                  mainStore?.adminUser &&
                  authUser &&
                  $route.name !== 'Admin Login'
                "
                class="clickable mr-5 relative-position"
              >
                <q-avatar
                  size="35px"
                  style="border: 2px solid rgba(0, 210, 255, 0.3)"
                >
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
                  class="glass-panel"
                  :offset="[0, 10]"
                  anchor="bottom end"
                  self="top end"
                  transition-show="fade"
                  transition-hide="fade"
                >
                  <q-list style="min-width: 200px" class="text-white">
                    <!-- ... q-list items ... -->
                    <q-item
                      v-ripple
                      clickable
                      :to="`/admin-profile/${authUser.uid}`"
                    >
                      <q-item-section>My Profile</q-item-section>
                      <q-item-section side>
                        <CircleUser size="18" color="white" />
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-ripple
                      clickable
                      @click="openConfirmDialog('Confirm Logout', 'logout')"
                    >
                      <q-item-section class="text-negative"
                        >Logout</q-item-section
                      >
                      <q-item-section side>
                        <LogOut size="18" color="red" />
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
        class="modern-bottom-nav glass-panel"
        style="height: 65px; border-radius: 32px; padding: 0 10px"
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
            <PencilRuler size="24" />
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
            <Users size="24" />
          </div>
        </q-btn>
        <q-btn
          round
          flat
          :class="{ 'text-purple': activeTab === 'messages' }"
          @click="
            () => {
              $router.push(`/chats`)
              activeTab = 'messages'
            }
          "
        >
          <div class="column justify-start items-center">
            <MessageCircleMore size="24" />
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
      <q-card-section class="row items-center q-pa-xs">
        <q-avatar class="" size="sm">
          <template #default>
            <CircleAlertIcon size="20" />
          </template>
        </q-avatar>
        <span class="q-pa-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="row full-width q-pa-sm">
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
// import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar'
import HofsteeAvatar from 'src/components/Common/Badge/HofsteeAvatar.vue'

export default {
  components: {
    HofsteeAvatar
  },
  setup() {
    const miniState = ref(false)
    const mainStore = useMainStore()
    const activeBtn = ref(0)
    const hoveredBtn = ref(null)

    return {
      activeBtn,
      hoveredBtn,
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      actionAccountLoader: ref(false),
      authUser: ref(null),
      drawer: ref(true),
      mainStore,
      miniState,
      drawerClick() {},
      obj: ref({}),
      activeTab: ref(false),
      showTooltips: ref(true)
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

    // Initialize tooltip setting
    this.$q.dark.set(true)
    StatusBar.setBackgroundColor({ color: '#000000' })
    StatusBar.setStyle({ style: Style.Dark })
    NavigationBar.setColor({
      color: '#00000000',
      darkButtons: false
    })

    // Listen for settings change
    window.addEventListener('settings-changed', event => {
      if (event.detail && typeof event.detail.showTooltips !== 'undefined') {
        this.showTooltips = event.detail.showTooltips
      }
    })
  },
  methods: {
    toggleSidebar() {
      if (this.$q.screen.gt.sm) {
        this.miniState = !this.miniState
      } else {
        this.drawer = !this.drawer
      }
    },
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
