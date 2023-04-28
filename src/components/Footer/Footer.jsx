import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const [job, setJob] = useState({});

  useEffect(() => {
    const url = window.location.href;
    const segments = url.split('/');
    const jobId = segments[segments.length - 1];

    const fetchJob = async () => {
      const response = await fetch(`http://localhost:8000/jobs/${jobId}`);
      const data = await response.json();
      setJob(data);
    };

    fetchJob();
  }, []);


  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h2>{job.title}</h2>
          <span>{job.company}</span>
        </div>
        <div className='a-more-now'>
          <a className='a-now' href={job?.applyLink}>Apply Now</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
