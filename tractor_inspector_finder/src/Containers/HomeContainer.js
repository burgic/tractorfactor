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

    useEffect(() => {
        if(tractorLocationData!== null){
        prepareDataForFetchRequest()
        }
    }, [tractorLocationData])

    const prepareDataForFetchRequest = () => {
        setTractorLatLongRanges({
            minLat: tractorLocationData.result.latitude-1,
            maxLat: tractorLocationData.result.latitude+1,
            minLng: tractorLocationData.result.longitude-1,
            maxLng: tractorLocationData.result.longitude+1
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
    
    // useEffect(() => { // when postcode fetched, creates lat long object for tractor, and fires dbase query
    //     if(tractorLocationData!= null){
    //         const tractorLatAndLong = [{lat: tractorLocationData.result.latitude, lng: tractorLocationData.result.longitude}]
    //         setTractorLatLong(tractorLatAndLong)
    //     }
    //     // fetchInspectors()
    //     }, [tractorLocationData])
    
    //     const [inspectorLatLong, setInspectorLatLong] = useState(null)

    // useEffect(() => {
    //     if(inspectorDestinations != null){
    //     getInspectorLatLong()}
    // }, [inspectorDestinations])


        // const getInspectorLatLong = () => {
        //     const inspectorLatAndLong = inspectorDestinations.map((inspector) => {
        //     return {lat:inspector.lat, lng: inspector.lng}
        // })
        // setInspectorLatLong(inspectorLatAndLong)
        // }
        



    return (
    
        <div>

            <h1>Home Container</h1>
            <TractorLocationForm handleSearchCode={handleSearchCode}/>
            {/* {tractorLatLong != null ? <MapComponent inspectorLatLong={inspectorLatLong} tractorLocationData={tractorLatLong} inspectorDestinations={inspectorDestinations} /> : null} */}


        </div>
    )
    
}

export default HomeContainer;