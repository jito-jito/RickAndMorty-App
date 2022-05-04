<template>
  <div>
    <label 
      for="Input" 
      class="form-label">
      {{ title }}
    </label>
    <input 
      :value="modelValue"
      @input="onChangeValue"
      :type="type"
      class="input form-control"  
      aria-describedby="emailHelp"
    >
  </div>
</template>

<script>
import { toRefs } from "vue"

export default {
  props: ['type', 'title', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const { type, title, modelValue } = toRefs(props)


    function onChangeValue(event) {
      ctx.emit('update:modelValue', event.target.value)
    }
    return {
      type, 
      title, 
      modelValue,
      onChangeValue
    }
  }
}
</script>

<style lang="scss" scoped>
  input:focus {
    border-color: #343941;
    box-shadow: 0 0 0 0.25rem #293139;
  }
</style>