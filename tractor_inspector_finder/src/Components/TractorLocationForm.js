import React from 'react';
import { useState, useEffect } from 'react';


const TractorLocationForm = ({handleSearchCode, tractors, handleTractorManufacturer}) => {

    const [postCode, setPostCode] = useState(null)
    const [tractorManufacturer, setTractorManufacturer] = useState("Massey Ferguson")
    const [mappedTractors, setMappedTractors] = useState(null)

    useEffect(()=> {
        if(tractors !== null){
        mapTractors()
        }
    }, [tractors])

    const mapTractors = () => {
        const mappTractors = tractors.map((tractor) => {
            return <option  key={tractor.id} value={tractor.manufacturer}>{tractor.manufacturer}</option>
        })
        setMappedTractors(mappTractors)
    }

    const handleChange = (evt) => {
        setTractorManufacturer(evt.target.value)
    }

    const handlePostcodeChange = (evt) => {
        setPostCode(evt.target.value)
        
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        handleSearchCode(postCode)
        handleTractorManufacturer(tractorManufacturer)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tractor">Manufacturer</label> 
                <select onChange={handleChange} name="tractors" id="tractors">
                    {mappedTractors}
                </select>
                <label htmlFor="postcode">Postcode</label> 
                <input onChange={handlePostcodeChange} type="text" name="postcode" />
                <input type="submit" value="Search" />
               
            </form>
        
            
        </>
    )
}

export default TractorLocationForm;
