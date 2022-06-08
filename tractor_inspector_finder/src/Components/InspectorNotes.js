import React from 'react';
import { useEffect, useState } from "react";

const InspectorNotes = ({inspector, handleNotesClick, handleNotes}) => {

    const[notes, setNotes] = useState(inspector.notes)
    

    const handleCancelClick = () => {
        handleNotesClick()
    }


    const updateNotes = (evt) => {
        setNotes(evt.target.value)
    }

    const handleSave = (evt) => {
        evt.preventDefault()
        handleNotes(notes)
        handleNotesClick()
        }

    return(
        <div className="inspector-notes-container">
            <h3> Notes</h3>
            <form onSubmit={handleSave}>
                <textarea onChange={updateNotes} height="250px" width="150px" value={notes} />
                <div className = "notes-buttons">
                    <input className="button" type="submit" value="save"></input>
                    <button className="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>


        </div>
    )


}
export default InspectorNotes;