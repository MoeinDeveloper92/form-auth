import React from 'react'
import Header from './components/Header'
import { Routes, Route } from "react-router-dom"
import HomeScreen from './pages/HomeScreen'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProfileScree from './pages/ProfileScree'
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <div className=' w-full bg-base-300 h-screen flex flex-col justify-between'>
      <Header />
      <main className='p-2 '>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/auth' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='' element={<PrivateRoute />}>
            <Route path='/profile' element={<ProfileScree />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App