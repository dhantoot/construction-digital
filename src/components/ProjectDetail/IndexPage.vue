<template>
  <div class="full-height">
    <router-view/>
  </div>
   <!-- <q-footer bordered class="text-accent">
    <q-tabs
      v-model="tab"
      class="text-accent"
      :class="{
        'bg-black shadow-2': $q.dark.isActive,
        'bg-primary shadow-2': !$q.dark.isActive
      }"
      no-caps
      switch-indicator
      indicator-color="accent"
      :dense="true"
    >
      <q-tab
        @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/todo` })"
        alert=""
        name="todo"
        icon="las la-check-square"
        label="Todo"
        class="q-pt-sm"
      >
        <q-badge color="negative" floating>7</q-badge>
      </q-tab>

      <q-tab
        @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/files` })"
        name="files"
        icon="las la-photo-video"
        label="Files"
        class="q-pt-sm"
      ></q-tab>

      <q-tab
        @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/chat` })"
        name="chat"
        icon="lab la-rocketchat"
        label="Chat"
        class="q-pt-sm"
      >
        <q-badge color="negative" floating>2</q-badge>
      </q-tab>

      <q-tab
        @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/planning` })"
        name="Plan"
        icon="las la-calendar-alt"
        label="Planning"
        class="q-pt-sm"
      >
      </q-tab>

      <q-tab
        @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/more` })"
        name="more"
        icon="las la-ellipsis-h"
        label="More"
        class="q-pt-sm"
     />
    </q-tabs>
  </q-footer> -->

  <div v-if="bottomNavPaths.includes(routeName)" class="bottom-nav-container">
      <q-bottom-navigation
        class="modern-bottom-nav shadow-4"
        active-color="white"
        glossy
        :class="{
          'bg-light': !$q.dark.isActive,
          'bg-primary text-accent': $q.dark.isActive
        }"
      >
        <q-btn round flat @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/todo` }); activeTab = 'todo'" :class="{ 'text-purple': activeTab === 'todo' }">
          <CheckSquareIcon size="24" />
        </q-btn>
        <q-btn round flat @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/files` }); activeTab = 'files'" :class="{ 'text-purple': activeTab === 'files' }">
          <FolderIcon size="24" />
        </q-btn>
        <q-btn round flat @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/chat` }); activeTab = 'chat'" :class="{ 'text-purple': activeTab === 'chat' }">
          <MessageCircleIcon size="24" />
        </q-btn>
        <q-btn round flat @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/planning` }); activeTab = 'planning'" :class="{ 'text-purple': activeTab === 'planning' }">
          <ClipboardListIcon size="24" />
        </q-btn>
        <q-btn round flat @click="$router.push({ path: `/detail/${mainStore?.mobileSelectedProject?.id}/more` }); activeTab = 'more'" :class="{ 'text-purple': activeTab === 'more' }">
          <SettingsIcon size="24" />
        </q-btn>
      </q-bottom-navigation>

      <!-- Center Label -->
      <div v-if="tab === 'analytics'" class="center-label text-white">
        Analytics
      </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'

export default {
  setup () {
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
  mounted () {},
  computed: {
    routeName: function () {
      return this.$route.name
    }
  },
  watch: {
    '$route.name' (newVal) {
      if (this.$route.name === 'project.details.default') {
        this.activeTab = 'details'
      }
    }
  }
}
</script>
