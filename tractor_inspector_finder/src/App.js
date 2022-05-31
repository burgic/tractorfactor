import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AdminContainer from './Containers/AdminContainer';
import AppContainer from './Containers/AppContainer';
import HomeContainer from './Containers/HomeContainer';
import React from 'react';



function App() {
  return (

    <>
    <h1>Find me an inspector</h1>
    <BrowserRouter>

    <Routes>
        <Route path="/" element={<AppContainer />} >
        <Route path="/" element={<HomeContainer />} />
        <Route path="/admin" element={<AdminContainer />} />
      </Route>
    </Routes>

    </BrowserRouter>

    </>


  );
}

export default App;
