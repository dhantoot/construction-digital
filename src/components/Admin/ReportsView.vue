<template>
  <div class="q-pa-md full-height overflow-hidden">
    <div class="glass-panel full-height p-20 scroll">
      <div class="text-h5 neon-text-blue mb-20">Reports & Analytics</div>
      <p v-for="n in 15" :key="n" class="text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
        praesentium molestias a adipisci, dolore vitae odit, quidem consequatur
        optio voluptates asperiores pariatur eos numquam rerum delectus commodi
        perferendis voluptate?
      </p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em
  padding: 2px 16px

  & + &
    margin-top: 18px
</style>
