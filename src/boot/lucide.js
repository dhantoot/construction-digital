import { boot } from 'quasar/wrappers'
import * as lucide from 'lucide-vue-next'

export default boot(({ app }) => {
  for (const [key, component] of Object.entries(lucide)) {
    app.component(key, component)
  }
})
