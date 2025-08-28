import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.config.globalProperties.$isFalsyString = str => {
    if (
      str === null ||
      str === undefined ||
      str === '' ||
      str === false ||
      str === -1
    ) {
      return true
    } else {
      return false
    }
  }
})
