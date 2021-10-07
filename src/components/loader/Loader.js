import React from 'react'

export const Loader = ({ message }) => {
    return (
        <div className="loader__container">
            <div className="preloader"></div>
            <p className="auth__loading">{message}</p>
        </div>
    )
}
