import {useState, useEffect} from 'react';
import React from 'react';

const AddTractorForm = () => {

    const [manufacturer, setManufacturer] = useState();
    const [newTractor, setNewTractor] = useState();


    const handleChange = (evt) => {
        setManufacturer(evt.target.value)
    }

    useEffect(() => {
        if (manufacturer !== null){
            setNewTractor( {
                manufacturer:manufacturer
            })
        }
    }, [manufacturer])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch('http://localhost:8080/tractors',{
            method:'POST',
            body: JSON.stringify(newTractor),
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name="manufacturer" placeholder="manufacturer" required></input>
            <input type="submit" value="add tractor"></input>


        </form>
    )
}

export default AddTractorForm;