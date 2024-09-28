<template>
  <q-btn
    @click="fn"
    :label="label"
    flat
    class="text-capitalize bg-primary"
    disabled="true"
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
<style lang="scss" scoped>
.adminCard {
  min-height: 761px;
}
</style>
