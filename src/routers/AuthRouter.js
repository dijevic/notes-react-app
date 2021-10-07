import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth_background  ">
                <h2 >Welcome Back</h2>
            </div>
            <div className="auth_container">
                <div className="auth_box pulse">
                    <Switch>
                        <Route path="/auth/login" component={Login} />
                        <Route path="/auth/register" component={Register} />
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>

            </div>
        </div>

    )
}
