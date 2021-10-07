import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSavingNote, startUploadImg } from '../../actions/notes'

export const NotesAppBar = () => {
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const handleSave = async () => {
        dispatch(startSavingNote(active))

    }



    const handleFileChange = (e) => {
        const file = e.target.files[0]

        dispatch(startUploadImg(file))
    }
    const handleUpload = () => {
        document.getElementById('inputFile').click()
    }

    return (
        <div className="notes__notesappbar">
            <span>23 de octubre de 1998</span>
            <div>

                <input
                    type="file"
                    id="inputFile"
                    style={{ display: `none` }}
                    onChange={handleFileChange}

                />
                <button
                    onClick={handleUpload}
                    className="button notes__notes-button"
                >Picture </button>
                <button
                    onClick={handleSave}
                    className="button notes__notes-button"
                >save </button>
            </div>
        </div>
    )
}
