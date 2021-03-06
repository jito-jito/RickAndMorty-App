<template>
  <main class="view">
    <div class="form-container p-4 rounded-3">
      <RouterLink class="nav-link text-secondary" to="/">
        <h2 class="text-center mb-1">Rick & Morty App</h2>
      </RouterLink>
      <h3 class="text-center mb-2">Sign Up</h3>
      <form>
        <div class="mb-3">
          <Input 
            :modelValue="userData.name"
            @update:modelValue="newValue => userData.name = newValue"
            title="User Name"
            type="input"
          />
        </div>
        <div class="mb-3">
          <Input 
            :modelValue="userData.email"
            @update:modelValue="newValue => userData.email = newValue"
            title="Email"
            type="email"
          />
        </div>
        <div class="mb-3">
          <Input 
            :modelValue="userData.password"
            @update:modelValue="newValue => userData.password = newValue"
            title="Password"
            type="password"
          />
        </div>
        <Button
          @onClick="signUp"
          type="submit"
          id="signUp-button"
        >
          Sign Up
        </Button>

        <div 
          v-show="pageState.loading"
          class="loadingState spinner-border text-secondary mt-3" 
          role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div v-show="pageState.error">
          <p class="text-center my-2 text-danger">{{pageState.error}}</p>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
import decodeJwt from '@/utils/auth/decodeJwt'

export default {
  components: {
  Input,
  Button
  },
  setup() {
    const router = useRouter()
    const { cookies } = useCookies()

    const pageState = reactive({
      loading: false,
      error: false
    })
    const userData = reactive({
      name: '',
      email: '',
      password: ''
    })
    const userStore = useUserStore()

    function validateCredentials() {
      if(userData.name.length > 3 && userData.password.length > 5) {
        return true
      } else {
        return false
      }
    }

    async function signUp(e) {
      e.preventDefault();
      try {
        const areValidCredentials = validateCredentials()
        if(!areValidCredentials) {
          throw 'invalid credentials'
        }
        pageState.error = false
        pageState.loading = true
        const response = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_API_URL}/users/register`,
          data: {
            userName: userData.name,
            email: userData.email,
            password: userData.password
          },
          headers: {
            'Access-Control-Allow-Origin': `${import.meta.env.VITE_APP_URL}`
          }
        })

        cookies.set("cookie", response.data.access_token)

        const decodedToken = decodeJwt(response.data.access_token)
        userStore.saveUserData({
          userName: decodedToken.userName,
          email: decodedToken.email,
          favorites: decodedToken.favorites
        })
        pageState.loading = false

        router.push('/')
      } catch(error) {
        console.log(error)
        if(error.response?.status === 400) {
          pageState.loading = false
          pageState.error = 'User already created'
        } else {
          pageState.loading = false
          pageState.error = 'Invalid user credentials'
        }
       
      }
    }

    return {
      pageState,
      userData,
      signUp
    }
  }
}
</script>

<style lang="scss">
   @import '@/assets/styles/Variables.scss';
  
  .view {
    @include display-flex-center;
    flex-direction: column;
    height: 100vh;
    padding-top: 15px;
    background-color: $bg-color;
  }

  .form-container {
    background-color: $bg-color;

    form {
      @include display-flex-center;
      align-items: stretch;
      flex-direction: column;

      button {
        align-self: center;
      }

      .loadingState {
        align-self: center;
      }
    }
  }

</style>