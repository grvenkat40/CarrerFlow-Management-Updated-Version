import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/JobApplicationPage.css"

const JobApplication = () => {

  const userID = localStorage.getItem("userID");

  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [salary, setSalary] = useState('');
  const [jobstatus, setStatus] = useState("Saved");

  const [addedMsg, setMsg] = useState("");

  const [savedApplications, setsavedApplications] = useState([]);
  
  const fetchApplications = async() =>{
    
    try{
      const token = localStorage.getItem("access");

      const response = await fetch(`http://127.0.0.1:8000/user/${userID}/saved/`, {
        method : "GET",
        headers : {
          Authorization : `Bearer ${token}`
        },
      });

      const data = await response.json();
      if(response.ok){
        setsavedApplications(data);
      }else {
        console.log(data);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    fetchApplications();
  }, []);

  const CloseOverlay = () =>{
    const Addoverlay = document.querySelector(".applicationOverlay");
    Addoverlay.style.display = "none";
  };

  const OpenAddOverlay = () =>{
    const Addoverlay = document.querySelector(".applicationOverlay");
    Addoverlay.style.display = "flex";
  };

  window.addEventListener("click", (e) =>{
    const Addoverlay = document.querySelector(".applicationOverlay");
    if(e.target == Addoverlay){
      CloseOverlay();
    }
  });

  const triggerAddApplication = async() =>{
    if(!companyName || !roleName || !location || !jobType || !sourceName || !salary){
      alert("Try to fill all the fields !");
      return;
    }

    const applicationDetails = {
      companyName : companyName,
      roleName : roleName,
      location : location,
      jobType : jobType,
      sourceName : sourceName,
      salary : salary,
      status : jobstatus,
    }

    try{
      const token = localStorage.getItem("access");

      const response = await fetch(`http://127.0.0.1:8000/user/${userID}/createJob/`, {
        method : "POST",
        headers : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body : JSON.stringify(applicationDetails)
      });

      const data = await response.json()
      if(response.ok){
        setCompanyName("");
        setRoleName("");
        setLocation("");
        setJobType("");
        setSourceName("");
        setSalary("");
        setStatus("Saved");

        await fetchApplications();
        document.querySelector(".applicationOverlay").style.display = "none";
        setMsg(`✅ ${roleName} is added!`);
        setTimeout(() =>{
          setMsg("");
        }, 3000);
      }else{
        console.log(data);
      }
    }catch(error){
      console.error(error);
    }
  };

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
        setsavedApplications((prev) => prev.filter((job) => job.id !== job_id));
        setMsg(`❌ ${role} deleted`);
        setTimeout(()=>{
          setMsg("");
        },3000)
      };
    }catch(error){
      console.log(error);
    }
  };

  const triggerApply = async(job_id) =>{
    try{
      const token = localStorage.getItem("access");

      const response = await fetch(`http://127.0.0.1:8000/user/${job_id}/updateStatus/`, {
        method : 'POST',
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          status : jobstatus
        })
      });
      const data = await response.json();

      if(response.ok){
        setsavedApplications(prev => prev.filter((jobs) => jobs.id !== job_id))
        setMsg("✅Applied");
        setTimeout(() =>{
          setMsg("");
        }, 3000)
      }else{
        console.log(data);
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='applicationPage'>
      <div className='applicationPageTop'>
        <h1>JobApplication</h1>
        <button onClick={OpenAddOverlay}>+ Job Application</button>
      </div> 
      {addedMsg && 
        <div className='displayMsg'>
          <p>{addedMsg}</p>
        </div>
      }
      <div className='applicationOverlay'>
        <div className='applicationContainerr'>
          <div className='appHeader'>
            <h2>Add application <hr /></h2>
            <a onClick={CloseOverlay} className='closeBtn' title='Close'>✖</a>
          </div>

          <div className='formGrid'>
            <div className='formField'>
              <label>Company name</label>
              <input type='text' placeholder='e.g. Google' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className='formField'>
              <label>Role</label>
              <input type='text' placeholder='e.g. Frontend dev' value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>
            <div className='formField'>
              <label>Location</label>
              <input type='text' placeholder='e.g. Remote' value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className='formField'>
              <label>Job type</label>
              <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value=''>Select type</option>
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Contract'>Contract</option>
                <option value='Internship'>Internship</option>
                <option value='Freelance'>Freelance</option>
              </select>
            </div>
            <div className='formField'>
              <label>Source</label>
              <input type='text' placeholder='e.g. LinkedIn' value={sourceName} onChange={(e) => setSourceName(e.target.value)} />
            </div>
            <div className='formField'>
              <label>Salary</label>
              <input type='text' placeholder='e.g. 80,000' value={salary} onChange={(e) => setSalary(e.target.value)} />
            </div>
          </div>

          <button onClick={triggerAddApplication}>Add application</button>
        </div>
      </div>
      <div className='savedapplicationContainer'>
        {
          savedApplications && savedApplications.length > 0 ? (
              savedApplications.map((job) => (
                <div key={job.id} className='applicationCard'>
                  <div className='cardHeader'>
                    <div className='companyInitials'>
                      {job.companyName.charAt(0).toUpperCase()}
                    </div>
                    <div className='cardTitle'>
                      <h3>{job.companyName}</h3>
                      <p>{job.roleName}</p>
                    </div>
                    <a className='deleteApp' onClick={() => deleteApplication(job.id, job.roleName)} title='Delete'>✖</a>
                  </div>

                  <div className='cardDetails'>
                    <span><i className='ti ti-map-pin' /> {job.location}</span>
                    <span><i className='ti ti-briefcase' /> {job.jobType}</span>
                    <span><i className='ti ti-currency-dollar' /> {job.salary}</span>
                    <span><i className='ti ti-world' /> {job.sourceName}</span>
                  </div>

                  <div className='cardFooter'>
                    <p className='cardDate'>{job.created_at}</p>
                    <button title='Apply' onClick={() => triggerApply(job.id)}>Apply</button>
                  </div>
                </div>
              ))
          ) : (
            <div className='noApplications'>
              <h3>No Applications Saved!</h3>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default JobApplication;