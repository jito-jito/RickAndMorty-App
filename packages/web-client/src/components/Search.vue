<template>
  <div class="container">
    <div class="input-group mb-3">
      <input 
        v-model="search.value"
        type="text" 
        class="input form-control" 
        placeholder="Recipient's username" 
        aria-label="Recipient's username" 
        aria-describedby="button-addon2"
      >
      <button 
        @click="searchCharacters"        
        class="btn btn-outline-secondary" 
        type="button" id="button-addon2"
      >
        Search
      </button>
    </div>
    <div class="filter-container">
      <p class="text-start">filter by:</p>
      <SelectButton
        @updateProp="updateProp"
        :options="{
          default: 'Gender',
          alternatives: ['Male', 'Female', 'Other']
        }"

      />
       <SelectButton
        @updateProp="updateProp"
        :options="{
          default: 'Status',
          alternatives: ['Dead', 'Alive', 'Other']
        }"
      />
    </div>
  </div>
</template>

<script>
import SelectButton from '@/components/buttons/SelectButton.vue'
import { reactive } from 'vue'

export default {
  components: {
    SelectButton
  },
  emits: ['onSearchCharacters'],
  setup(props, ctx) {
    const search = reactive({
      value: '',
      genderOption: '',
      statusOption: ''
    })

    function updateProp([propName, value]) {
      switch (propName) {
        case 'Gender':
          search.genderOption = value
          break;
        case 'Status':
          search.statusOption = value
          break;
        default:
          break;
      }
    }

    function searchCharacters() {
      ctx.emit('onSearchCharacters', search)
    }

    return {
      search,
      updateProp,
      searchCharacters
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/Variables.scss';
  
  .input:focus {
      border-color: #343941;
      box-shadow: 0 0 0 0.25rem #293139;
  }

  .container {
    width: 80%;

    @media screen and (min-width: 825px) {
      width: 50%;
    }
    @media screen and (min-width: 1200px) {
      width: 40%;
    }
  }

  .filter-container {
    @include display-flex-center;
    justify-content: space-evenly;

    & > p {
      margin: 0;
    }

    & > select {
      width: auto;
    }
  }
</style>