import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';
import { Alert, Menu ,  Badge} from 'antd';
import {UnorderedListOutlined } from '@ant-design/icons';
import { IconContext } from 'react-icons';
import { io } from 'socket.io-client';
import './Navbar.css';
import { firstToUpper, pageLang } from '../data/data';
import socket from '../Config/socketConfig'
import { newMessage } from '../actions/chatActions';
 

const { SubMenu } = Menu;

function NavBar(props) {
  //dispatch and select
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const cartInfo = useSelector(state => state.cartInfo);
  const {userInfo, error} = userSignin;
  const {nav, setNav} = useState({ current: 'mail' })
  const [refresh, setRefresh] = useState(0)
  //const [cart, setCart] = useState(0)
  const[lang, setLang] = useState();
  const[message, setMessage] = useState();
  const[notificationNo, setNotificationNo] = useState();
  const messageNo = useSelector
  (state => state.messageNo)


  useEffect(() => {
    if(userInfo && userInfo._id){
    //only gets called to show me the number of unread messages when i logg in
    socket.emit('justLoggingIn', userInfo._id)
    socket.on('loggedInNo', data =>{
      dispatch(newMessage(data));
    })}
  }, [userInfo, messageNo]) 


  const handleChange = (event)=>{
      localStorage.setItem('lang', event.target.value)
     
      window.location.reload();
  }


  const signoutHandler = () => {
    socket.emit('offline', ()=>{})
    dispatch(signout());
    props.history.push('/');
  }


console.log('message number ' + messageNo)
  console.log('you dey here? abeg dey o')
  console.log('cart info length' + cartInfo.length)

  // useEffect(() => {
  //   setCart(localStorage.getItem('edudigital_cart')?JSON.parse(localStorage.getItem('edudigital_cart')).length: 0)
  // }, [cartInfo])

 
  useEffect(() => {

    for(let i in pageLang){
      if( Object.keys(pageLang[i])[0] == localStorage.getItem('lang')){
        setLang(pageLang[i][localStorage.getItem('lang')])
      }
      
    }
    
  }, [])


  

  useEffect(() => {
    socket.emit('notification',userInfo && userInfo._id)  
    socket.on('notificationNo', data =>{
      setNotificationNo(data)
    })
  }, [messageNo, notificationNo])


  useEffect(() => {
    if(userInfo && userInfo.role=='pending'){
    setMessage('Please wait patiently while we verify your details within 24hours')
    }
    else if(userInfo && userInfo.role == 'user'){
      setMessage('You did not pass the verification requirement please go to REVERIFY to resubmit your details')
    }
  }, [userInfo])


  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (

    <>
    <div className="nav_bar">
    <div className="toggle_icon">
    <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div className='menu-bars'>
          <i className='bx bx-menu'  onClick={showSidebar} ></i>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <div className='menu-bars'>
              <i class='bx bx-x'></i>
              </div>
            </li>
            <li  className="nav-text">
                  <Link to="/">
                  <i class='bx bx-home'></i>
                    <span>Home</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/search">
                  <i class='bx bx-file-find' ></i>
                    <span>Find a Tutor</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/reverify">
                  <i class='bx bx-question-mark'></i>
                    <span>Reverify</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/verifyuser">
                  <i class='bx bx-show-alt'></i>
                    <span>Verify Users</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/bookmarked">
                  <i class='bx bxs-bookmark-plus' ></i>
                    <span>Bookmarked for Later</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/ongoingsession/tutors">
                  <i class='bx bx-time-five'></i>
                    <span>Ongoing session(Student's Acct)</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/ongoingsession/students">
                  <i class='bx bx-time-five'></i>
                    <span>Ongoing session(Tutor's Acct)</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/vetUsers">
                  <i class='bx bx-time-five'></i>
                    <span>Vet Payments</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/signin">
                  <i class='bx bx-log-in'></i>
                    <span>Login</span>
                  </Link>
                </li>

                <li  className="nav-text">
                  <Link to="/register">
                  <i class='bx bx-door-open'></i>
                    <span>Sign Up</span>
                  </Link>
                </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div> 
   
<div class="edu_account_box">

    <div className="users_nav"> 
    <select className="lang_select" value={localStorage.getItem('lang')} onChange={handleChange}>
         {pageLang.map((lang)=>(<option value={Object.keys(lang)[0]}>{lang[Object.keys(lang)[0]]}</option>) )}
</select>
    <Badge  count={notificationNo} offset={[-12, -1]}>
    <Link to='/notification' ><i class='users_logo bx bxs-bell' ></i> </Link>
    </Badge>
    <Badge  count={messageNo} offset={[-12, -1]}>
        <Link to='/conversations' ><i className='users_logo bx bx-mail-send'></i></Link>
        </Badge>
        <Badge  count={cartInfo.length} offset={[-12, -1]}>
        <Link to='/cart' ><i class='users_logo bx bx-cart-alt'></i> </Link>
        </Badge>
        {userInfo && userInfo._id &&
        <div className="dropdown_box">
        <Link><i className='users_logo bx bx-user-circle' ></i></Link>

        <div className="dropdown_content">
        
        <Link className="edu_link_account" to={`/profileedit/${userInfo.firstName}-${userInfo.lastName}`}> 
        <i class='bx bx-info-square' ></i> Edit Profile 
        </Link>
        <Link className="edu_link_account" onClick={signoutHandler} ><i className='bx bx-log-out' ></i>Logout</Link>
        </div>

        </div>
      }

    </div>
    <div className="edu_user_name">
    {userInfo && userInfo.firstName && (<p>Hi {firstToUpper(userInfo.firstName)}</p>) }
    </div>
</div>

    </div>

    {userInfo && (userInfo.role =='pending' || userInfo.role =='user') && <div className="bold_font">
          <Alert
          showIcon
          type = "warning"
          message = {message}
          />
    </div>}
    </>



  )
}

export default NavBar
