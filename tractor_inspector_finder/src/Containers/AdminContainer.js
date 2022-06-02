import React from 'react';

import AddInspectorForm from '../Components/AddInspectorForm';
import AddTractorForm from '../Components/AddTractorForm';
import InspectorSearchForm from '../Components/InspectorSearchForm';


const AdminContainer = () => {

    return (
        <div>

            <h1>Admin</h1>

            <h2>Add New Inspector</h2>
            <AddInspectorForm />

            <h2>Add New Tractor</h2>
            <AddTractorForm />

            <h2>Search for Inspector</h2>
            <InspectorSearchForm />
            



        </div>
    )
    

}

export default AdminContainer;