import React, {useState, useEffect} from 'react';


const InspectorInformation = ({inspectorsInfo}) => {

    // const [inspectorInfo, setInspectorInfo] = useState(null)
    // const [sortedInspectors, setSortedInspectors] = useState(null)

    // useEffect(() => {
    //     sortInspectors()
    // }, [])
    
    // const sortInspectors = () => {
    //         let newArray = []
    //         for(let i=0; i<inspectorsInfo.length; i++){
    //             console.log(inspectorsInfo[i])
    //         }
    //         setSortedInspectors(inspectorsInfo)
    // }


    // useEffect(() => {
    //     if (sortedInspectors !== null){
    //     mapInspectorInfo()
    //     }
    // }, [sortedInspectors])

    // const mapInspectorInfo = () => {
    //     const inspectorTheInfo = sortedInspectors.map((inspector, index) => {
    //         return <li key={index}>{inspector.address} {inspector.distance} miles away</li>
    //     })
    //     setInspectorInfo(inspectorTheInfo)
    // }

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