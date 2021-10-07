import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth'
import { logOutcleaningNotes, startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const SideBar = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    const handleLogOut = () => {
        dispatch(startLogOut())
        dispatch(logOutcleaningNotes())
    }

    const handleAddNew = () => {
        dispatch(startNewNote())

    }
    return (

        <aside className="journal__sidebar">
            <div className="journal__sidebar-nav">
                <h3>
                    <i className="far fa-moon"></i>
                    <span>{auth.name}</span>
                </h3>
                <button
                    className="button"
                    onClick={handleLogOut}
                >Logout</button>
            </div>

            <div
                className="journal__sidebar-new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <span>New entry</span>

            </div>

            <JournalEntries />
        </aside>

    )
}
