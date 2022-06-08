import React from 'react';
import { useEffect, useState } from "react";

const InspectorNotes = () => {

    const[notes, setNotes] = useState()


    return(
        <div className="inspector-notes-container">
            <h3> Notes</h3>
            <form onSubmit={handleSave}>
                <textarea onChange={updateNotes} height="250px" width="150px" value={notes} />
                <div className = "notes-buttons">
                    <input type="submit" value="save"></input>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>


        </div>
    )


}
export default InspectorNotes;