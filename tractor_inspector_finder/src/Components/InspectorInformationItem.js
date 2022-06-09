import React, {useState, useEffect} from "react";
import {Rating} from 'react-simple-star-rating';

import InspectorNotes from "./InspectorNotes";
import Notes from '../static/notes-icon.png';
const InspectorInformationItem = ({inspector, index, letter}) => {

    const [rating, setRating] = useState(inspector.rating);
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [inspectorEmail, setInspectorEmail] = useState(`mailto:${inspector.email}`)
    const [inspectorPhoneNumber, setInspectorPhoneNumber] = useState(`tel:${inspector.phoneNumber}`)
    const [isNotes, setIsNotes] = useState(false);


    const handleRating = (number) => {
        setRating(number)
        let temp = inspector
        temp.rating = number
        setInspectorToUpdate(temp)
    } 

    const handleNotes = (notes) => {
        let temp = inspector
        temp.notes = notes
        setInspectorToUpdate(temp)
    }

    useEffect (() => {
        if (inspectorToUpdate !== null){
        postInspector()
        }

    }, [inspectorToUpdate])

    const postInspector = () => {
        fetch(`http://localhost:8080/inspectors/${inspectorToUpdate.id}`,{
            method:'PUT',
            body: JSON.stringify(inspectorToUpdate),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=> {
            if (res.ok) {
                console.log(inspectorToUpdate)
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => {
            console.log(error)
            });
        }
     
        const handleNotesClick = (evt) => {
            setIsNotes(!isNotes)
        }

    return(
        <>
            <tr>
                <td>{letter}</td>
                <td className="inspector-name">{inspector.name}</td>
                <td>{inspector.address}</td>  
                <td>{inspector.distance} </td>
                <td><a href={inspectorPhoneNumber}>{inspector.phoneNumber}</a></td>
                <td><a href={inspectorEmail}>{inspector.email}</a></td>
                <td><Rating onClick={handleRating} allowHalfIcon={true} size={20} ratingValue={rating} /></td>
                <td><div className="table-buttons">
                    <button className="notes" onClick={handleNotesClick}><img src={Notes} height="33px" width="40px" /></button></div></td>
                    {isNotes ? <InspectorNotes handleNotesClick={handleNotesClick} inspector={inspector} index={index} handleNotes={handleNotes} /> : null}
                
                    </tr>
            
        </>

    )
}
export default InspectorInformationItem;