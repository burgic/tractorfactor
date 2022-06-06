import React, {useEffect, useState} from 'react';
import UpdateInspectorForm from './UpdateInspectorForm';
// import {View, Text} from 'react-native'

const InspectorSearchForm = () => {

    const [searchValue, setSearchValue] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [searchResultsMap, setSearchResultsMap] = useState(null)
    const [idToUpdate, setIdToUpdate] = useState(null)
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [idToDelete, setIdToDelete] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [deleteWorked, setDeleteWorked] = useState(false)

    const handleChange = (evt) => {
        setSearchValue(evt.target.value)
    }

    // const handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     fetch(`http://localhost:8080/inspectors?name=${searchValue}`)
    //     .then(res => res.json())
    //     .then(data => setSearchResults(data))
    // }

    useEffect(() => {
        if (searchValue !== null){
        search()
        }
    }, [searchValue])

    const search = () => {
        fetch(`http://localhost:8080/inspectors?name=${searchValue}`)
        .then(res => res.json())
        .then(data => setSearchResults(data))
    }

    useEffect(() => {
        if (searchResults !== null){
            mapResults()
        }
    }, [searchResults])
    
    const mapResults = () => {
        const mappedResults = searchResults.map((result, index) => {
            return <tr><td>{result.name.toUpperCase()}</td><td>{result.postcode}</td><td>{result.address}</td><td>{result.phoneNumber}</td><td>{result.email}</td><button onClick={handleUpdateButtonClick} value={result.id}>Update</button><button onClick={handleDeleteButtonClick} value={result.id}>Delete</button></tr>
            
        })
        setSearchResultsMap(mappedResults)
    }

    const handleUpdateButtonClick = (evt) => {
        setIdToUpdate(evt.target.value)
    }

    const handleDeleteButtonClick = (evt) => {
        setIdToDelete(evt.target.value)
    }

    const deleteInspector = () => {
        fetch(`http://localhost:8080/inspectors/${idToDelete}`,{
        method:'DELETE'})
        .then(res=> {
            if (res.ok) {
                setDeleteWorked(true)
                setTimeout(() => {
                    setDeleteWorked(false);
                }, 2000)
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => {
            console.log(error)
            });
    }

    const handleUpdateSubmit = () => {
        setInspectorToUpdate(null)
    }

    useEffect(() => {
        if(idToDelete !== null){
            deleteInspector()
        }
    }, [idToDelete])

    useEffect(() => {
        if(idToUpdate !== null){
        getInspectorToUpdate()
        }
    }, [idToUpdate])

    const getInspectorToUpdate = () => {
        fetch(`http://localhost:8080/inspectors/${idToUpdate}`)
        .then(res => res.json())
        .then(data => setInspectorToUpdate(data))
    }

    return(
        <>
            <form className="inspector-search-form">
                <h3>Search</h3>
                <label htmlFor='Inspector'>Inspector By Name: </label>
                <input onChange={handleChange} type="search" ></input>
                <p></p>
            </form>

            {searchResultsMap !== null ? <table><tbody>{searchResultsMap}</tbody></table>: null}
            {inspectorToUpdate !== null ? <UpdateInspectorForm inspectorToUpdate={inspectorToUpdate} handleUpdateSubmit={handleUpdateSubmit} /> : null}
            {deleteWorked === true? <h3>Delete Successful</h3> : null}
        </>
    )

} 
export default InspectorSearchForm;