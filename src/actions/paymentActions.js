import axios from "axios";

const endpoint = "http://localhost:5000"

export const  paymentSuccessful = async (paymentInfo) => {
 const {data} = await axios.post(`${endpoint}/api/payment/add`, paymentInfo)
    console.log(data)
    return data;

}