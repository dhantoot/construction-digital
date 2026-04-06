<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
    class="glass-btn q-my-sm mx-2"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" class="neon-text-blue" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white text-weight-bold">{{
        title
      }}</q-item-label>
      <q-item-label caption class="text-grey-5">{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
