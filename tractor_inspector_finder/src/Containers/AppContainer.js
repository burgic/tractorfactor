
import {Link, Outlet} from 'react-router-dom';
import React from 'react';

const AppContainer = () => {

    return (
        <div>

            <h1>App Container</h1>
            <nav>

                <Link to="admin">Admin</Link>

            </nav>

            <Outlet />


        </div>
    )
}

export default AppContainer;