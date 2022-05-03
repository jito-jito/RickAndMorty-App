<script setup>
const props = defineProps(['type', 'id', 'onClick'])

console.log(props)
</script>

<template>
  <button 
    @click="(e) => onClick(e)"
    class="btn btn-outline-secondary" 
    type="{{ props.type }}" id="{{ props.id }}"
  >
    <slot/>
  </button>
</template>