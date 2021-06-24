import './App.css';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import ForgottenPasswordScreen from './screens/ForgottenPasswordScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import AdminRegisterScreen from './screens/AdminRegisterScreen';
import AdminSigninScreen from './screens/AdminSigninScreen';
import VerifyUserScreen from './screens/VerifyUserScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import ChatScreen from './screens/ChatScreen';
import ConversationScreen from './screens/ConversationScreen';
import ReverificationScreen from './screens/ReverificationScreen';
import BookmarkedScreen from './screens/BookmarkedScreen';
import OngoingLessonScreen from './screens/OngoingLessonScreen';
import ReviewScreen from './screens/ReviewScreen';
import CartScreen from './screens/CartScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import AdminPanelScreen from './screens/AdminPanelScreen'
import NewPasswordScreen from './screens/NewPasswordScreen'
import VettingScreen from './screens/VettingScreen'
import NotificationScreen from './screens/NotificationScreen'
import CheckEmailScreen from './screens/CheckEmailScreen'
import TestScreen from './screens/TestScreen';
import 'antd/dist/antd.css'; 
import OngoingTutorsScreen from './screens/OngoingTutorsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { newMessage } from './actions/chatActions';
import socket from './Config/socketConfig'
import { message } from 'antd';
import { loginMessage } from './actions/userActions';







function App() {
  const dispatch = useDispatch();
  var userSignin = useSelector(state => state.userSignin)
  var hideNavBar = useSelector(state => state.hideNavBar)
  const {userInfo} = userSignin;
  const messageNo = useSelector(state => state.messageNo)
  var cantLogin = useSelector(state => state.cantLogin)



useEffect(() => {
  if(cantLogin){
    message.info(cantLogin)
    dispatch(loginMessage(''))
   }
}, [cantLogin, dispatch])

  useEffect(() => {
    if(userInfo && userInfo._id){
      //only gets called to show the number of unread messages when the sender hits send on his end
      }
  }, [dispatch, userInfo])


  return (
    <>
    <BrowserRouter>
  
   

    <div className="edu_body_child" >


      <header className={hideNavBar && 'previews_hidden'} ><Route component={NavBar} ></Route>
</header>
      <main>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/signin" component={SigninScreen} ></Route>
      <Route path="/register" component={RegisterScreen} ></Route>
      <Route path="/forgottenpassword" component={ForgottenPasswordScreen} ></Route>
      <Route path="/search/:search?" exact component={SearchScreen} ></Route>
      <Route path="/adminregister" component={AdminRegisterScreen} ></Route>
      <Route path="/adminsignin" component={AdminSigninScreen} ></Route>
      <Route path="/verifyuser" component={VerifyUserScreen} ></Route>
      <Route path="/profile" component={ProfileScreen} ></Route>
      <Route path="/profileedit/:id" component={ProfileEditScreen} ></Route>
      <Route path="/reverify" component={ReverificationScreen} ></Route>
      <Route path="/conversations" component={ConversationScreen} ></Route>
      <Route path="/bookmarked" component={BookmarkedScreen} ></Route>
      <Route path="/ongoingsession/tutors" component={OngoingLessonScreen} ></Route>
      <Route path="/review/:id" component={ReviewScreen} ></Route>
      <Route path="/chat" component={ChatScreen} ></Route>
      <Route path="/cart" component={CartScreen} ></Route>
      <Route path="/emailVerification/:id" component={EmailVerificationScreen} ></Route>
      <Route path="/adminpanel" component={AdminPanelScreen} ></Route>
      <Route path="/newpassword/:id" component={NewPasswordScreen} ></Route>
      <Route path="/ongoingsession/students" component={OngoingTutorsScreen} ></Route>
      <Route path="/vetUsers" component={VettingScreen} ></Route>
      <Route path="/notification" component={NotificationScreen} ></Route>
      <Route path="/checkEmail" component={CheckEmailScreen} ></Route>
      <Route path="/test" component={TestScreen} ></Route>
      </main> 
      <footer><Route exact path={["/", "/test"]}><Footer/></Route></footer>
 
      </div>



    </BrowserRouter>
    </>
  );
}

export default App;
