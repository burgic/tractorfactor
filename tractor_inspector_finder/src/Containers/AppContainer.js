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
        <header className="nav-bar">
            <Link to="/" activeStyle={{color: "red",textDecoration:"none"}}><h1 onClick={handleLandingTrueClick}>TractorFactor</h1></Link>
            <nav>
                <Link to="/" onClick={handleLandingFalseClick} activeStyle={{color: "red",textDecoration:"none"}}> Home</Link>
                <Link to="admin" onClick={handleLandingFalseClick}> Admin</Link>
            </nav>
        </header>

        {isLanding ? <Landing handleLandingClick={handleLandingClick} /> :<Outlet />}
            
        
        <footer className="footer">
            <h5>ooR Industries &copy;</h5>
        </footer>
        </>
    )
}

export default AppContainer;