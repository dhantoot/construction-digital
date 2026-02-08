<template>
  <div class="p-5" :style="style">
    <div class="row items-center full-width no-wrap">
      <!-- Icon -->
      <div class="column col-auto justify-center">
        <slot name="icon" />
      </div>

      <!-- Text content -->
      <div class="column col q-pl-sm">
        <div class="text-bold" :class="$q.dark.isActive ? 'text-accent' : ''">
          <slot name="header" />
        </div>
        <div :class="$q.dark.isActive ? 'text-accent' : ''">
          <slot name="body"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

const theme = {
  cancel: '#ffa500',
  negative: '#ce6025',
  secondary: '#284239',
  primary: '#3e3e47',
  info: '#1f3957',
  accent: '#c0c1c3',
  warning: '#e0b269',
  positive: '#05807c',
  green: '#008000',
  red: '#ff0000',
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
    },
    width: {
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
      height: props.height || '250px',
      width: props?.width || '100%'
    })

    return {
      style
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
