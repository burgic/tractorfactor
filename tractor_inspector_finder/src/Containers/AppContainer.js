
import {Link, Outlet} from 'react-router-dom';
import React from 'react';

const AppContainer = () => {

    return (
        <>
        

        <div className="nav-bar">

            <h1>Tractor Factor</h1>
            <nav>

                <Link to="/"> Home</Link>
                <Link to="admin"> Admin     </Link>

            </nav>
        
        </div>
            <Outlet />

        </>
    )
}

export default AppContainer;