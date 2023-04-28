import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './CreateJob.css';

function CreateJob() {
  const [job, setJob] = useState({
    id: 10209,
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  console.log(job);
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [fieldName, fieldChild, fieldIndex] = name.split("-");
    const newList = [...job[fieldName].list];
    if (fieldChild === "title") {
        setJob((prevJob) => ({
            ...prevJob,
            [fieldName]: {
                ...prevJob[fieldName],
                title: value,
            },
        }));
    } else {
        newList[fieldIndex - 1] = value;
        setJob((prevJob) => ({
            ...prevJob,
            [fieldName]: {
                ...prevJob[fieldName],
                list: newList,
            },
        }));
    }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataPost = await fetch('http://localhost:8000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      const data = await dataPost.json();
      console.log(data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }

    
  };

  return (
    <div>
      <Header />
      <div className='h1-container'>
        <h1> Create Job</h1>
      </div>
      <div className='background-form'>
        <div className='form-container'>
          <div className='form-content'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="company">Company:</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={job.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="postedSince">Posted Since:</label>
                <input
                  type="text"
                  id="postedSince"
                  name="postedSince"
                  value={job.postedSince}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="type">Type:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={job.type}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="requirements-title">Requirements title:</label>
                <textarea
                  id="requirements-title"
                  name="requirements-title"
                  value={job.requirements.title}
                  onChange={handleNestedChange}
                ></textarea>
                <label htmlFor="requirements-list-1">Requirements list:</label>
                <input
                type='text'
                  id="requirements-list-1"
                  name="requirements-list-1"
                  value={job.requirements.list[0]}
                  onChange={handleNestedChange}
                ></input>
                <label htmlFor="requirements-list-2">Requirements list:</label>
                <input
                type='text'
                  id="requirements-list-2"
                  name="requirements-list-2"
                  value={job.requirements.list[1]}
                  onChange={handleNestedChange}
                ></input>
                <label htmlFor="requirements-list-3">Requirements list:</label>
                <input
                type='text'
                  id="requirements-list-3"
                  name="requirements-list-3"
                  value={job.requirements.list[2]}
                  onChange={handleNestedChange}
                ></input>
              </div>
              <div>
                <label htmlFor="whatwedo-title">What we do:</label>
                <textarea
                  id="whatwedo-title"
                  name="whatwedo-title"
                  value={job.whatwedo.title}
                  onChange={handleNestedChange}
                ></textarea>
                <label htmlFor="whatwedo-list-1">What we do list:</label>
                <input
                type='text'
                  id="whatwedo-list-1"
                  name="whatwedo-list-1"
                  value={job.whatwedo.list[0]}
                  onChange={handleNestedChange}
                ></input>
                <label htmlFor="whatwedo-list-2">What we do list:</label>
                <input
                type='text'
                  id="whatwedo-list-2"
                  name="whatwedo-list-2"
                  value={job.whatwedo.list[1]}
                  onChange={handleNestedChange}
                ></input>
                <label htmlFor="whatwedo-list-3">What we do list:</label>
                <input
                type='text'
                  id="whatwedo-list-3"
                  name="whatwedo-list-3"
                  value={job.whatwedo.list[2]}
                  onChange={handleNestedChange}
                ></input>
              </div>
              <button className='create-btn' type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
