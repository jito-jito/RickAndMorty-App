<script setup>
import { reactive } from "@vue/reactivity"

const props = defineProps(['type', 'title', 'modelValue'])
defineEmits(['update:modelValue'])


console.log(props)
</script>

<template>
  <div>
    <label 
      for="Input" 
      class="form-label">
      {{ props.title }}
    </label>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="{{ props.type }}"
      class="form-control" 
      id="Input" 
      aria-describedby="emailHelp"
    >
  </div>
</template>