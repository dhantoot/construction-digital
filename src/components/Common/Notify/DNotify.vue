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
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'positive'
    }, // 'positive', 'negative', 'warning', 'info'
    position: {
      type: String,
      default: 'top'
    } // 'top', 'bottom', 'left', 'right'
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
