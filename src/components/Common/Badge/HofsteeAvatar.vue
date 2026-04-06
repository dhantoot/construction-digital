<template>
  <div style="border-radius: 50%" class="online bg-green">
    <q-avatar dense :size="size">
      <img :src="src" />
      <div class="online-badge"></div>
    </q-avatar>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: String,
      required: false,
      default: '32px'
    }
  }
}
</script>

<style scoped>
.online {
  border: 2px solid rgba(0, 210, 255, 0.4);
  position: relative;
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.2);
}

.online-badge {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #00ffaa;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 8px rgba(0, 255, 170, 0.6);
}
</style>
