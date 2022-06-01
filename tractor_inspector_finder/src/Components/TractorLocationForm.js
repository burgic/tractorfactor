import React from 'react';
import { useState } from 'react';


const TractorLocationForm = ({handleSearchCode}) => {

    const [postCode, setPostCode] = useState(null)

    const handleChange = (evt) => {
        setPostCode(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        handleSearchCode(postCode)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="postcode">Postcode</label> */}
                <input onChange={handleChange} type="text" name="postcode" />
                <input type="submit" value="Search" />
               
            </form>
        
            
        </>
    )
}

export default TractorLocationForm;
