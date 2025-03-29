<template>
  <div class="q-pa-md">
    <q-drawer dark v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" bordered>
      <template v-slot:mini>
        <div class="row items-center justify-center">
          <div class="px-10 py-5">
            <q-btn square icon="las la-home" class="q-px-sm" style="border-radius: 8px;" />
          </div>
          <div class="px-10 py-5">
            <q-btn square icon="las la-file-alt" class="q-px-sm" style="border-radius: 8px;" />
          </div>
          <div class="px-10 py-5">
            <q-btn square icon="las la-calendar-alt" class="q-px-sm" style="border-radius: 8px;" />
          </div>
          <div class="px-10 py-5 full-width">
            <q-separator dark />
          </div>
          <div class="px-10 py-5">
            <q-btn square icon="las la-share-alt" class="q-px-sm" style="border-radius: 8px;" />
          </div>
          <div class="px-10 py-5">
            <q-btn square icon="las la-clock" class="q-px-sm" style="border-radius: 8px;" />
          </div>
          <div class="px-10 py-5">
            <q-btn square icon="las la-rocket-chat" class="q-px-sm" style="border-radius: 8px;" />
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

    <q-page-container>
      <q-page class="q-px-lg q-py-md">
        <p v-for="n in 15" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore
          vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi
          perferendis
          voluptate?
        </p>
      </q-page>
    </q-page-container>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const miniState = ref(true)

    return {
      drawer: ref(false),
      miniState,

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
