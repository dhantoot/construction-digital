import { boot } from 'quasar/wrappers'
import { StatusBar } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'

export default boot(async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await StatusBar.setBackgroundColor({ color: '#000000' })
      // StatusBar.setStyle({ style: Style.Light })
    } catch (e) {
      alert(e)
    }
  }
})
