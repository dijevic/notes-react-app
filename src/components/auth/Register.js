import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { Link } from 'react-router-dom'
import { UseForm } from '../../hooks/useForm'
import { removeErrorAction, setErrorAction } from '../../actions/ui'
import { startRegisterWithEmailPassword } from '../../actions/auth'


export const Register = () => {


    const dispatch = useDispatch()
    const { messageError } = useSelector(state => state.authUiError)
    const [formValues, handleInputChange] = UseForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPassword(email, password, name))
        }


    }

    const isFormValid = () => {

        if (validator.isEmpty(name)) {
            dispatch(setErrorAction(`the name is required`))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setErrorAction(`the email is required`))
            return false
        } else if (password !== password2 || password.length < 6) {
            dispatch(setErrorAction(`the password is required and must match each other `))
            return false
        }
        dispatch(removeErrorAction())

        return true

    }

    return (
        <>
            <h3 className="auth__title">Register !</h3>

            <form onSubmit={handleRegister} >

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
                    type="text"
                    name="name"
                    value={name}
                    placeholder="name"
                    className="auth__input"
                    onChange={handleInputChange}
                    autoComplete="off" />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    className="auth__input"
                    onChange={handleInputChange}
                    autoComplete="off" />
                <input
                    type="password"
                    name="password2"
                    value={password2}
                    placeholder="confirm the password"
                    className="auth__input"
                    onChange={handleInputChange}
                    autoComplete="off" />
                <button type="submit" className="auth__btn button" >Login</button>
                <Link className="auth__register-login-button" to="/auth/login" > Already Registered ?</Link>

            </form>
        </>
    )
}
