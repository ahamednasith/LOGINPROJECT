import React from "react";
import Signup from "./component/Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './component/Login';
import Home from "./component/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
