import { boot } from 'quasar/wrappers'
import { StatusBar } from '@capacitor/status-bar'
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar'
import { Capacitor } from '@capacitor/core'

export default boot(async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await StatusBar.setBackgroundColor({ color: '#f0f0f0' })
      await NavigationBar.setTransparency({
        isTransparent: true
      })
      // StatusBar.setStyle({ style: Style.Light })
    } catch (e) {
      alert(e)
    }
  }
})
