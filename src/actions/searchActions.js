import axios from "axios";
import { SEARCH_SUCCESS, SEARCH_REQUEST, SEARCH_FAIL} from "../constants/searchConstants";

//const endpoint = 'https://edudigital.herokuapp.com'
const endpoint = 'http://localhost:5000'



export const searchTutors = (search, currentPage, limit, language, country, rating, charge) => async(dispatch) =>{
dispatch({type: SEARCH_REQUEST});
try{
    const {data} = await axios.post(`${endpoint}/api/users/search`,{search, currentPage, limit, language, country, rating, charge});
		//action.type and action.payload
       // console.log(data);
    dispatch({type: SEARCH_SUCCESS, payload: data });
}catch(error){
	//action.type and action.payload
    dispatch({
        type: SEARCH_FAIL,
        payload: //i put the error in status 404 library so the long process to get to it
        error.response && error.response.data.message
        ?error.response.data.message  //error from data i put intentionally
        : error.message,        //error if i forgot to put an error message intentionally
    }
    )
}
}