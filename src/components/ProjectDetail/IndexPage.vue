<template>
  <div
    class="full-height"
    :style="[$q.screen.lt.sm ? 'padding-bottom: 90px;' : '']"
  >
    <router-view />
  </div>

  <div v-if="bottomNavPaths.includes(routeName)" class="bottom-nav-container">
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
        :class="{ 'text-purple': activeTab === 'todo' }"
        @click="navigateTo('todo')"
      >
        <CheckSquareIcon size="24" />
      </q-btn>
      <q-btn
        round
        flat
        :class="{ 'text-purple': activeTab === 'files' }"
        @click="navigateTo('files')"
      >
        <Images size="24" />
      </q-btn>
      <q-btn
        round
        flat
        :class="{ 'text-purple': activeTab === 'chat' }"
        @click="navigateTo('chat')"
      >
        <MessageCircleIcon size="24" />
      </q-btn>
      <q-btn
        round
        flat
        :class="{ 'text-purple': activeTab === 'planning' }"
        @click="navigateTo('planning')"
      >
        <ClipboardListIcon size="24" />
      </q-btn>
      <q-btn
        round
        flat
        :class="{ 'text-purple': activeTab === 'more' }"
        @click="navigateTo('more')"
      >
        <SettingsIcon size="24" />
      </q-btn>
    </div>

    <!-- Center Label -->
    <div v-if="activeTab === 'analytics'" class="center-label text-white">
      Analytics
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'

export default {
  setup() {
    const mainStore = useMainStore()
    return {
      activeTab: ref('details'),
      mainStore,
      bottomNavPaths: [
        'project.details.todo',
        'project.details.files',
        'project.details.planning',
        'project.details.chat.default',
        'project.details.more',
        'project.details.default'
      ]
    }
  },
  computed: {
    routeName: function () {
      return this.$route.name
    }
  },
  watch: {
    '$route.name'() {
      if (this.$route.name === 'project.details.default') {
        this.activeTab = 'details'
      }
    }
  },
  mounted() {},
  methods: {
    navigateTo(page) {
      if (page === 'todo') {
        this.$router.push({
          path: `/detail/${this.mainStore?.mobileSelectedProject?.id}/todo`
        })
        this.activeTab = 'todo'
      }
      if (page === 'files') {
        this.$router.push({
          path: `/detail/${this.mainStore?.mobileSelectedProject?.id}/files`
        })
        this.activeTab = 'files'
      }
      if (page === 'chat') {
        this.$router.push({
          path: `/detail/${this.mainStore?.mobileSelectedProject?.id}/chat`
        })
        this.activeTab = 'chat'
      }
      if (page === 'planning') {
        this.$router.push({
          path: `/detail/${this.mainStore?.mobileSelectedProject?.id}/planning`
        })
        this.activeTab = 'planning'
      }
      if (page === 'more') {
        this.$router.push({
          path: `/detail/${this.mainStore?.mobileSelectedProject?.id}/more`
        })
        this.activeTab = 'more'
      }
    }
  }
}
</script>
