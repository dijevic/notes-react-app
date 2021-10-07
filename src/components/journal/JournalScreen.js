import React from 'react'
import { useSelector } from 'react-redux'

import { NoteScreen } from '../notes/NoteScreen'
import { NothingSeleted } from './NothingSeleted'
import { SideBar } from './SideBar'

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes)
    return (
        <div className="journal__main">
            <SideBar />
            <main>


                {
                    (active)
                        ? <NoteScreen />
                        : <NothingSeleted />
                }


            </main>
        </div>
    )
}
