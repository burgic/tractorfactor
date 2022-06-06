import React, {useState, useEffect} from 'react';

const InspectorsList = () => {

    const [searchResults, setSearchResults] = useState(null)
    const [searchResultsMap, setSearchResultsMap] = useState(null)

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
            return <tr><td>{result.name.toUpperCase()}</td><td>{result.postcode}</td><td>{result.address}</td><td>{result.phoneNumber}</td><td>{result.email}</td><button  value={result.id}>Update</button><button  value={result.id}>Delete</button></tr>
        })
        setSearchResultsMap(mappedResults)
    }

    return(
        <>
        <h3>All Inspectors</h3>
        {searchResultsMap !== null ? <table><tbody>{searchResultsMap}</tbody></table>: null}
        </>
    )
}
export default InspectorsList;