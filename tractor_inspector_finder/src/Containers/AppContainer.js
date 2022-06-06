import {useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import React from 'react';
import Landing from '../Components/Landing'

const AppContainer = () => {

    const [isLanding, setIsLanding] = useState(true)

    const handleLandingClick = () => {

        setIsLanding(!isLanding)
    }

    const handleLandingFalseClick = () => {
        setIsLanding(false)
    }

    const handleLandingTrueClick = () => {
        setIsLanding(true)
    }

    return (
        <>
        

        <div className="nav-bar">

            <Link to="/"><h1 onClick={handleLandingTrueClick}>TractorFactor</h1></Link>
            <nav>

                <Link to="/" onClick={handleLandingFalseClick}> Home</Link>
                <Link to="admin" onClick={handleLandingFalseClick}> Admin</Link>

            </nav>
        
        </div>

        {isLanding ? <Landing handleLandingClick={handleLandingClick} /> :<Outlet />}
            
            

        </>
    )
}

export default AppContainer;