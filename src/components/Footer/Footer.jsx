import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const [job, setJob] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/jobs')
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.log(error));
  }, []);

  return (
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
  );
}

export default Footer;
