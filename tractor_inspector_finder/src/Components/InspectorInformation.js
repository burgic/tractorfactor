import React, {useState, useEffect} from 'react';


const InspectorInformation = ({inspectorsInfo, searchDistance}) => {
    
    const inspectorInfo = inspectorsInfo.map((inspector, index) => {
        if (inspector.distance < searchDistance){
 
        return <li key={index}><span className="bold">Address: </span>{inspector.address} <span className="bold">Distance</span>{inspector.distance} miles away</li>
        } 
    } )
    
    return (
        <div className ="inspector-information">
            <h2>Inspector Information</h2>
            <ul>{inspectorInfo}</ul>
        </div>
    )
}

export default InspectorInformation;