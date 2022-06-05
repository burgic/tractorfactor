import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom';
import HomeContainer from '../Containers/HomeContainer';
import AppContainer from '../Containers/AppContainer';
import AdminContainer from '../Containers/AdminContainer';


const pages = ["Home", "Admin"];
const settings = ["Home", "Admin"];

const Header = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                {/* <Typography> */}
                    <Link to={`/${pages}`}>{pages}</Link>
                        
                    
                    {/* <Link to="/"><b>Home</b></Link> */}
                {/* <BrowserRouter>

        <Routes>
            <Route path="/" element={<AppContainer />} >
            <Route path="/" element={<HomeContainer />} />
            <Route path="/admin" element={<AdminContainer />} />
        </Route>
        </Routes>

</BrowserRouter> */}

                {/* </Typography> */}
            </Toolbar>

        </AppBar>
    );

}

export default Header;
