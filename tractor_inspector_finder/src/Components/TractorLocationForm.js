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
            <h2>Search For An Inspector</h2>

            <form className="home-form" onSubmit={handleSubmit}>
                <label className="home-form-input left" htmlFor="tractor">Manufacturer: </label> 
                <select className="home-form-input right" onChange={handleChange} name="tractors" id="tractors">
                    {mappedTractors}
                </select>
                <br></br>
                <label className="home-form-input left" htmlFor="postcode">Postcode: </label> 
                <input className="home-form-input right" onChange={handlePostcodeChange} type="text" name="postcode" />
                <br></br>
                <input className="button" type="submit" value="Search" />

            </form>
            
        </>
    )
}

export default TractorLocationForm;
