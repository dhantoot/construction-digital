import { setCssVar } from 'quasar'
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  setCssVar('primary', '#14252C')
  setCssVar('secondary', '#273C41')

  setCssVar('info', '#45575B')
  setCssVar('positive', '#A3A39B')

  setCssVar('warning', '#E6CAB3')
  setCssVar('negative', '#82401D')

  setCssVar('accent', '#EDE1D2')
})