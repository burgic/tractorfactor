import React, {useState, useEffect} from 'react';

import InspectorInformationItem from './InspectorInformationItem';


const InspectorInformation = ({inspectorsInfo, searchDistance}) => {
    
    //need to make a component for inspector information item

    
    const inspectorInfo = inspectorsInfo.map((inspector, index) => {
        if (inspector.distance < searchDistance){
        let letter = String.fromCharCode("A".charCodeAt(0) + index)
        return <InspectorInformationItem letter={letter} inspector={inspector} key={index}/>
        
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