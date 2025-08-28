<template>
  <q-btn
    :label="label"
    flat
    class="text-capitalize bg-primary round-btn"
    disable="true"
    @click="fn"
  ></q-btn>
</template>
<script>
export default {
  props: {
    label: String,
    fn: Function
  },
  setup() {
    return {}
  }
}
</script>
