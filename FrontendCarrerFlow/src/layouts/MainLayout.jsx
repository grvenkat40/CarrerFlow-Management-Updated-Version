import NavBar from '../components/NavBars'
import Header from '../components/Header'
import PageComponents from '../layouts/PageComponents'
import { Route, Routes } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="appContainer">
      <NavBar />
      <div className="mainContent">
        <Header />
        <div className="pageContent">
          <div>
            <PageComponents />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout