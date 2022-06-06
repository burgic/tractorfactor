import React from 'react';
const Landing = ({handleLandingClick}) => {

    const handleClick = (evt) => {

        handleLandingClick()

    }


    return(
        <>
            
                <div className="landing-page">
                <div className="shading-div">
                    <h1 className="landing-header">TractorFactor</h1>
                    <button onClick = {handleClick}>Get Started</button>


                </div>
            </div>
        </>

    )
}
export default Landing;