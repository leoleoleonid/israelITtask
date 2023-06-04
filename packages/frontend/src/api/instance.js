import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:1234/',
    withCredentials: true,
    headers: {
        accept: 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSm9obiBEb2UiLCJpYXQiOjE2ODU4MzQ5ODh9._4W03xNfaLIjeiT_aNmQ3wH90FAVeWlQsCHJlyTwt7M'
    }
})

export default instance