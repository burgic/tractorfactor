import {useState, useEffect} from 'react';
import React from 'react';

const AddInspectorForm = () => {

    const [name, setName] = useState()
    const [postcode, setPostcode] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [email, setEmail] = useState()
    const [tractorsArray, setTractorsArray] = useState([])
    const [inspectorLocationData, setInspectorLocationData] = useState()
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [newInspector, setNewInspector] = useState(null)
    const [tractorObjects, setTractorObjects] = useState(null)
    const [tractorMap, setTractorMap] = useState(null)

    const [updateWorked, setUpdateWorked] = useState(false)

    useEffect(() => {
        getTractors()
    }, [])

    const getTractors = () => {
        fetch('http://localhost:8080/tractors')
        .then(res => res.json())
        .then(data => setTractorObjects(data))
    }

    useEffect(() => {
        if(tractorObjects !== null){
            mapTractorManufacturers()
        }
    }, [tractorObjects])

    const mapTractorManufacturers = () => {
        const tractorMapping = tractorObjects.map((tractor, index) => {
            return  <><label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</label> <input onChange={handleCheckboxChange} key={tractor.id} type="checkbox" name={tractor.manufacturer} value={tractor.id}></input></>
        })
        setTractorMap(tractorMapping)
    }
    
    let array=[];
    const handleCheckboxChange = (evt) => {
        
        if (array.length > 0){
            for (let i=0; i< array[0].length; i++){
                if (array[0][i] === parseInt(evt.target.value)){
                    console.log(array[0])
                    array[0].splice(i, 1)
                    setTractorsArray([array])
                } 
            } array.push(parseInt(evt.target.value))
            setTractorsArray([array])
        }
        else {
                array.push(parseInt(evt.target.value))
                setTractorsArray([array])
            }
            
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
            name:name,
            postcode:postcode,
            address:address,
            phoneNumber:phoneNumber,
            email:email,
            lat:lat,
            lng:lng,
            tractorIds:tractorsArray[0]
        })
    }
    
    useEffect(() => {
        if (lat !== null && lng !== null){
            addInspectorObject()
        }
    }, [lat, lng])

 


    const addInspectorToDb = () => {
        if (newInspector !== null){
        fetch('http://localhost:8080/inspectors',{
            method:'POST',
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
            addInspectorToDb()
        }
    }, [newInspector])


    
    

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text"  name="name" placeholder="name" required></input>
            <input onChange={handleChange} type="text"  name="postcode" placeholder="postcode" required></input>
            {/* <button>Get Co-ordinates</button> */}
            <input onChange={handleChange} type="text" name="address" placeholder="address" required></input>
            <input onChange={handleChange} type="text" name="phoneNumber" placeholder="phone number" required></input>
            <input onChange={handleChange} type="email" name="email" placeholder="email" required></input>
            <br></br>
            <fieldset>
                {tractorMap}
            </fieldset>
            <br></br>
            <input type="submit" value="Add Inspector"></input>
        </form>
        { updateWorked === true ? <h3>Update successful</h3> : null }
        </>
    )
}

export default AddInspectorForm;