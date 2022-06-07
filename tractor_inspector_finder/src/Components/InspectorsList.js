import React, {useState, useEffect} from 'react';
import InspectorSearchItem from './InspectorSearchItem';
import UpdateInspectorForm from './UpdateInspectorForm';

const InspectorsList = () => {

    const [searchResults, setSearchResults] = useState(null)
    const [searchResultsMap, setSearchResultsMap] = useState(null)
    const [idToUpdate, setIdToUpdate] = useState(null)
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [idToDelete, setIdToDelete] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [deleteWorked, setDeleteWorked] = useState(false)

    useEffect(() => {
        load()
    }, [])

    const load = () => {
        fetch(`http://localhost:8080/inspectors`)
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
            // return <tr><td>{result.name.toUpperCase()}</td><td>{result.postcode}</td><td>{result.address}</td><td>{result.phoneNumber}</td><td>{result.email}</td><button onClick={handleUpdateButtonClick} value={result.id}>Update</button><button onClick={handleDeleteButtonClick} value={result.id}>Delete</button></tr>
            return <InspectorSearchItem inspector = {result} key={index} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} />
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
        <h3>All Inspectors</h3>
        {/* {searchResultsMap !== null ? <table><tbody>{searchResultsMap}</tbody></table>: null} */}
        {searchResultsMap !== null ? <table className="inspector-table"><tr><th>Name</th><th>Address </th> <th>Phone </th><th>Email </th><th>Rating </th></tr><tbody>{searchResultsMap}</tbody></table>: null}
        {inspectorToUpdate !== null ? <UpdateInspectorForm inspectorToUpdate={inspectorToUpdate} handleUpdateSubmit={handleUpdateSubmit} /> : null}
        {deleteWorked === true? <h3>Delete Successful</h3> : null}
        </>
    )
}
export default InspectorsList;