import axios from "axios";
import { LOCALHOST } from "../constants/constants";



export const  reviewPost = async (id, editedInfo) => {
    console.log(id)
    const {data} = await axios.post(`${LOCALHOST}/api/review/add/${id}`, editedInfo)
    console.log(data)
    return data;

}

export const  getReviews = async (id, pageInfo) => {
    console.log(pageInfo)
    const {data} = await axios.post(`${LOCALHOST}/api/review/get/${id}`,  pageInfo)
    console.log(data)
    return data;

}