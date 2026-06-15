import React,{useEffect, useState} from "react";


const RecentActivity = () => {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/user/recentActivity/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setJobs(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>

      <div className="activity-list" >
        {jobs.map((item) => (
          <div className="activity-card" key={item.id}>
            <div className="activity-info">
              <h3>{item.companyName}</h3>
              <p>
                Application moved to <strong>{item.status}</strong>
              </p>
            </div>

            <span>
              {new Date(item.updated_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;