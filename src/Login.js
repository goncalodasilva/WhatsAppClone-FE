import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebaseConfig';
import "./Login.css";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result =>
                console.log(result)
            )
            .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img
                    src="https://logospng.org/download/whatsapp/logo-whatsapp-1024.png"
                    alt=""
                />
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
