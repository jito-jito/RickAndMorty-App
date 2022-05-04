import { useCookies } from "vue3-cookies"

const { cookies } = useCookies()

function getCookie(name) {
  return cookies.get(name);
}

function createCookie(name, data) {
  cookies.set(name, data)
}

function deleteCookie(name) {
  cookies.remove(name)
}


export {
  getCookie,
  createCookie,
  deleteCookie
}