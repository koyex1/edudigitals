import axios from "axios";
import { LOCALHOST } from "../constants/constants";



export const  paymentSuccessful = async (paymentInfo) => {
 const {data} = await axios.post(`${LOCALHOST}/api/payment/add`, paymentInfo)
    console.log(data)
    return data;

}