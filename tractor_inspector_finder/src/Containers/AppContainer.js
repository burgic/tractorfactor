import {useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import React from 'react';
import Landing from '../Components/Landing'

const AppContainer = () => {

    const [isLanding, setIsLanding] = useState(true)

    const handleLandingClick = () => {

        setIsLanding(!isLanding)
    }

    return (
        <>
        

        <div className="nav-bar">

            <h1>TractorFactor</h1>
            <nav>

                <Link to="/"> Home</Link>
                <Link to="admin"> Admin     </Link>

            </nav>
        
        </div>

        {isLanding ? <Landing handleLandingClick={handleLandingClick} /> :<Outlet />}
            
            

        </>
    )
}

export default AppContainer;