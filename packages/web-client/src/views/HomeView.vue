<template>
  <Layout>
    <main class="view">
      <h1>Rick y Morty Search</h1>
      <h2>find your favorite characters</h2>
      <Search
        @onSearchCharacters="searchCharacters"

      />
      <div class="results mt-4">
        <div 
          v-show="characters.loading"
          class="spinner-border text-light" 
          role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        <h4 v-show="characters.error">error in get characters, please try again later</h4>

        <template
          v-if="characters.data.length > 0 ? true : false"
        >
          <div class="characters-container">
            <CharacterItem
              v-for="character in characters.data"
              :key="character.id"
              :id="character.id"
              :character="character"
            />
          </div>
        </template>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/containers/Layout.vue'
import Search from '@/components/Search.vue'
import CharacterItem from '@/components/CharacterItem.vue'
import { reactive, onBeforeMount } from 'vue'
import { getData } from '@/utils/getData'

export default {
  components: {
    Layout,
    Search,
    CharacterItem
  },
  setup() {
    const characters = reactive({
        loading: false,
        error: false,
        data: []
    })


    onBeforeMount(async function() {
      try {
        characters.loading = true
        const response = await getData('http://localhost:5000/api/characters/random')
        characters.loading = false
        characters.data = response

      } catch (error) {
        characters.loading = false
        characters.error = true
      }
    })

    async function searchCharacters(event) {
      try {
        characters.data = []

        const nameQuery = event.value.length > 2 ? `name=${event.value}&` : ''
        const genderQuery = event.genderOption.length > 0 ? `gender=${event.genderOption}&` : ''
        const statusQuery =  event.statusOption.length > 0 ? `status=${event.statusOption}&` : ''

        characters.loading = true

        const response = await getData(`http://localhost:5000/api/characters?${nameQuery}${genderQuery}${statusQuery}`)

        characters.loading = false
        characters.data = response
      } catch (error) {
        characters.loading = false
        characters.error = true
      }
    }

    return {
      characters,
      searchCharacters
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/Variables.scss';
  
  .view {
    @include display-flex-center;
    justify-content: flex-start;
    flex-direction: column;
    height: $main-height;
    padding-top: 15px;
    background-color: $bg-color;
  }

  .results {
    @include display-flex-center;
    height: 50vh;
  }

  .characters-container {
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 20px;
    height: 50vh;
    overflow-y: scroll;

    & > div {
      justify-self: center;
    }

    @media screen and (min-width: 700px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
