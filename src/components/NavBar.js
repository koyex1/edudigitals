import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';
import { Menu } from 'antd';
import {UnorderedListOutlined } from '@ant-design/icons';
import { IconContext } from 'react-icons';
import './Navbar.css';

const { SubMenu } = Menu;

function NavBar(props) {
  //dispatch and select
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, error} = userSignin;
  const {nav, setNav} = useState({ current: 'mail' })


  const signoutHandler = () => {
    dispatch(signout());
    props.history.push('/');
    
  }

 
  useEffect(() => {
    
  }, [userInfo])


  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (

    <Fragment>
    <div className="nav_bar">
    <div className="toggle_icon">
    <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
          <i className='bx bx-menu'  onClick={showSidebar} ></i>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
              <i class='bx bx-x'></i>
              </Link>
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
    {/* <Link to="/">
    <img className="edu_icon" src= " ../images/icon.png" /> </Link> */}
    </div> 
    {/*-----------------second toggle button*/}
   


{/*   
    <div className="sign_in_up">
        <Link to="/search">Find a Tutor <i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/reverify">Reverify <i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/verifyuser">Verify Users<i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/signin"> Login <i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/register">Sign Up <i className='bx bx-right-arrow-alt' ></i> </Link>
    </div> */}
<div class="edu_account_box">
    <div className="users_nav"> 
        
        <Link><i className='users_logo bx bx-mail-send'></i></Link>
        <div className="dropdown_box">
        <Link><i className='users_logo bx bx-user-circle' ></i></Link>

        <div className="dropdown_content">
        {userInfo && (<Link className="edu_link_account" to={`/profileedit/${userInfo.firstName}-${userInfo.lastName}`}> <i class='bx bx-info-square' ></i> Edit Profile </Link>)}
        <Link className="edu_link_account" onClick={signoutHandler} ><i className='bx bx-log-out' ></i>Logout</Link>
        </div>

        </div>

    </div>
    <div className="edu_user_name">
    {userInfo && userInfo.firstName && (<p>Hi {userInfo.firstName}</p>) }
    </div>
</div>

    </div>
    </Fragment>



  )
}

export default NavBar
