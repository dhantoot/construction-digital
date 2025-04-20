<template>
    <div class="debug column p-10">
      <q-input v-model="name" label="Name" />
      <q-input v-model="email" label="Email" />
      <q-btn @click="onOK">OK</q-btn>
      <q-btn @click="onCancel">Cancel</q-btn>
    </div>
  </template>

<script>
export default {
  emits: ['ok', 'hide'],
  data () {
    return {
      eventName: '',
      eventDescription: ''
    }
  },
  methods: {
    onOK () {
      this.$emit('ok', { eventName: this.eventName, eventDescription: this.eventDescription })
      this.$q.dialog.hide()
    },
    onCancel () {
      this.$q.dialog.hide()
    }
  }
}
</script>
