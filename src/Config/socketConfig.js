import { io } from 'socket.io-client';
import { LOCALHOST } from '../constants/constants';


let socket = io(LOCALHOST)

if(JSON.parse(localStorage.getItem('userInfo'))){
    
  socket = io(LOCALHOST,
    {
        transports: ['websocket'],
        upgrade: false,
        query: {'user' : JSON.parse(localStorage.getItem('userInfo'))._id}
    }
    );
}

export default socket;