import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Joblist from '../../components/Joblist';
import SearchPage from '../../components/SearchPage';
import './Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreJobs, setNoMoreJobs] = useState(false);

  useEffect(() => {
    // charger les offres de jobs initiales (première page)
    loadMoreJobs();
  }, []);

  const loadMoreJobs = () => {
    const limit = 12;
    fetch(`http://localhost:8000/jobs?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(newJobs => {
        if (newJobs.length === 0) {
          // toutes les offres de jobs ont été chargées
          setNoMoreJobs(true);
        } else {
          // ajouter les nouvelles offres de jobs à l'état `jobs`
          const filteredJobs = newJobs.filter(newJob => !jobs.some(job => job.id === newJob.id));
          setJobs(prevJobs => [...prevJobs, ...filteredJobs.slice(0, limit)]);
          // incrémenter le numéro de page
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => console.error('Error fetching jobs:', error));
  };

  return (
    <>
      <Header />
      <SearchPage />
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
