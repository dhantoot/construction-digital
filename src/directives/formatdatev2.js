// directives/formatdate.js
import { date } from 'quasar'

const dateformat = 'MMM DD, YYYY HH:mm A'
const formatdate = {
  mounted (el, binding) {
    el.innerText = date.formatDate(binding.value, dateformat)
  },
  updated (el, binding) {
    el.innerText = date.formatDate(binding.value, dateformat)
  }
}

export default formatdate
