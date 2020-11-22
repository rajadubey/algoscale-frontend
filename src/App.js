import React from 'react';
import logoImage from './images/logo.png';
import logoutImage from './images/logout.svg'
import './App.css';
import Login from "./components/login";
import Analytics from "./components/analytics";
import ContactUs from "./components/contactUs";
import {Switch, Route, Link} from 'react-router-dom';
function App(props) {
  const [appState, setAppState] = React.useState({
    isLoggedIn: false,
    email: '',
    name: ''
  });

  const handleUser = (response) =>{
    setAppState({isLoggedIn: true, email: response.email, name: response.name});

  }

  return (
    <div className="main-container">
      <div className='navbar'>
        <div className='logo'>
          <img src={logoImage} alt={'Algoscale-logo'} />
        </div>
        <div className='user-info'>
          <div className='nav-contact-us'>
              <Link to='/contactUs' >
                Contact Us
              </Link>
            </div>
          <div className='nav-analytics'>
            <Link to='analytics'>
              Analytics
            </Link>
          </div>
          <div className='nav-logout'>
            <img src={logoutImage} width={'40px'} height={'40px'} alt={'logout'} />
          </div>
        </div>
      </div>
      <div className='container'>
        <Switch>
          <Route path='/analytics' component={Analytics} />
          <Route path='/contactUs' render={(props)=><ContactUs user={appState} {...props}/>} />
          <Route path='/' render={(props)=><Login handleUser={handleUser} user={appState} {...props}/>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
