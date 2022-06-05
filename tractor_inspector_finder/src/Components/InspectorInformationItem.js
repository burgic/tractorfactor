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
    
    
{/* <span className="bold"></span> */}
    


    return(
        <>
            <table className="Inspector-Table">
            <tr>
                <th>Number</th>
                <th>Address: </th> 
                <th>Distance: </th> 
                <th>Rating: </th>
            </tr>
            <tr>
                <td>{letter}:</td>
                <td>{inspector.address}</td> 
                <td>{inspector.distance} </td>
                <td>{inspector.rating} <Rating onClick={handleRating} allowHalfIcon={true} size={25} ratingValue={rating} /></td>
            </tr>
            </table>

        </>

    )
}
export default InspectorInformationItem;