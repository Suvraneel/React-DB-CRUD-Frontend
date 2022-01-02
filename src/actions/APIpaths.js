import axios from 'axios'

const baseUrl = 'https://react-crud-suvraneel.herokuapp.com/'

export default {
    postMessage(url = baseUrl)
    {
        return{
            create: newRecord => axios.post(url,newRecord),
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            update: (id,updatedRecord) => axios.put(url+id,updatedRecord),
            delete: id => axios.delete(url +id)

        }
    }
}