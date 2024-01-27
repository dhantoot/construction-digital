<template>
  <router-view />
  <q-footer bordered class="bg-grey-3 text-primary">
    <q-tabs
      v-model="tab"
      class="bg-white text-dark shadow-2"
      no-caps
      switch-indicator
      indicator-color="negative"
      dense
    >
      <q-tab @click='$router.push({ path: `/todo` })' alert="" name="todo" icon="las la-check-square" label="Todo" class="q-pt-sm">
        <q-badge color="red" floating>7</q-badge>
      </q-tab>

      <q-tab @click='$router.push({ path: `/files` })' name="files" icon="las la-photo-video" label="Files" class="q-pt-sm"></q-tab>

      <q-tab @click='$router.push({ path: `/chat` })' name="chat" icon="lab la-rocketchat" label="Chat" class="q-pt-sm">
        <q-badge color="red" floating>2</q-badge>
      </q-tab>

      <q-tab @click='$router.push({ path: `/planning` })' name="Plan" icon="las la-calendar-alt" label="Planning" class="q-pt-sm">
      </q-tab>

      <q-tab @click='$router.push({ path: `/more` })' name="more" icon="las la-ellipsis-h" label="More" class="q-pt-sm"/>
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
  }
}
</script>
