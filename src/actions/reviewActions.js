import axios from "axios";

const endpoint = 'http://localhost:5000'

export const  reviewPost = async (id, editedInfo) => {
    console.log(id)
    const {data} = await axios.post(`${endpoint}/api/review/add/${id}`, editedInfo)
    console.log(data)
    return data;

}

export const  getReviews = async (id, pageInfo) => {
    console.log(pageInfo)
    const {data} = await axios.post(`${endpoint}/api/review/get/${id}`,  pageInfo)
    console.log(data)
    return data;

}