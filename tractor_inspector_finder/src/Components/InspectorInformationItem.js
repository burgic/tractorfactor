import React, {useState, useEffect} from "react";
import {Rating} from 'react-simple-star-rating';
const InspectorInformationItem = ({inspector, letter}) => {

    const [rating, setRating] = useState(inspector.rating);
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)

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
            <li >
                <span className="bold">{letter}:  </span>
                <span className="bold">Address: </span>{inspector.address} 
                <span className="bold">Distance: </span>{inspector.distance} miles away 
                <span className="bold">Rating: </span><Rating onClick={handleRating} allowHalfIcon={true} size={25} ratingValue={rating} />
            </li>
        </>

    )
}
export default InspectorInformationItem;