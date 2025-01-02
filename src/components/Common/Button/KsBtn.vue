<template>
  <q-btn
    @click="fn"
    :label="label"
    flat
    class="text-capitalize bg-primary round-btn"
    disable="true"
   >
  </q-btn>
</template>
<script>
export default {
  setup () {
    return {}
  },
  props: {
    label: String,
    fn: Function
  }
}
</script>
