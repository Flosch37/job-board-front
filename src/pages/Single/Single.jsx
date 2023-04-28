import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import typemasterimg from '../../assets/typemaster.svg';
import './Single.css';


function Single() {
  const { id } = useParams();
  const navigate = useNavigate(); 


  const [job, setJob] = useState({
    id: id,
    title: '',
    company: '',
    location: '',
    postedSince: '',
    type: '',
    description: '',
    requirements: {
      title: '',
      list: ['']
    },
    whatwedo: {
      title: '',
      list: ['']
    }
  });  

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(`http://localhost:8000/jobs/${id}`);
        const data = await response.json();
        setJob({
          id: data.id,
          title: data.title,
          company: data.company,
          location: data.location,
          postedSince: data.postedSince,
          type: data.type,
          description: data.description,
          requirements: {
            content: data.requirements.content,
            list: data.requirements.list
          },
          whatwedo: {
            content: data.whatwedo.content,
            list: data.whatwedo.list
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    getJob();
  }, []);

  console.log(job)
  
  const handleDelete = async () => {
    try {
      const data = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: 'DELETE',
      });
      const response = await data.json();
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      <Header />
      <header className="header-container">
        <div className='header'>
          <div className='header-left'>
              <div className='background-img-company'>
                <img src={typemasterimg} alt={job?.company} />
              </div>
              <div className="job-info">
                <h2>{job?.company}</h2>
              </div>
          </div>
            <a className="btn-secondary" href='https://example.com/'>Company Site</a>
        </div>
      </header>

      <main className="main">
        <div className='job-container'>
          <div className='update-delete-container'>
            <button className="btn-update" onClick={handleUpdate}>Update</button>
            <button className="btn-danger" onClick={handleDelete}>Delete</button>
          </div>
          <div className='job-details-container'>
            <div className="job-details">
              <div className="job-details-info">
                <span>{job?.postedSince}</span>
                <p>.</p>
                <span>{job?.type}</span>
              </div>
              <h1>{job?.title}</h1>
              <span className="job-location">{job?.location}</span>
            </div>
            <button className="btn-primary">Apply Now</button>


          </div>

          <div className="job-description">
            <h2 className='h2-form-single'>Job Description</h2>
            <p>{job?.description}</p>
          </div>
          <div className="job-requirements">
            <h2>Requirements</h2>
            <ul>
              {job?.requirements.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className='job-what-you-will-do'>
              <h2>What you will do</h2>
              <ul>
                {job?.whatwedo.list.map((item, index) => ( 
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Single;
