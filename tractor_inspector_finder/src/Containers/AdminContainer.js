import React from 'react';
import {useState, useEffect} from 'react';

import AddInspectorForm from '../Components/AddInspectorForm';
import AddTractorForm from '../Components/AddTractorForm';
import InspectorSearchForm from '../Components/InspectorSearchForm';
import InspectorsList from '../Components/InspectorsList';

const AdminContainer = () => {

    const [isInspectorActive, setIsInspectorActive] = useState(false)
    const [isTractorActive, setIsTractorActive] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isInspectorsActive, setIsInspectorsActive] = useState(false)
  
    

    const handleInspectorClick = (evt) => {
        setIsInspectorActive(!isInspectorActive)
        setIsTractorActive(false)
        setIsSearchActive(false)
        setIsInspectorsActive(false)
    }

    const handleTractorClick = (evt) => {
        setIsInspectorActive(false)
        setIsTractorActive(!isTractorActive)
        setIsSearchActive(false)
        setIsInspectorsActive(false)
    }

    const handleSearchClick = (evt) => {
        setIsInspectorActive(false)
        setIsTractorActive(false)
        setIsSearchActive(!isSearchActive)
        setIsInspectorsActive(false)
    }

    const handleInspectorsClick = (evt) => {
        setIsInspectorActive(false)
        setIsTractorActive(false)
        setIsSearchActive(false)
        setIsInspectorsActive(!isInspectorsActive)
    }

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <div className="admin-card-container">
                {isInspectorActive === true ? <div className="admin-card active"  onClick={handleInspectorClick}><h2>Add New Inspector</h2></div>:  <div className="admin-card"  onClick={handleInspectorClick}><h2>Add New Inspector</h2></div>}
                {isTractorActive === true ? <div className="admin-card active"  onClick={handleTractorClick}><h2>Add New Tractor</h2></div> : <div className="admin-card"  onClick={handleTractorClick}><h2>Add New Tractor</h2></div>}
                {isSearchActive === true ? <div className="admin-card active"  onClick={handleSearchClick}><h2>Search for Inspector</h2></div> : <div className="admin-card"  onClick={handleSearchClick}><h2>Search for Inspector</h2></div>}
                {isInspectorsActive === true ? <div className="admin-card active"  onClick={handleInspectorsClick}><h2>All Inspectors</h2></div> : <div className="admin-card"  onClick={handleInspectorsClick}><h2>All Inspectors</h2></div>}
            </div>
            <div className = "admin-form-container">
                {isInspectorActive === true ? <AddInspectorForm /> : null }
                {isTractorActive === true ? <AddTractorForm /> : null }
                {isSearchActive === true ? <InspectorSearchForm /> : null }
                {isInspectorsActive === true ? <InspectorsList /> : null}
            </div>
        </div>
    )
    

}

export default AdminContainer;