// directives/ellipsis.js
// import { Directive } from 'vue'

const ellipsis = {
  mounted (el, binding) {
    const text = el.textContent
    const maxLength = binding.value || 5

    if (text.length > maxLength) {
      el.textContent = text.substring(0, maxLength) + '...'
    }
  }
}

export default ellipsis
