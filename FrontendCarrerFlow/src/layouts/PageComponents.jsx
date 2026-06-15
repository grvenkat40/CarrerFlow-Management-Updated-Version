
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Skills from '../pages/Skills'
import JobApplication from '../pages/JobApplication'
import TrackerJobApp from '../pages/TrackerJobApp'
import UserAccount from "../pages/UserAccount"

const PageComponents = () => {


  
  return (
    <div className='routeContainer'>
            <Routes>
              <Route path='account' element={<UserAccount />}></Route>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path='skills' element={<Skills />}></Route>
              <Route path='createApplication' element={<JobApplication />}></Route>
              <Route path='trackApplication' element={<TrackerJobApp />}></Route>
            </Routes>
    </div>

  )
}

export default PageComponents