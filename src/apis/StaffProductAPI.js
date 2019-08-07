import axios from 'axios';

// Ref: https://www.youtube.com/watch?v=ZA7VP5Iehk4
export default axios.create({
    baseURL: 'http://localhost:44358'
})