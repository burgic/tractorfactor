
import {Link, Outlet} from 'react-router-dom';
import React from 'react';

const AppContainer = () => {

    return (
        <div>

            <nav>

                <Link to="admin">Admin</Link>
                <Link to="/"> Home</Link>

            </nav>

            <Outlet />


        </div>
    )
}

export default AppContainer;