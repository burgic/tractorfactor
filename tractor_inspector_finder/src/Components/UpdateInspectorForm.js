import React from "react";
const UpdateInspectorForm = ({inspectorToUpdate}) => {

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(evt.target.value)
    }


    return (
        <>
            <h2>Update</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inspectorToUpdate.name}></input>
                <input type="submit" value="update"></input>

            </form>
        </>
    )
}
export default UpdateInspectorForm;