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
    src: String,
    size: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.online {
  border: 1px solid #4caf50;
  position: relative;
}

.online-badge {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4caf50;
  border: 0.5px solid #fff;
}
</style>
