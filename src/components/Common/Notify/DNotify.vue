<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        {{ message }}
      </q-card-section>
      <q-card-actions>
        <q-btn @click="hide" class="round-btn">Close</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  setup () {
    return {}
  },
  props: {
    message: String,
    type: String, // 'positive', 'negative', 'warning', 'info'
    position: String // 'top', 'bottom', 'left', 'right'
  },
  methods: {
    show () {
      console.log('this.$q.dialog', this.$q.dialog)
      this.$q.dialog.show = true
    },
    hide () {
      this.$q.dialog.hide()
    }
  }
}
</script>
