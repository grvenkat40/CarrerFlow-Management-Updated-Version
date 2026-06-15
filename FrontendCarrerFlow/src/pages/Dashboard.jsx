import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import JobsCount from './DashboardComponent/JobsCount';
import ApplicationChart from './DashboardComponent/ApplicationChart';
import RecentActivity from './DashboardComponent/RecentActivity';

const Dashboard = () => {

  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const {username} = useParams();

  return (
    <div className='dashbaord'>
      {
        sessionExpired && (
          <div className="SessionOverlay">
            <div className="sessionBox">
              <h2>Session Expired</h2>
              <p>
                Please login again to continue.
              </p>
              <button
                onClick={() => navigate("/login")}
              >
                Login Again
              </button>
            </div>
          </div>
        )
      }
      <h1>Dashboard</h1>
      <p>Welocome back <span>{username.toUpperCase()}</span>, Here's an overview of your career progress.</p>
      <div className='dashboardComponents'>
        <JobsCount />
        <h2>Applications overview</h2>
        <div className='ChartsandRecent'>
          
          <ApplicationChart />
          <RecentActivity />
        </div>
      </div> 
    </div>
  )
}

export default Dashboard