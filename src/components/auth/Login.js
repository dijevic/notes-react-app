import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { UseForm } from '../../hooks/useForm'

export const Login = () => {

    const dispatch = useDispatch()
    const { messageError, loading } = useSelector(state => state.authUiError)
    const [stateValues, handleInputChange] = UseForm({
        email: '',
        password: ''
    })

    const { email, password } = stateValues

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(email, password))

    }
    const handleGoogleSigIn = () => {
        dispatch(startGoogleLogin())
    }



    return (
        <div>
            <h3 className="auth__title">login</h3>

            <form onSubmit={handleLogin}>
                {
                    messageError &&
                    (
                        <div className="auth__error-alert">
                            <p>{messageError}</p>
                        </div>
                    )


                }
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    className="auth__input"
                    onChange={handleInputChange}
                    autoComplete="off" />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="password"
                    className="auth__input"
                    autoComplete="off" />
                <button
                    type="submit"
                    className="auth__btn button"
                    disabled={loading}
                >Login</button>

                <div>
                    <p className="auth__p">login with social network</p>
                    <div onClick={handleGoogleSigIn} className="google-btn">
                        <div className="google-icon-wrapper">

                            <img className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button" />

                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="auth__register-login-button" to="/auth/register" > Create an acount</Link>

            </form>
        </div>
    )
}
