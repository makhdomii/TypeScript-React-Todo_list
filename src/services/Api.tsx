import Axios from 'axios'
// const serverUrl = 'http://localhost:5000/'
const serverUrl = 'http://217.79.183.46:3000/'

class API {
    public static get = async (url = '') => {
        const result = await Axios.get(serverUrl + url)
        return result
    }
    public static post = async (url = '', data: any = {}) => {
        const result = await Axios.post(serverUrl + url, data)
        return result
    }
}

export default API