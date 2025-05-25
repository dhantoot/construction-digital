import { setCssVar } from 'quasar'
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  setCssVar('primary', '#25252b')
  setCssVar('secondary', '#284239')
  setCssVar('accent', '#c0c1c3') // old accent: f7d793

  setCssVar('dark', '#1d1d1d')
  setCssVar('dark-page', '#121212')

  setCssVar('positive', '#05807c')
  setCssVar('negative', '#ce6025')
  setCssVar('info', '#1f3957')
  setCssVar('warning', '#e0b269')

  setCssVar('light', '#dfe1de')
  setCssVar('contrast', '#353535') // not working
})
