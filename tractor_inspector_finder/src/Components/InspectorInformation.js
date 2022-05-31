import React from 'react';

const InspectorInformation = ({inspectorsInfo}) => {


    const inspectorInfo = inspectorsInfo.map((inspector, index) => {
        return <li key={index}>{inspector.address} {inspector.distance} miles away</li>
    })

    return (
        <>
            <h2>Inspector Information</h2>
            <ul>{inspectorInfo}</ul>
        </>
    )
}

export default InspectorInformation;