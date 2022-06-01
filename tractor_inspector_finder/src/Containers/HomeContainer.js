import React from 'react';
import {useState, useEffect} from 'react'
import TractorLocationForm from '../Components/TractorLocationForm';
import MapComponent from '../Components/Map';


const HomeContainer = () => {


    const [tractorLocationData, setTractorLocationData] = useState(null)
    const [tractorLatLong, setTractorLatLong] = useState(null)
    const [tractorLatLongRanges, setTractorLatLongRanges] = useState(null)
    const [searchCode, setSearchCode] = useState(null)
    const [inspectorDestinations, setInspectorDestinations] = useState(null)    

    const handleSearchCode = (code) => {
        setSearchCode(code)
    }

    useEffect (() => { // can this be added to other useEffect?
        if (searchCode != null){
        getTractorLatAndLong()
        }
    }, [searchCode])

    const getTractorLatAndLong = () => { // geocode postcode data
        fetch(`http://api.postcodes.io/postcodes/${searchCode}`)
        .then(res => res.json())
        .then(data => setTractorLocationData(data)) // listening for state change, triggers when not null
    }

    let tractorLatAndLong;
    useEffect(() => {
        if(tractorLocationData!== null){
        prepareDataForFetchRequest()
        tractorLatAndLong = [{lat: tractorLocationData.result.latitude, lng: tractorLocationData.result.longitude}]
            setTractorLatLong(tractorLatAndLong)
        }
    }, [tractorLocationData])

    const prepareDataForFetchRequest = () => {
        setTractorLatLongRanges({
            minLat: tractorLocationData.result.latitude-0.5,
            maxLat: tractorLocationData.result.latitude+0.5,
            minLng: tractorLocationData.result.longitude-0.5,
            maxLng: tractorLocationData.result.longitude+0.5
        })
    }

    useEffect(() => {
        if(tractorLatLongRanges!==null){
        fetchInspectors()
        }
    }, [tractorLatLongRanges])

    const fetchInspectors = () => {
        fetch(`http://localhost:8080/inspectors?minLat=${tractorLatLongRanges.minLat}&maxLat=${tractorLatLongRanges.maxLat}&minLng=${tractorLatLongRanges.minLng}&maxLng=${tractorLatLongRanges.maxLng}`)
        .then(res => res.json())
        .then(data => setInspectorDestinations(data)) 
    }
    
        const [inspectorLatLong, setInspectorLatLong] = useState(null)

    useEffect(() => {
        if(inspectorDestinations != null){
        getInspectorLatLong()}
    }, [inspectorDestinations])


        const getInspectorLatLong = () => {
            const inspectorLatAndLong = inspectorDestinations.map((inspector) => {
            return {lat:inspector.lat, lng: inspector.lng}
        })
        setInspectorLatLong(inspectorLatAndLong)
        }
        



    return (
    
        <div>

            <h1>Home Container</h1>
            <TractorLocationForm handleSearchCode={handleSearchCode}/>
            {inspectorLatLong != null ? <MapComponent inspectorLatLong={inspectorLatLong} tractorLocationData={tractorLatLong} inspectorDestinations={inspectorDestinations} /> : null}


        </div>
    )
    
}

export default HomeContainer;