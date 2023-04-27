import React from 'react';
import { Link } from 'react-router-dom';

function JobList(props) {
  const { jobs } = props;

  return (
    <div>
      <ul className='container'>
        {jobs.map(job => (
          <li key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <div className='li-content'>
                <div className='background-img'>
                  <img src={job.company_logo} alt={job.company} />
                </div>
                <div className='card-content'>
                  <div className='li-content2'>
                    <span>{job.postedSince}</span>
                    <p>.</p>
                    <span>{job.type}</span>
                  </div>
                  <h2>{job.title}</h2>
                  <span className='company-title'>{job.company}</span>
                  <p className='location-title'>{job.location}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {jobs.length === 0 && <p>No jobs found</p>}
    </div>
  );
}

export default JobList;
