<template>
    <q-card dense :bordered="!$q.dark.isActive" :style="style" class="no-shadow p-10" :class="{
        'dark': $q.dark.isActive
    }">
      <div class="">
        <slot name="header"/>
      </div>
      <div class="pt-10 full-height">
        <slot name="body"/>
      </div>
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
      default: '.1px solid #464343'
    },
    height: {
      type: String,
      required: true,
      default: '250px'
    }
  },
  setup (props) {
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
  mounted () {
    console.log('-->', this.progress)
  }
}
</script>
<style lang="scss" scoped>
.xxx {
  height: 250px;
}
</style>
