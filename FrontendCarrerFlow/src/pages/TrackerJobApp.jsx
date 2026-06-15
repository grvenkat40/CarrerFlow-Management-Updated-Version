import React, {useState, useEffect} from "react";
import "../styles/TrackerJob.css";

const TrackerJobApp = () => {

  const userID = localStorage.getItem("userID");
  const [jobs, setJobs] = useState([]);

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [notAllowedMsg, setNotAllowedMsg] = useState("");

  const [selectedStatus, setSelectedStatus] = useState(
    selectedJob?.status || ""
  )

  const [updatedMsg, setMsg] = useState("");

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Accepted",
    "Rejected",
  ];

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/user/alljobs/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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

  const onOverlay = (job) => {
    setSelectedJob(job);
    setSelectedStatus(job.status);
    setShowOverlay(true);
  };

  const offOverlay = () => {
    setShowOverlay(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    if(selectedJob){
      setSelectedStatus(selectedJob.status);
    }
  }, [selectedJob]);

  const updateStatus = async() =>{
    const currentStatus = selectedJob.status;
    const newStatus = selectedStatus;

    if (["Accepted", "Rejected"].includes(currentStatus)) {
      setNotAllowedMsg(
        `Application is already ${currentStatus}. Further status changes are not allowed.`
      );
      setTimeout(() => {
        setNotAllowedMsg("");
      }, 3000);

      return;
    }

    const currentIndex = statuses.indexOf(currentStatus);
    const newIndex = statuses.indexOf(newStatus);

    if (newIndex <= currentIndex) {
      setNotAllowedMsg(
        "Job status cannot be moved backwards."
      );

      setTimeout(() => {
        setNotAllowedMsg("");
      }, 3000);

      return;
    }

    try{
      const token = localStorage.getItem("access");

      const response = await fetch(
        `http://127.0.0.1:8000/user/${selectedJob.id}/updateStatus/`,
        {
          method : "POST",
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json", 
          },
          body : JSON.stringify({
            status : selectedStatus
          })
        }
      );
      const data = await response.json();

      if(response.ok){
        setJobs((prev) => 
          prev.map((job) => 
            job.id === selectedJob.id
            ? {...job, status:selectedStatus} : job
          )
        )
        offOverlay(false);
        setMsg("job status updated!");
        setTimeout(() =>{
          setMsg("");
        },3000)
      }else{
        setNotAllowedMsg(data.message);
        setTimeout(() =>{
          setNotAllowedMsg("");
        }, 3000)
        console.log(data);
      }
      
    }catch(error){
      console.log(error, "here");
    }
  }

  const deleteApplication = async(job_id, role) =>{
    try{
      const token = localStorage.getItem("access");

      const confirmed = window.confirm(
        `Do you want to delete ${role}?`
      );

      if (!confirmed) return;
      const response = await fetch(`http://127.0.0.1:8000/user/${userID}/job/${job_id}/delete/`, {
        method : 'DELETE',
        headers : {
          Authorization : `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if(response.ok){
        setJobs((prev) =>
          prev.filter((job) => job.id !== job_id)
        );
        offOverlay();
        setMsg(`❌ ${role} deleted`);
        setTimeout(()=>{
          setMsg("");
        },3000)
      };
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="trackerPage">

      {showOverlay && selectedJob && (
        <div className="JobOverlay" onClick={offOverlay}>
          <div className="jobContainer" onClick={(e) => e.stopPropagation()}>
            <div className="job-header">
              
              <div>
                <p className="job-company">{selectedJob.companyName}</p>
                  <p className="job-role">{selectedJob.roleName}</p>
                <div className="overlayDelete">
                  <p className="job-date">Last Updated : {selectedJob.updated_at}</p>
                  <button title="Delete Job" onClick={() => deleteApplication(selectedJob.id, selectedJob.roleName)}>Delete job</button>
                </div>
              </div>
              <button className="close-btn" aria-label="Close" onClick={offOverlay}>✕</button>
            </div>
            <hr className="divider"/>
            <p className="section-label">
              Current Status :
              <span className="status-badge"> {selectedJob.status}</span>
            </p>
            <div className="status-grid">
              {
                statuses.map((status) =>{
                  return(
                    <button key={status} 
                      className={`status-btn ${selectedStatus === status ? `active-${status.toLowerCase()}` : ""}`} 
                      onClick={() => setSelectedStatus(status)}>
                      <span className={`dot dot-${status.toLowerCase()}`}></span> 
                      {status}
                    </button>
                  );
                })
              }
            </div>
            <p className="notes-label">Notes (optional)</p>
            <textarea className="notes-input" rows="2" placeholder="e.g. HR call scheduled..."></textarea>
            <div className="action-row">
              <button className="btn-cancel" onClick={offOverlay}>Cancel</button>
              <button className="btn-save" onClick={updateStatus}>Save status</button>
            </div>
            <div className="errorMsg">
              <p>{notAllowedMsg}</p>
              </div>
          </div>
        </div>
      )}

      <div className="pageTop">
        <div className="pageTop1">
          <h1>Application Tracker</h1>
          <p>
            Track your job applications and add notes to improve yourself.
          </p>
        </div>
        <div className="pageTop2">
          {updatedMsg && 
            <p>{updatedMsg}</p>
          }    
         </div>
      </div>

      <div className="applicationContainer">
      {statuses.map((status) => (
        <div className="status_col" key={status}>
          <div id="col_header">
            <h3>
              <i className="fa-solid fa-paper-plane"></i>
              {status}
            </h3>
          </div>

          <div className="Jobcards">
            {jobs
              .filter((job) => job.status === status)
              .map((job) => (
                <div key={job.id} onClick={() => onOverlay(job)}>
                  <h3>{job.companyName}</h3>
                  <p>{job.roleName}</p>
                  <p>{job.updated_at}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TrackerJobApp;