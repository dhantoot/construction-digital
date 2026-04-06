<template>
  <div
    class="row hide-scrollbar"
    :style="{ height: $q.screen.lt.sm ? 'auto' : '94.5vh;' }"
  >
    <div class="row full-width full-height q-pa-sm">
      <q-card class="full-width round-panel no-shadow">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">Application Settings</div>

          <q-list padding class="text-accent full-width">
            <q-item-label header class="text-bold text-primary"
              >General</q-item-label
            >

            <q-item v-ripple tag="label">
              <q-item-section side top>
                <q-checkbox
                  v-model="showTooltips"
                  dense
                  keep-color
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  :class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
                  >Show Tooltips</q-item-label
                >
                <q-item-label
                  caption
                  :class="$q.dark.isActive ? 'text-accent' : 'text-grey'"
                >
                  Show labels when hovering over sidebar icons in mini mode
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item-label header class="text-bold text-primary"
              >Appearance</q-item-label
            >

            <q-item v-ripple tag="label">
              <q-item-section side top>
                <q-checkbox
                  v-model="isDark"
                  dense
                  keep-color
                  color="primary"
                  @update:model-value="toggleDarkMode"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  :class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
                  >Dark Mode</q-item-label
                >
                <q-item-label
                  caption
                  :class="$q.dark.isActive ? 'text-accent' : 'text-grey'"
                >
                  Switch between light and dark themes
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-inner-loading :showing="visible">
          <q-spinner-ios size="50px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useQuasar, LocalStorage } from 'quasar'

export default {
  title: 'Settings',
  setup() {
    const $q = useQuasar()
    const visible = ref(false)
    const showTooltips = ref(true)
    const isDark = ref(false)

    onMounted(() => {
      // Load initial state
      const storedTooltip = LocalStorage.getItem('showTooltips')
      showTooltips.value = storedTooltip !== null ? storedTooltip : true

      isDark.value = $q.dark.isActive
    })

    watch(showTooltips, val => {
      LocalStorage.set('showTooltips', val)
      // Dispatch event for other components to react
      window.dispatchEvent(
        new CustomEvent('settings-changed', { detail: { showTooltips: val } })
      )
    })

    const toggleDarkMode = val => {
      $q.dark.isActive = val
      // Layout handles persistence usually, but we can set it here too if needed.
      // For now, relies on Quasar's global state or whatever mechanism Layout uses.
      // Assuming Layout watches $q.dark.isActive or we trigger a layout update.
      // Layout seems to control it via its own toggle. We might need a store for global sync.
      // For this task, we focus on Tooltips.
    }

    return {
      visible,
      showTooltips,
      isDark,
      toggleDarkMode
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-height: 807px;
}
</style>
