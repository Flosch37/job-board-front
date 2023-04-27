import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Single.css';

function Single() {
  const [job, setJob] = useState({});
  const { jobId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/jobs/${jobId}`)
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error('Error fetching job:', error));
  }, [jobId]);

  return (
    <>

    <Header job={job} />
      <header className="header">
        <img src="../img/typemaster.svg" alt={job.company} />
        <div className="job-info">
          <h2>{job.company}</h2>
          <span>{job.postedSince}</span>
          <p>.</p>
          <span>{job.type}</span>
        </div>
        <a className="btn-secondary" href={job.companySite}>Company Site</a>
      </header>

      <main className="main">
        <div className="job-details">
          <h1>{job.title}</h1>
          <span className="job-location">{job.location}</span>
          <button className="btn-primary">Apply Now</button>

          <div className="job-description">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </div>

          <div className="job-requirements">
            <h2>Requirements</h2>
            <ul>
              {job?.requirements?.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="job-what-we-do">
            <h2>What You Will Do</h2>
            <ol>
              {job?.whatWeDo?.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <h2>{job.title}</h2>
            <span>{job.company}</span>
          </div>
          <div className='a-more-now'>
            <a className='a-now' href="#">Apply Now</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Single;
