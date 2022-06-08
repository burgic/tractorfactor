import React, {useState, useEffect} from 'react';

import InspectorInformationItem from './InspectorInformationItem';


const InspectorInformation = ({inspectorsInfo, searchDistance}) => {
    
    //need to make a component for inspector information item
    
    
    const inspectorInfo = inspectorsInfo.map((inspector, index) => {
        if (inspector.distance < searchDistance){
        let letter = String.fromCharCode("A".charCodeAt(0) + index)
        return <InspectorInformationItem index={index} letter={letter} inspector={inspector} key={index} />
        
        } 
    } )

  
    
    return (
        <div className ="inspector-information">
            <br></br>
            {/* <h2>Inspector Information</h2> */}
            <table className="inspector-table">
            <tr>
                <th></th>
                <th>Name</th>
                <th>Address </th> 
                <th>Distance </th> 
                <th>Phone </th>
                <th>Email </th> 
                <th>Rating </th>
                <th>Notes</th>
            </tr>
            {inspectorInfo}
            </table>
        </div>
    )
}

export default InspectorInformation;