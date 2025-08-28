<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        {{ message }}
      </q-card-section>
      <q-card-actions>
        <q-btn class="round-btn" @click="hide">Close</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    message: String,
    type: String, // 'positive', 'negative', 'warning', 'info'
    position: String // 'top', 'bottom', 'left', 'right'
  },
  // name: 'ComponentName',
  setup() {
    return {}
  },
  methods: {
    show() {
      console.log('this.$q.dialog', this.$q.dialog)
      this.$q.dialog.show = true
    },
    hide() {
      this.$q.dialog.hide()
    }
  }
}
</script>
