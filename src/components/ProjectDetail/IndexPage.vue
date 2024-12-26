<template>
  <!-- <q-btn
    color="primary"
    rounded
    v-if="this.$route.path === '/detail'"
    style="position: absolute; z-index: 1"
    icon="las la-arrow-left"
    class="text-primary q-ma-xs"
    @click="this.$router.push('/projects')"
 /> -->
  <router-view/>
  <q-footer bordered class="text-primary">
    <q-tabs
      v-model="tab"
      class="bg-primay text-warning shadow-2 q-pb-md"
      no-caps
      switch-indicator
      indicator-color="negative"
      :dense="true"
    >
      <q-tab
        @click="$router.push({ path: `/todo` })"
        alert=""
        name="todo"
        icon="las la-check-square"
        label="Todo"
        class="q-pt-sm"
      >
        <q-badge color="negative" floating>7</q-badge>
      </q-tab>

      <q-tab
        @click="$router.push({ path: `/files` })"
        name="files"
        icon="las la-photo-video"
        label="Files"
        class="q-pt-sm"
      ></q-tab>

      <q-tab
        @click="$router.push({ path: `/chat` })"
        name="chat"
        icon="lab la-rocketchat"
        label="Chat"
        class="q-pt-sm"
      >
        <q-badge color="negative" floating>2</q-badge>
      </q-tab>

      <q-tab
        @click="$router.push({ path: `/planning` })"
        name="Plan"
        icon="las la-calendar-alt"
        label="Planning"
        class="q-pt-sm"
      >
      </q-tab>

      <q-tab
        @click="$router.push({ path: `/more` })"
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
export default {
  setup () {
    return {
      tab: ref('mails')
    }
  },
  mounted () {
    // console.log(this.$route.path)
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
