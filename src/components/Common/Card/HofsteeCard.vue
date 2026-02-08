<template>
  <q-card
    dense
    :style="style"
    class="no-shadow p-10"
    :bordered="bordered"
    :flat="flat"
    :class="{
      'no-border': noBorder
    }"
  >
    <div class="text-weight-bold text-body2">
      <slot name="header" />
    </div>
    <div class="text-body2">
      <slot name="subHeader" />
    </div>
    <div class="pt-10 full-height">
      <slot name="body" />
    </div>
    <slot name="body-loader"></slot>
  </q-card>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    backgroundColor: {
      type: String,
      required: true
    },
    borderRadius: {
      type: String,
      required: false,
      default: '8px'
    },
    border: {
      type: String,
      required: true,
      default: '.1px solid rgb(198 198 198, 0.2)'
    },
    height: {
      type: String,
      required: true,
      default: '250px'
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const style = ref({
      'background-color': props.backgroundColor,
      'border-radius': props.borderRadius,
      border: props.border,
      height: props.height
    })

    return {
      style
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.xxx {
  height: 250px;
}
</style>
