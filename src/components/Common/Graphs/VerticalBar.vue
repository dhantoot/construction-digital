<template>
  <div class="column justify-end items-center">
    <div>
      <small class="text-green" style="font-size: 10px">{{ day }}</small>
    </div>
    <div
      class="row items-end bg-grey-9"
      style="height: 100px; width: 40px; border-radius: 6px"
    >
      <div
        class="row items-end justify-center p-5 bg-grey-7"
        :style="style"
      ></div>
    </div>
    <div>
      <small style="font-size: 10px">{{ progress }}%</small>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    progress: {
      type: Number,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const style = ref({
      height: props.progress + 'px',
      width: '40px',
      'border-radius': '6px'
    })

    return {
      style
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
