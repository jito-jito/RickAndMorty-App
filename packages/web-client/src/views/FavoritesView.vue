<template>
  <Layout>
    <h1>Hello {{userStore.userName}}</h1>
    <h3>see your favorite characters</h3>
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
          <template v-for="character in characters.data">
            <CharacterItem
              v-if="isFavorite(character.id)"
              :key="character.id"
              :id="character.id"
                :character="character"
           />
          </template>
        
        </div>
      </template>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/containers/Layout.vue'
import CharacterItem from '@/components/CharacterItem.vue'
import { useUserStore } from '../stores/userStore'
import { getCookie, deleteCookie } from '@/utils/auth/cookie'
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { storeToRefs } from 'pinia'

export default {
  components: {
    Layout,
    CharacterItem
  },
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const characters = reactive({
        loading: false,
        error: false,
        data: []
    })
    const { favorites } = storeToRefs(userStore)

    function isFavorite(id) {
      return favorites.value.some(favoriteId => favoriteId === id)
    }

    onBeforeMount(async function() {
      try {
        characters.loading = true
        const response = await await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/users/favorites`,
            headers: {
              'Authorization': `Bearer ${getCookie('cookie').token}` 
            }
          })
        characters.loading = false
        characters.data = response.data.data

      } catch (error) {
        if(!userStore.hasUser) {
          router.push('/')
        }
        if(error.response?.status === 401) {
          deleteCookie('cookie')
          router.go('/')
        }
     
        characters.loading = false
        characters.error = true
      }
    })
    
    return {
      userStore,
      characters,
      favorites,
      isFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/Variables.scss';

  .results {
    @include display-flex-center;
    height: 60vh;
  }

  .characters-container {
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 20px;
    height: 60vh;
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