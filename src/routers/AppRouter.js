import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { Loader } from '../components/loader/Loader';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './publicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setLoggedIn(true)


                dispatch(startLoadingNotes(user.uid))
            } else {
                setLoggedIn(false)
            }
            setChecking(false)

        })




    }, [dispatch])


    if (checking) {
        return <Loader message='loading ...wait a minute' />
    }
    return (
        <Router>
            <Switch>
                <PublicRoute path="/auth" component={AuthRouter} isAuth={loggedIn} />
                <PrivateRoute path="/" exact component={JournalScreen} isAuth={loggedIn} />
                <Redirect to="/auth/login" />

            </Switch>
        </Router>
    )
}
