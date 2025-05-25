<!-- components/MultiInputDialog.vue -->
<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">Enter Your Info</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="eventName" label="Name" />
        <q-input v-model="eventDescription" label="Email" class="q-mt-sm" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancel" />
        <q-btn flat label="OK" color="primary" @click="onOK" />
      </q-card-actions>
    </q-card>
  </template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const eventName = ref('')
const eventDescription = ref('')

const { onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOK () {
  onDialogOK({ eventName: eventName.value, eventDescription: eventDescription.value })
}

function onCancel () {
  onDialogCancel()
}
</script>
