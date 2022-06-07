import React from 'react';
import {useState, useEffect} from 'react'
import TractorLocationForm from '../Components/TractorLocationForm';
import MapComponent from '../Components/Map';
// import styled from 'styled-components';


const HomeContainer = () => {

    const [tractors, setTractors] = useState(null)
    const [tractorLocationData, setTractorLocationData] = useState(null)
    const [tractorLatLong, setTractorLatLong] = useState(null)
    const [tractorLatLongRanges, setTractorLatLongRanges] = useState(null)
    const [searchCode, setSearchCode] = useState(null)
    const [manufacturer, setManufacturer] = useState(null)
    const [inspectorDestinations, setInspectorDestinations] = useState(null)    
    const [isError, setIsError] = useState(false)
    const [resultsNotFound, setResultsNotFound] = useState(false)
    const [isSearch, setIsSearch] = useState(true)

    const getTractors = () => {
        fetch(`http://localhost:8080/tractors`)
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then(data => setTractors(data))
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        getTractors()
    }, [])

    const handleSearchCode = (code) => {
        setSearchCode(code)
    }

    const handleTractorManufacturer = (manufacturer)=> {
        setManufacturer(manufacturer)
    }

    useEffect (() => { // can this be added to other useEffect?
        if (searchCode != null){
        getTractorLatAndLong()
        }
    }, [searchCode, manufacturer])

    const getTractorLatAndLong = () => { // geocode postcode data
        fetch(`http://api.postcodes.io/postcodes/${searchCode}`)
        .then(res => {
            if (res.ok){
                return res.json();
            }
            throw new Error('try a different post code')
        })
        .then(data => setTractorLocationData(data)) // listening for state change, triggers when not null
        .catch((error) => {
            console.log(error)
            setIsError(true)
                setTimeout(() => {
                    setIsError(false);
                }, 2000)
        })
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
            minLat: tractorLocationData.result.latitude-1.0,
            maxLat: tractorLocationData.result.latitude+1.0,
            minLng: tractorLocationData.result.longitude-1.0,
            maxLng: tractorLocationData.result.longitude+1.0
        })
    }

    useEffect(() => {
        if(tractorLatLongRanges!==null){
        fetchInspectors()
        }
    }, [tractorLatLongRanges])

    useEffect(() => {
        if(inspectorDestinations !== null){
            if(inspectorDestinations.length !== 0){
                getInspectorLatLong()}
            else{
                broadenSearch()
            }
        }
    }, [inspectorDestinations])

    const broadenSearch = () => {
        console.log("broadening the search")
        if(tractorLatLongRanges.minLat > tractorLocationData.result.latitude-5){
            setTractorLatLongRanges({
                minLat: tractorLatLongRanges.minLat-1.0,
                maxLat: tractorLatLongRanges.maxLat+1.0,
                minLng: tractorLatLongRanges.minLng-1.0,
                maxLng: tractorLatLongRanges.maxLng+1.0
            })
        } else{
            setResultsNotFound(true)
            setTimeout(() => {
                setResultsNotFound(false)
            }, 2000)
        }
        
        // .then(() => {fetchInspectors()})
    }

    const fetchInspectors = () => {
        fetch(`http://localhost:8080/inspectors?manufacturer=${manufacturer}&minLat=${tractorLatLongRanges.minLat}&maxLat=${tractorLatLongRanges.maxLat}&minLng=${tractorLatLongRanges.minLng}&maxLng=${tractorLatLongRanges.maxLng}`)
        .then(res => {
            if (res.ok){
            return res.json();
            }
            throw new Error('something went wrong')
        })
        .then(data => setInspectorDestinations(data)) 
        .catch((error) => {
            console.log(error)
        });
    }
    
    const [inspectorLatLong, setInspectorLatLong] = useState(null)

    


    const getInspectorLatLong = () => {
        const inspectorLatAndLong = inspectorDestinations.map((inspector) => {
        return {lat:inspector.lat, lng: inspector.lng}
    })
    setInspectorLatLong(inspectorLatAndLong)
    setIsSearch(false)
    }
        
    const handleNewSearchClick = () =>{
        setIsSearch(true)
        setInspectorLatLong(null)
    }



    return (
        <div className="home-container">
             
            
            {inspectorLatLong != null ? <MapComponent inspectorLatLong={inspectorLatLong} tractorLocationData={tractorLatLong} inspectorDestinations={inspectorDestinations} /> : null}
            {isSearch === true ? <TractorLocationForm tractors={tractors} handleSearchCode={handleSearchCode} handleTractorManufacturer={handleTractorManufacturer}/> : <button className="button new-search-button" onClick={handleNewSearchClick}>New Search</button> }
            {isError === true ? <h3>No results found.  Please check your postcode.</h3> : null}
            {resultsNotFound === true ? <h3>No inspectors found within range of this postcode</h3> : null}
        </div>
    )
}

export default HomeContainer;