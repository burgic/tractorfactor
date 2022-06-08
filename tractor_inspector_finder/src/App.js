import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AdminContainer from './Containers/AdminContainer';
import AppContainer from './Containers/AppContainer';
import HomeContainer from './Containers/HomeContainer';
import React from 'react';
import './App.css';


function App() {

  return (
    <div className="App">
      
      <BrowserRouter>

      <Routes>
          <Route path="/" element={<AppContainer />} >
          <Route path="/" element={<HomeContainer />} />
          <Route path="/admin" element={<AdminContainer />} />
        </Route>
      </Routes>

      </BrowserRouter>

    </div>


  );
}

export default App;
