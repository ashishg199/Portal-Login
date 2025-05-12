import {React, useState } from 'react';
import{ Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { About } from './pages/About';
import { Contact } from './pages/Contact';


function App() {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  console.log('isLoggedIn::: ', isLoggedIn);

  const setIsLoggedIn = (booleanVal) => {
    if(booleanVal){
      localStorage.setItem("token", "my-token");
    }else{
      localStorage.removeItem("token");
    }
    setIsLoggedInState(booleanVal);
  }

  return (
    <ErrorBoundary>
    <div className="w-screen h-screen bg-richblack-900 flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
      <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/dashboard' element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
        </PrivateRoute>
      }/> 
      </Routes>
    </div>
    </ErrorBoundary>
  )
}

export default App;
