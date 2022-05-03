<template>
  <div class="card h-100 text-start border-dark rounded-3 shadow-sm">
    <div class="card-container row g-0">
      <div class="image-container col-4">
        <img :src="character.image" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-6">
        <div class="card-body py-2">
          <h5 class="card-title">{{character.name}}</h5>
          <h6 class="card-subtitle mb-2">{{character.status}} - {{character.species}} - {{character.gender}}</h6>
          <div class="card-content container">
            <p>origin: {{character.origin.name}}</p>
            <p>found in episode: 1</p>
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center">
        <div class="checkbox">
          <input 
          type="checkbox" 
          class="btn-check" 
          :id="checkboxId" 
          autocomplete="off"
          checked 
          >
          <label 
            class="btn btn-primary" 
            :for="checkboxId">Add</label>
          <!-- <IconStar
            :style="{'fill': color}"
          /> -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import IconStar from '@/components/icons/IconStar.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { reactive, computed, toRef, toRefs, onMounted } from 'vue'


export default {
  props: ['character', 'id'],
  setup(props) {
    const { character, id }= toRefs(props)

    const state = reactive({
      isFavorite: false,
      color: 'yellow'
    })

    function toggleFavorites(e) {
      console.log(e)
      state.isFavorite = !state.isFavorite
      state.color = state.color === 'black' ? 'yellow' : 'black'
    }

    const checkboxId = computed(() => {
      return `btn-check-${id.value}`
    })

    // onMounted(function () {
    //   //inti Popover
    //   Array.from(document.querySelectorAll(`button[data-bs-toggle="popover"]`))
    // .forEach(popoverNode => new Popover(popoverNode))
    // }) 

    return {
      character,
      checkboxId
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Variables.scss';
  .card {
    max-width: 370px;
    background-color: $card-color;

    &-container {
      height: 100%;
    }

    &-content > p {
      margin-bottom: 0
    }
  }

  .image {
    &-container {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        height: 100%;
      }
    }
  }

  .checkbox {
    // input {
    //   display: none;
    // }
  }

</style>