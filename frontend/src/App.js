import React from 'react'
import Header from './components/Header'
import { Routes, Route } from "react-router-dom"
import HomeScreen from './pages/HomeScreen'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import Footer from './components/Footer'
function App() {
  return (
    <div className=' w-full bg-base-300 h-screen flex flex-col justify-between'>
      <Header />
      <main className='p-2'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/auth' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App