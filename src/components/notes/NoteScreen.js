import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { activeNote, StartDeletingNote } from '../../actions/notes'
import { UseForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes)

    const [stateValues, handleInputChange, reset] = UseForm(note)
    const { title, body } = stateValues
    const activedId = useRef(note.id)

    useEffect(() => {
        if (note.id !== activedId.current) {
            reset(note)
            activedId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(stateValues.id, { ...stateValues }))
    }, [stateValues, dispatch])

    const handleDelete = () => {
        dispatch(StartDeletingNote(activedId.current))
    }
    return (
        <div className="notes__main">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input "
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="how are you feeling today ?"
                    className="notes__textarea "
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                />

                {
                    (note.img)
                    && (
                        <div className="notes__img-container ">
                            <img
                                className="img"
                                src={note.img}
                                alt="img"
                                name="img"
                            />
                        </div>
                    )

                }

            </div>
            <button
                className="btn btn-danger "
                onClick={handleDelete}
            >Delete note</button>
        </div>
    )
}
