import React from "react";
import {useState, useEffect} from 'react';

const UpdateInspectorForm = ({inspectorToUpdate, handleUpdateSubmit}) => {

    const [name, setName] = useState(inspectorToUpdate.name)
    const [postcode, setPostcode] = useState(inspectorToUpdate.postcode)
    const [address, setAddress] = useState(inspectorToUpdate.address)
    const [phoneNumber, setPhoneNumber] = useState(inspectorToUpdate.phoneNumber)
    const [email, setEmail] = useState(inspectorToUpdate.email)
    const [tractorsArray, setTractorsArray] = useState(inspectorToUpdate.tractorIds)
    const [inspectorLocationData, setInspectorLocationData] = useState()
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [newInspector, setNewInspector] = useState(null)
    const [tractorObjects, setTractorObjects] = useState(null)
    const [tractorMap, setTractorMap] = useState(null)
    const [updateWorked, setUpdateWorked] = useState(false)
    const [checkedState, setCheckedState] = useState(null)

   

    useEffect(() => {
        getTractors()
    }, [])

    const getTractors = () => {
        fetch('http://localhost:8080/tractors')
        .then(res => res.json())
        .then(data => setTractorObjects(data))
    }

    useEffect(() => {
        if(tractorObjects !== null ){
            updateCheckedState()
        }
        
    }, [tractorObjects])

    const updateCheckedState = () => {
        let temp = new Array(tractorObjects.length).fill(false)
        if (inspectorToUpdate.tractorIds.length > 0){
            for (let i=0; i<inspectorToUpdate.tractorIds.length; i++){
                let index = inspectorToUpdate.tractorIds[i]-1;
                temp[index] = true
        }
        setCheckedState(temp)
        } 
    }

    useEffect(() => {
        if (checkedState !== null){
            mapTractorManufacturers()
        }
    }, [checkedState])

    const mapTractorManufacturers = () => {
        
        const tractorMapping = tractorObjects.map((tractor, index) => {
            if (tractor.id === inspectorToUpdate.tractorIds[0]) {
                return  <><label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</label> <input onChange={() => handleCheckboxChange(index)} checked={checkedState[index]} name={tractor.id} id={index} key={index} type="checkbox" name={tractor.manufacturer} value={tractor.id}></input></>
                // <><label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</label> <input onChange={handleCheckboxChange} key={tractor.id} type="checkbox" checked name={tractor.manufacturer} value={tractor.id}></input></>
            } else{
                return  <><label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</label> <input onChange={() => handleCheckboxChange(index)} checked={checkedState[index]} name={tractor.id} key={tractor.id} type="checkbox" name={tractor.manufacturer} value={tractor.id}></input></>
            }
        })
        
        setTractorMap(tractorMapping)
    }

    useEffect(() => {
        if (checkedState!== null){
            setTractorIDArray()
        }
    }, [checkedState])

    const setTractorIDArray = () =>{
        let temp = []
        for (let i=0; i<checkedState.length; i++){
            if (checkedState[i] === true){
                temp.push(tractorObjects[i].id)
            }
        } setTractorsArray(temp)
    }

    const handleCheckboxChange = (position) => {
        console.log(position)
        const updatedCheckedState = checkedState.map((item, index) => {
            if (index === position) {
              return !item;
            } else {
              return item;
            }
          });
    
        setCheckedState(updatedCheckedState);
    }

    const handleChange = (evt) => {
        const state = evt.target.name
        if (state === 'name'){
            setName(evt.target.value)
        } else if(state === 'postcode'){
            setPostcode(evt.target.value)
        } else if(state === 'address'){
            setAddress(evt.target.value)
        } else if(state === 'phoneNumber'){
            setPhoneNumber(evt.target.value)
        } else if (state ==='email'){
            setEmail(evt.target.value)
        } 
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://api.postcodes.io/postcodes/${postcode}`)
        .then(res => res.json())
        .then(data => setInspectorLocationData(data))
    }

    useEffect(() => {
        if(inspectorLocationData!= null){
          setLat(inspectorLocationData.result.latitude)
          setLng(inspectorLocationData.result.longitude)
        }
      }, [inspectorLocationData])




    const addInspectorObject = () => {
        setNewInspector( {
            id: inspectorToUpdate.id,
            name:name,
            postcode:postcode,
            address:address,
            phoneNumber:phoneNumber,
            email:email,
            lat:lat,
            lng:lng,
            tractorIds:tractorsArray
        })
    }
    
    useEffect(() => {
        if (lat !== null && lng !== null){
            addInspectorObject()
        }
    }, [lat, lng])

 


    const updateInspectorInDb = () => {
        if (newInspector !== null){
        fetch(`http://localhost:8080/inspectors/${inspectorToUpdate.id}`,{
            method:'PUT',
            body: JSON.stringify(newInspector),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=> {
            if (res.ok) {
                setUpdateWorked(true)
                
                setTimeout(() => {
                    setUpdateWorked(false);
                }, 2000)
                setTimeout(() => {
                    handleUpdateSubmit();
                }, 2500)
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => {
            console.log(error)
            });
        }
    }

    useEffect(() => {
        if (newInspector !== null){
            updateInspectorInDb()
        }
    }, [newInspector])

    


    return (
        <>
            <h2>Update</h2>
            <form className="add-inspector-form" onSubmit={handleSubmit}>
                <input className="inspector-name" onChange={handleChange} type="text" value={name} name="name" required></input>
                <input onChange={handleChange} type="text" value={postcode} name="postcode" placeholder="postcode" required></input>
                <input onChange={handleChange} type="text" value={address} name="address" placeholder="address" required></input>
                <input onChange={handleChange} type="text" value={phoneNumber} name="phoneNumber" placeholder="phone number" required></input>
                <input onChange={handleChange} type="email" value={email} name="email" placeholder="email" required></input>
                <fieldset>
                    {tractorMap}
                </fieldset>
                <input className="button" type="submit" value="update"></input>
            {updateWorked === true ? <h3>Update Successful</h3> : null}

            </form>
        </>
    )
}
export default UpdateInspectorForm;