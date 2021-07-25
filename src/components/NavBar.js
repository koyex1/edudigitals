import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { signout } from '../actions/userActions';
import { Alert, Menu ,  Badge} from 'antd';
import {UnorderedListOutlined } from '@ant-design/icons';
import { IconContext } from 'react-icons';
import { io } from 'socket.io-client';
import './Navbar.css';
import { firstToUpper, pageLang } from '../data/data';
import socket from '../Config/socketConfig'
import { newMessage } from '../actions/chatActions';
import { motion } from 'framer-motion';
import { variants } from '../animation/variants';

 


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


  console.log('start')

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
  const [moveBar, setMoveBar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar)
    setMoveBar(!moveBar)

  };

  return (

    <>
    <div className="nav_bar">
    
    <div className="navBarFirst">
    <div className="toggle_icon">


        <motion.div  className='navbar  linkHoverFloralBack'>
          <motion.div whileHover={{scale:1.5 }}
          variants={variants.moveBarVariant}
          animate={moveBar ? "move":"initial"}
          className='menu-bars'  onClick={showSidebar} >
          <motion.span className='menu-span' variants={variants.hamBurgerVariant}
          animate={moveBar ? "anticlockwise":"initial"}></motion.span>

          <motion.span className='menu-span' variants={variants.hamBurgerVariant}
          animate={moveBar ? "hidden":"initial"}></motion.span>

          <motion.span className='menu-span' variants={variants.hamBurgerVariant}
          initial="initial"
          animate={moveBar ? "clockwise":"initial"}></motion.span>
          </motion.div>
        </motion.div>


        <motion.nav  variants={variants.navMenuVariant} initial='initial' animate={moveBar ? "move" :"initial"} className={'nav-menu'}>
          <motion.ul variants={variants.navMenuVariant} initial='initial' animate={moveBar ? "move" :"initial"}  className='nav-menu-items ' onClick={showSidebar}>
            
            <motion.li transition= {{duration: 1}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text ">
                  <Link className="Cursor" to="/">
                 <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.5 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink">Home</motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text">
                <Link className="pointerCursor" to="/search">
                  <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.5 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink"> Find a Tutor</motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text">
                <Link className="pointerCursor" to="/reverify">
                  <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.6 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink"> Reverify</motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text">
                <Link className="pointerCursor" to="/verifyuser">
                  <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.6 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink"> Verify Users</motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"}  className="nav-text">
                <Link className="pointerCursor" to="/bookmarked">
                  <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.7}} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink">Bookmarked for Later</motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"}  className="nav-text">
                <Link className="linkCursor"to="/ongoingsession/tutors">
                <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color: ['#c83737', '#060b26'] }} transition= {{duration: 0.7 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink">Ongoing session(Student's Acct)</motion.div>
                  </Link>
                </motion.li>

                <motion.li  transition= {{duration: 1.2 }} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text">
                <Link className="pointerCursor"  to="/ongoingsession/students">
                  <motion.div  variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26']}} transition= {{duration:0.8 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink"> Ongoing session(Tutor's Acct) </motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1.4}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"}  className="nav-text">
                <Link className="pointerCursor" to="/vetUsers">
                  <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.8 }} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink">  Vet Payments</motion.div>
                  </Link>
                </motion.li>

                <motion.li transition= {{duration: 1.6}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text">
                <Link className="pointerCursor" to="/signin">
                  <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.9}} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink">Login</motion.div>
                  </Link>
                </motion.li>

                <motion.li  transition= {{duration: 1.8}} variants={variants.navLinkVariant} initial='initial' animate={moveBar ? "move" :"initial"} className="nav-text">
                <Link className="pointerCursor" to="/register">
                    <motion.div variants={variants.linkColorVariant} whileHover={{scale:1.2, color:  ['#c83737', '#060b26'] }} transition= {{duration: 0.9}} className="pointer linkBlue linkHoverFloral font_Cabin centralizeNavLink" >Sign Up</motion.div>
                  </Link>
                </motion.li>
          </motion.ul>
        </motion.nav>
    </div> 
   
<div class="edu_account_box">

    <div className="users_nav"> 
    <select className="lang_select" value={localStorage.getItem('lang')} onChange={handleChange}>
         {pageLang.map((lang)=>(<option value={Object.keys(lang)[0]}>{lang[Object.keys(lang)[0]]}</option>) )}
</select>
    <Badge  count={notificationNo} offset={[-12, -1]}>
    <Link  to='/notification' ><motion.i whileHover={{scale: 1.5}} class='linkHoverFloral users_logo bx bx-bell' ></motion.i> </Link>
    </Badge>
    <Badge  count={messageNo} offset={[-12, -1]}>
        <Link to='/conversations' ><motion.i whileHover={{scale: 1.5}} class='linkHoverFloral bx bx-message'></motion.i></Link>
        </Badge>
        <Badge  count={cartInfo.length} offset={[-12, -1]}>
        <Link to='/cart' ><motion.i whileHover={{scale:1.5 }} class='linkHoverFloral users_logo bx bx-cart-alt'></motion.i> </Link>
        </Badge>
        {userInfo && userInfo._id &&
        <div className="dropdown_box">
        <Link><i className='linkHoverFloral users_logo bx bx-user-circle' ></i></Link>

        <div className="dropdown_content">
        
        <Link className="edu_link_account" to={`/profileedit/${userInfo.firstName}-${userInfo.lastName}`}> 
         Edit Profile 
        </Link>
        <Link className="edu_link_account" onClick={signoutHandler} >Logout</Link>
        </div>

        </div>
      }

    </div>
   
</div>

</div>
<div className="edu_user_name">
    {userInfo && userInfo.firstName && (<motion.p  variants={variants.userNameVariant}
    initial= "initial" animate="move">Hi {firstToUpper(userInfo.firstName)}</motion.p>) }
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
