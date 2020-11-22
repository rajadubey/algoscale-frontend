import React from 'react';
import './style.css';
import FacebookLogin from 'react-facebook-login';
import {FB_APP_ID, GOOGLE_APP_ID} from '../data/keys'
import {GoogleLogin} from 'react-google-login';

export default function Login(props) {
    //const user = props.user;

    const loginResponse = (response) =>{
        //props.handleUser(response);
        props.history.replace('/contactUs');
    }

    return (
        <div className='login'>
            <p>{'Login'}</p>
          
            <FacebookLogin
                appId={FB_APP_ID}
                autoLoad={true}
                fields="name,email"
                callback={() =>loginResponse}          
            />

            <GoogleLogin 
            clientId={GOOGLE_APP_ID}
            onSuccess={()=>loginResponse}
            onFailure={()=>loginResponse} />
        </div>
    );
}
