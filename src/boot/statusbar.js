import { boot } from 'quasar/wrappers'
import { StatusBar } from '@capacitor/status-bar'
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar'
import { Capacitor } from '@capacitor/core'

export default boot(async ({ app }) => {
  if (Capacitor.isNativePlatform()) {
    app.config.globalProperties.$isCapacitorMode = true
    try {
      await StatusBar.setBackgroundColor({ color: '#f0f0f0' })
      await NavigationBar.setTransparency({
        isTransparent: true
      })
    } catch (e) {
      alert(e)
    }
  }
  else {
    app.config.globalProperties.$isCapacitorMode = false
  }
})
