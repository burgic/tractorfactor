import React, {useState, useEffect} from "react";
import {Rating} from 'react-simple-star-rating';
const InspectorSearchItem = ({inspector, handleDeleteButtonClick, handleUpdateButtonClick}) => {

    const [rating, setRating] = useState(inspector.rating);
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [inspectorEmail, setInspectorEmail] = useState(`mailto:${inspector.email}`)
    const [inspectorPhoneNumber, setInspectorPhoneNumber] = useState(`tel:${inspector.phoneNumber}`)

    const handleRating = (number) => {
        setRating(number)
        let temp =inspector
        temp.rating = number
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
    
    

     


    return(
        <>

            <tr>
                <td>{inspector.name}</td>
                <td>{inspector.address}</td>  
                <td><a href={inspectorPhoneNumber}>{inspector.phoneNumber}</a></td>
                <td><a href={inspectorEmail}>{inspector.email}</a></td>
                <td><Rating onClick={handleRating} allowHalfIcon={true} size={20} ratingValue={rating} /></td>
                <button onClick={handleUpdateButtonClick} value={inspector.id}>Update</button><button onClick={handleDeleteButtonClick} value={inspector.id}>Delete</button>
            </tr>
            
        </>

    )
}
export default InspectorSearchItem;