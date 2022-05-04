<template>
  <div class="body-container">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { useCookies } from "vue3-cookies"
import { onBeforeMount } from 'vue'
import decodeJwt from '@/utils/auth/decodeJwt'
import validateToken from '@/utils/auth/validateToken'
import { useUserStore } from '@/stores/userStore'

export default {
  components: {
    RouterView
  },
  setup() {
    const userStore = useUserStore()
    const { cookies } = useCookies()

    onBeforeMount(async function() {
      let cookie = cookies.get("cookie")
      if(!cookie) {
        return
      }

      const decodedToken = decodeJwt(cookie.token)
      const isValidToken = validateToken(decodedToken)

      if(!isValidToken) {
        cookies.remove("cookie")
      } else {
        userStore.saveUserData({
          userName: decodedToken.userName,
          email: decodedToken.email,
          favorites: cookie.favorites
        })
      }
    })
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/Variables.scss';

  body {
    background-image: url('@/assets/images/background.png');
    background-size: cover;
    color: $font-color;
  }
  .body-container {
    background-color: $bg-color;
  }

</style>
