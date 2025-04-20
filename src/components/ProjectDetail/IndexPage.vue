<template>
  <!-- <q-btn
    color="primary"
    rounded
    v-if="this.$route.path === `/detail/${mainStore?.mobileSelectedProject?.id}`"
    style="position: absolute; z-index: 1"
    icon="las la-arrow-left"
    class="text-primary q-ma-xs"
    @click="this.$router.push('/projects')"
 /> -->
  <router-view/>
  <q-footer bordered class="text-accent">
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
  </q-footer>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'

export default {
  setup () {
    const mainStore = useMainStore()
    return {
      tab: ref('mails'),
      mainStore
    }
  },
  mounted () {
    // this.$emit('showHeader', false, [
    //   {
    //     label: 'Back',
    //     icon: 'las la-chevron-left',
    //     route: '/projects'
    //   }
    // ])
  }
}
</script>
