import { io } from 'socket.io-client';

//const endpoint = 'https://edudigital.herokuapp.com'
const endpoint = 'http://localhost:5000/'
let socket = io(endpoint)

if(JSON.parse(localStorage.getItem('userInfo'))){
    
  socket = io(endpoint,
    {
        transports: ['websocket'],
        upgrade: false,
        query: {'user' : JSON.parse(localStorage.getItem('userInfo'))._id}
    }
    );
}

export default socket;