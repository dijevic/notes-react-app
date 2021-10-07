import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth"
import Swal from 'sweetalert2'
import { types } from "../tipos/types"
import { googleAuthProvider } from "../firebase/firebaseConfig"
import { finishLoading, removeErrorAction, startLoading } from "./ui"



export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const logOut = () => {
    return {
        type: types.logOut
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))

            }).catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'something went wrong with your password or user',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }).finally(() => {
                dispatch(finishLoading())
            })



    }
}

export const startRegisterWithEmailPassword = (email, password, name) => {


    return (dispatch) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {

                await updateProfile(user, { displayName: name })
                dispatch(login(user.uid, user.displayName))
                dispatch(removeErrorAction())
                console.log(user)
            }).catch(err => Swal.fire({
                title: 'Error!',
                text: 'email-already-in-use',
                icon: 'error',
                confirmButtonText: 'Cool'
            }))

    }


}
export const startLogOut = () => {

    return async (dispatch) => {
        const auth = getAuth()
        await signOut(auth)

        dispatch(logOut())
    }
}
