
import { useState } from 'react'

export const UseForm = (initialState = {}) => {
    const [stateValues, setstateValues] = useState(initialState)


    const resetState = (newValue = initialState) => {
        setstateValues(newValue)
    }
    // evento para manejar los cmabios en un input

    const handleInputChange = ({ target }) => {
        setstateValues({
            ...stateValues,
            [target.name]: target.value

        })




    }
    return [stateValues, handleInputChange, resetState]



}