import React, { useEffect, useState } from "react";
import { authenticatedFetch } from "../../utils/auth";

const JobsCount = () => {
  const [jobCounts, setJobCounts] = useState({});

  const [sessionExpired, setSessionExpired] = useState(false);

  const Jobscnt = async () => {
    try {
      const token = localStorage.getItem("access");

      const response =
        await authenticatedFetch(
          "http://127.0.0.1:8000/user/jobStatuscount/",
          {},
          setSessionExpired
        );
      // const response = await fetch(
      //   "http://127.0.0.1:8000/user/jobStatuscount/",
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const data = await response.json();

      if (response.ok) {
        setJobCounts(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Jobscnt();
  }, []);

  return (
    <div className="countCards">
      <div className="cards">
        <h3>Total Applications</h3>
        <h1>{jobCounts.totalApplications}</h1>
        <p>All jobs overview</p>
      </div>

      <div className="cards">
        <h3>Applied</h3>
        <h1>{jobCounts.applied}</h1>
        <p>All jobs overview</p>
      </div>

      <div className="cards">
        <h3>Interviews</h3>
        <h1>{jobCounts.Interviews}</h1>
        <p>All jobs overview</p>
      </div>

      <div className="cards">
        <h3>Offers</h3>
        <h1>{jobCounts.Offers}</h1>
        <p>All jobs overview</p>
      </div>
    </div>
  );
};

export default JobsCount;