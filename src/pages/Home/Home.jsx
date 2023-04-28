import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Joblist from '../../components/Joblist';
import CreateJob from '../CreateJob/CreateJob';
import SearchPage from '../../components/SearchPage';
import './Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreJobs, setNoMoreJobs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadMoreJobs();
  }, []);

  const loadMoreJobs = () => {
    const limit = 12;
    fetch(`http://localhost:8000/jobs`)
      .then(response => response.json())
      .then(newJobs => {
        if (newJobs.length === 0) {
          setNoMoreJobs(true);
        } else {
          const filteredJobs = newJobs.filter(newJob => !jobs.some(job => job.id === newJob.id));
          setJobs(prevJobs => [...prevJobs, ...filteredJobs.reverse().slice(0, limit)]);
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => console.error('Error fetching jobs:', error));
  };

  const navigateToCreateJob = () => {
    navigate('/create');
  };

  return (
    <>
      <Header />
      <SearchPage />
      <div className="create-job-container">
        <button className="create-job-btn" onClick={navigateToCreateJob}>
          Create a new job post
        </button>
      </div>
      <Joblist jobs={jobs.slice(0, page * 12)} />

      {noMoreJobs ? (
        <p>No more jobs</p>
      ) : (
        <div className="a-more-container">
          <button className="a-more" onClick={loadMoreJobs}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
