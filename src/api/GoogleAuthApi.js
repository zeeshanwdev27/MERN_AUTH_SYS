import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api"
})


export const googleAuth = (code)=> api.get(`/google?code=${code}`)