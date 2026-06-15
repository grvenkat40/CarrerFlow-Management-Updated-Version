import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBars'
import Header from './components/Header'
import PageComponents from './layouts/PageComponents'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProtectedRoutes from './components/ProtectedRoutes'
// import Dashboard from './pages/Dashboard'
// import Skills from './components/Skills'
// import JobApplication from './pages/JobApplication'
// import TrackerJobApp from './pages/TrackerJobApp'
 
function App() {

  const [sessionExpired, setSessionExpired] = useState(false);

  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='login' element={<LoginPage />}/>
      <Route path="/users/:username/*" element={
        <ProtectedRoutes>
          <MainLayout />
        </ProtectedRoutes>
      } 
      />

    </Routes>
  )
}
 
export default App;

