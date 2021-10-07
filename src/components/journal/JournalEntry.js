import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes'


export const JournalEntry = ({ id, title, body, img, date }) => {
    const dispatch = useDispatch()
    const dateParsed = moment(date)
    const handleClick = () => {
        dispatch(activeNote(id, { title, body, img, date, id }))

    }

    return (
        <div
            onClick={handleClick}
            className="journal__entry">

            {
                img &&
                <div
                    className="journal__entry-img"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${img})`
                    }}>
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-titulo">{title}</p>
                <p className="journal__entry-mainContent">{body}</p>
            </div>
            <div className="journal__entry-date">
                <span>
                    {dateParsed.format('dddd')}
                </span>
                <h4>{dateParsed.format('MMM Do YY')}</h4>
            </div>

        </div>
    )
}
