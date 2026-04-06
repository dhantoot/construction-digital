<template>
  <div class="glass-background-container" :style="containerStyle">
    <div class="mesh-gradient"></div>
    <div class="blobs">
      <div
        v-for="n in 4"
        :key="n"
        :class="['blob', `blob-${n}`]"
        :style="blobStyles[n - 1]"
      ></div>
    </div>
    <div class="noise-overlay"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const containerStyle = computed(() => ({
  '--mouse-x': `${mouseX.value}px`,
  '--mouse-y': `${mouseY.value}px`
}))

const blobStyles = ref([
  { left: '10%', top: '20%', transform: 'translate(0, 0)' },
  { left: '60%', top: '10%', transform: 'translate(0, 0)' },
  { left: '20%', top: '70%', transform: 'translate(0, 0)' },
  { left: '80%', top: '60%', transform: 'translate(0, 0)' }
])

const handleMouseMove = e => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY

  // Parallax effect for blobs
  const moveX = (e.clientX - window.innerWidth / 2) / 50
  const moveY = (e.clientY - window.innerHeight / 2) / 50

  blobStyles.value.forEach((style, index) => {
    const factor = (index + 1) * 0.5
    style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`
  })
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="scss" scoped>
.glass-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: #050510;
  overflow: hidden;
  perspective: 1000px;
}

.mesh-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(at 0% 0%, rgba(0, 210, 255, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(157, 80, 187, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(255, 0, 127, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(0, 255, 255, 0.1) 0px, transparent 50%);
  filter: blur(40px);
}

.blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blob {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  transition: transform 0.2s ease-out;
  animation: float 20s infinite alternate ease-in-out;
}

.blob-1 {
  background: radial-gradient(
    circle,
    rgba(0, 210, 255, 0.6) 0%,
    transparent 70%
  );
  width: 600px;
  height: 600px;
  animation-duration: 25s;
}

.blob-2 {
  background: radial-gradient(
    circle,
    rgba(157, 80, 187, 0.5) 0%,
    transparent 70%
  );
  width: 500px;
  height: 500px;
  animation-delay: -5s;
  animation-duration: 30s;
}

.blob-3 {
  background: radial-gradient(
    circle,
    rgba(255, 0, 127, 0.4) 0%,
    transparent 70%
  );
  width: 700px;
  height: 700px;
  animation-delay: -10s;
  animation-duration: 35s;
}

.blob-4 {
  background: radial-gradient(
    circle,
    rgba(0, 255, 255, 0.3) 0%,
    transparent 70%
  );
  width: 450px;
  height: 450px;
  animation-delay: -15s;
  animation-duration: 20s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>
