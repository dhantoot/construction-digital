// directives/formatdate.js
import { date } from 'quasar'

const formatdate = {
  mounted (el, binding) {
    const text = el.textContent
    // const dateformat = binding.value || 'MMM DD, YYYY HH:mm A'
    const dateformat = binding.value || 'MMM DD, YYYY'

    if (text.length) {
      el.textContent = date.formatDate(text, dateformat)
    }
  }
}

export default formatdate
