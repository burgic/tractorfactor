import React, {useState, useEffect} from 'react';


const InspectorInformation = ({inspectorsInfo, searchDistance}) => {

    

    // const [inspectorMappedInfo, setInspectorMappedInfo] = useState(null)
    // const [sortedInspectors, setSortedInspectors] = useState(null)

    // useEffect(()=> {
    //     breakDownInspectorsInfo()
    // }, [])

    
    // const breakDownInspectorsInfo = () => {
    //     const sorted = [...inspectorsInfo]
    //     setInspectorMappedInfo(sorted)
       
    // }

//     var Arr = [1, 7, 2, 8, 3, 4, 5, 0, 9];

// for (var i = 1; i < Arr.length; i++)
//     for (var j = 0; j < i; j++)
//         if (Arr[i] < Arr[j]) {
//           var x = Arr[i];
//           Arr[i] = Arr[j];
//           Arr[j] = x;
//         }

// console.log(Arr);
   
    
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