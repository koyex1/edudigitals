import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import ForgottenPasswordScreen from './screens/ForgottenPasswordScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminRegisterScreen from './screens/AdminRegisterScreen';
import AdminSigninScreen from './screens/AdminSigninScreen';
import VerifyUserScreen from './screens/VerifyUserScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';







function App(props) {

  

  return (
    <BrowserRouter>
    <div >
      <header ><Route path="/" component={NavBar}/></header>


      <main>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/register" component={RegisterScreen} ></Route>
      <Route path="/signin" component={SigninScreen} ></Route>
      <Route path="/forgottenpassword" component={ForgottenPasswordScreen} ></Route>
      <Route path="/search" component={SearchScreen} ></Route>
      <Route path="/adminregister" component={AdminRegisterScreen} ></Route>
      <Route path="/adminsignin" component={AdminSigninScreen} ></Route>
      <Route path="/verifyuser" component={VerifyUserScreen} ></Route>
      <Route path="/profile/:id" component={ProfileScreen} ></Route>
      <Route path="/profileedit/:id" component={ProfileEditScreen} ></Route>








      </main>  



      <footer><Footer/></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;