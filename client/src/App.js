import React from 'react'
import MyForm from './Components/MyForm'
import AllUsers from './Components/AllUsers'
import './index.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/list-users" element={<AllUsers/>}/>
          <Route path="/" element={<MyForm/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App