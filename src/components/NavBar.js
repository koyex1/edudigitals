import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';


function NavBar(props) {
  //dispatch and select
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, error} = userSignin;

  const signoutHandler = () => {
    dispatch(signout());
    props.history.push('/');
    
  }
  useEffect(() => {
    
  }, [userInfo])

  return (

    
    
   

    <Fragment>
    <div className="nav_bar">
    <div className="toggle_icon">
    <i className='bx bx-menu'></i>
    <Link to="/">
    <img className="edu_icon" src= " ../images/icon.png" /> </Link>
    </div> 
    

  
    <div className="sign_in_up">
        <Link to="/search">Find a Tutor <i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/verifyuser">Verify Users<i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/signin"> Login <i className='bx bx-right-arrow-alt' ></i> </Link>
        <Link to="/register">Sign Up <i className='bx bx-right-arrow-alt' ></i> </Link>
    </div>

    <div className="users_nav"> 
        
        <a><i className='users_logo bx bx-mail-send'></i></a>
        <div className="dropdown_box">
        <a><i className='users_logo bx bx-user-circle' ></i></a>
        <div className="dropdown_content">
        {userInfo && (<Link to={`/profileedit/${userInfo.firstName}-${userInfo.lastName}`}> Edit Profile <i className='bx bx-right-arrow-alt' ></i> </Link>)}

            <Link onClick={signoutHandler} >Logout</Link>
        </div>
        </div>
    </div>


    </div>
{
  userInfo 
  &&
  (  <div className="greeting"> 
      {userInfo.firstName} {userInfo.lastName}
    </div>)
}
    </Fragment>



  )
}

export default NavBar
