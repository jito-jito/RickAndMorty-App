<template>
  <button 
    @click="click"
    class="btn btn-outline-secondary" 
    :type="type" 
    :id="id"
  >
    <slot/>
  </button>
</template>

<script>
import { toRefs } from 'vue'

export default {
  props: ['type', 'id', 'onClick'],
  emits: ['onClick'],
  setup(props, ctx) {
    const { type, id } = toRefs(props)

    function click(event) {
      ctx.emit('onClick', event)
    }
    return {
      type,
      id,
      click
    }
  }
}
</script>