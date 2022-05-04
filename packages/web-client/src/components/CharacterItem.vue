<template>
  <div class="card h-100 text-start border-dark rounded-3 shadow-sm">
    <div class="card-container row g-0">
      <div class="image-container col-4">
        <img :src="character.image" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-7">
        <div class="card-body py-2">
          <h5 class="card-title">{{character.name}}</h5>
          <h6 class="card-subtitle mb-2">{{character.status}} - {{character.species}} - {{character.gender}}</h6>
          <div class="card-content container">
            <p>Origin: {{character.origin.name}}</p>
            <p>Found in episode: {{characterEpisode}}</p>
          </div>
        </div>
      </div>
      <div class="col-1  d-flex align-items-center">
        <div 
          class="checkbox" 
          @click.stop="setFavorite(id)"
          :data-characterId="checkboxId">
          <input 
            class="d-none" 
            type="checkbox" 
             
            :id="checkboxId" 
            aria-label="..."
          >
          <IconStar
            
            :style="{'fill': state.color}"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import IconStar from '@/components/icons/IconStar.vue'
import { reactive, computed, toRefs, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import axios from 'axios'
import { getCookie, createCookie, deleteCookie } from '@/utils/auth/cookie'
import { useRouter } from 'vue-router'

export default {
  props: ['character', 'id'],
  components: {
    IconStar
  },
  setup(props) {
    const router = useRouter()
    const { character, id }= toRefs(props)
    const userStore = useUserStore()
    const state = reactive({
      isFavorite: false,
      color: 'black'
    })


    async function setFavorite(id) {
      try {
        if(userStore.userName) {
          let newFavorites = []
          if(state.isFavorite) {
            newFavorites = userStore.favorites.filter(favoriteId => favoriteId !== id)
            state.isFavorite = false
            state.color = 'black'
          } else {
            newFavorites = [...userStore.favorites, id]
            state.isFavorite = true
            state.color = 'yellow'
          }

          const response = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/users/favorites`,
            data: {
              favorites: newFavorites
            },
            headers: {
              'Authorization': `Bearer ${getCookie('cookie').token}` 
            }
          })
          
          const currentCookie = getCookie('cookie')
          createCookie('cookie', {
            token: currentCookie.token,
            favorites: response.data.data.favorites
          })
          userStore.favorites = response.data.data.favorites
          
        }
      } catch (error) {
        if(error.response.status === 401) {
          deleteCookie('cookie')
          router.go('/')
        }
      }
     
    }

    const checkboxId = computed(() => {
      return `btn-check-${id.value}`
    })

    const characterEpisode = computed(() => {
      const url = character.value.episode[0]
      let episode = ''

      for (let char = url.length - 1; char > 0; char--) {
        if(url[char] === '/') {
          break
        }
        episode = url[char] + episode
      }

      return episode
    })

    onMounted(function () {
      if(userStore.userName) {
        let isFavorite = userStore.favorites.some(favoriteId => favoriteId === id.value)
        if(isFavorite) {
          state.isFavorite = true
          state.color = 'yellow'
        }
      }
    }) 

    return {
      character,
      characterEpisode,
      checkboxId,
      id,
      state,
      setFavorite
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
    position: relative;
    right: 5px;

    &:hover {
      cursor: pointer;
    }
  }

</style>