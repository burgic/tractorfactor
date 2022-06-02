import React, {useState, useEffect} from 'react';


const InspectorInformation = ({inspectorsInfo}) => {

    const [inspectorInfo, setInspectorInfo] = useState(null)
    const [sortedInspectors, setSortedInspectors] = useState(null)

    useEffect(() => {
        if (sortedInspectors !== null){
        mapInspectorInfo()
        }
    }, [sortedInspectors])

    const mapInspectorInfo = () => {
        const inspectorTheInfo = sortedInspectors.map((inspector, index) => {
            //sort here
            return <li key={index}>{inspector.address} {inspector.distance} miles away</li>
        })
        setInspectorInfo(inspectorTheInfo)
    }
    

    useEffect(() => {
        
        sortInspectors()
        
    }, [])
    
    const sortInspectors = () => {
        
        setSortedInspectors(inspectorsInfo.sort((a,b) => (a.distance, b.distance) ? 1 : -1))
    }

    return (
        <>
            <h2>Inspector Information</h2>
            <ul>{inspectorInfo}</ul>
        </>
    )
}

export default InspectorInformation;