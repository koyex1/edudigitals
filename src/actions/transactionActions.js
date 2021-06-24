import axios from "axios";

const endpoint = 'http://localhost:5000'

export const ongoingTutors = async (userId) => {
    const {data} = await axios.get(`${endpoint}/api/payment/ongoingTutors/${userId}`)
    console.log(data)
    return data;

}

export const ongoingStudents = async (userId) => {
    const {data} = await axios.get(`${endpoint}/api/payment/ongoingStudents/${userId}`)
    console.log(data)
    return data;

}

export const updateAppeal = async (id,condition) => {
    const {data} = await axios.put(`${endpoint}/api/payment/appeal/${id}`, condition)
    console.log(data)
    return data;

}

export const updateComplete = async (id,condition) => {
    const {data} = await axios.put(`${endpoint}/api/payment/complete/${id}`, condition)
    console.log(data)
    return data;

}

export const allTransactions = async () => {
    const {data} = await axios.get(`${endpoint}/api/payment/getAll`)
    console.log(data)
    return data;

}

export const getNotification = async (id) => {
    const {data} = await axios.get(`${endpoint}/api/payment/notification/${id}`)
    console.log(data)
    return data;

}