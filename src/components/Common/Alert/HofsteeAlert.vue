<template>
  <div class="p-5" :style="style">
    <div class="row gap-10 items-center">
      <div class="column col-auto justify-center">
        <slot name="icon" />
      </div>
      <div class="column width-80">
        <div><slot name="header" /></div>
        <div><slot name="body" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

const theme = {
  cancel: '#ffa500',
  negative: '#82401D',
  secondary: '#273C41',
  primary: '#14252C',
  info: '#45575B',
  accent: '#f0f2f5',
  warning: '#CCD0CF',
  positive: '#A3A39B',
  green: '#008000',
  red: '#ff0000'
}

export default {
  props: {
    backgroundColor: {
      type: String,
      default: '',
      required: false
    },
    borderRadius: {
      type: String,
      default: '',
      required: false
    },
    borderColor: {
      type: String,
      default: '',
      required: false
    },
    border: {
      type: String,
      default: '',
      required: false
    },
    height: {
      type: String,
      default: '',
      required: false
    }
  },
  setup(props) {
    const opacityAlphaChannel = 80 // = 0.5
    const style = ref({
      'background-color': props.backgroundColor,
      'border-radius': props.borderRadius,
      border: `${props.border} ${Object.keys(theme).includes(props.borderColor) ? theme[props.borderColor] : props.borderColor}${opacityAlphaChannel}`,
      height: props.height || '250px'
    })

    return {
      style
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
