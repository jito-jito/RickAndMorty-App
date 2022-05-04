import axios from 'axios'

export async function getData(URL) {
  try {
    const response = await axios.get(URL)
    return response.data.results
  } catch (error) {
    throw error
  }

}