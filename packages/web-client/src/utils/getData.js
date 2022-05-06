import axios from 'axios'

export async function getData(URL) {
  try {
    const response = await axios({
      method: 'get',
      url: URL,
      headers: {
        'Access-Control-Allow-Origin': `${import.meta.env.VITE_APP_URL}`
      }
    })
    return response.data.results
  } catch (error) {
    throw error
  }

}