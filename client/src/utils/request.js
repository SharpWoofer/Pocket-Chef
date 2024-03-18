import axios from "axios"

const request = axios.create({
  baseURL: 'http://localhost:5000'
})

request.interceptors.response.use(
  config => {
    return config
  }
)

export default request
