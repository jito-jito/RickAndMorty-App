<script setup>
import { reactive, defineEmits } from 'vue'
    
const emit = defineEmits(['updateProp'])
const props = defineProps(['options'])

const selectOption = reactive({
  value: ''
})


function onChangeOption(e) {
  selectOption.value = e.target.value
  emit('updateProp', [props.options.default, selectOption.value])
}

</script>

<template>
  <select 
    @change="onChangeOption"
    class="form-select form-select-sm" 
    aria-label=".form-select-sm">
    <option selected value="">{{props.options.default}}</option>
    <template 
      v-for="(option, index) in props.options.alternatives"
      :key="index"
    >
      <option 
        :value="option"
      >
        {{option}}
      </option>
    </template>
  </select>
</template>

<style lang="scss" scoped>
  select:focus {
    border-color: #343941;
    box-shadow: 0 0 0 0.25rem #293139;
  }
</style>