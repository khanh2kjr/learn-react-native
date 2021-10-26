import axios from 'axios'
const URL = 'http://192.168.1.106:3000/api'

const httpRequest = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

httpRequest.interceptors.request.use(
    (config) => config,
    (err) => Promise.reject(err)
)

httpRequest.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
)

export default httpRequest
