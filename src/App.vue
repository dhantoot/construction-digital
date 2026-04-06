<template>
  <GlassBackground />
  <div class="noise-overlay"></div>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import GlassBackground from 'src/components/Common/GlassBackground.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlassBackground
  },
  data() {
    return {
      mouseHandler: null
    }
  },
  mounted() {
    this.mouseHandler = e => {
      const target = e.target.closest('.glass-panel, .glass-card, .glass-btn')
      if (target) {
        const rect = target.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        target.style.setProperty('--mouse-x', `${x}px`)
        target.style.setProperty('--mouse-y', `${y}px`)
      }
    }
    window.addEventListener('mousemove', this.mouseHandler)
  },
  unmounted() {
    if (this.mouseHandler) {
      window.removeEventListener('mousemove', this.mouseHandler)
    }
  }
})
</script>
