import React from 'react';

import AddInspectorForm from '../Components/AddInspectorForm';
import AddTractorForm from '../Components/AddTractorForm';
import InspectorSearchForm from '../Components/InspectorSearchForm';


const AdminContainer = () => {

    return (
        <div>

            <h1>Admin Container</h1>
            <AddInspectorForm />
            <AddTractorForm />
            <InspectorSearchForm />
            



        </div>
    )
    

}

export default AdminContainer;