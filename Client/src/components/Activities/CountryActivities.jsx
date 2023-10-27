import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './CountryActivities.module.css';

import activitiesImage from '../../assets/TouristicActivities.jpeg'

function CountryActivities() {
  const { id } = useParams();
  const [countryName, setCountryName] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Primero, obtén el nombre del país utilizando su ID
    axios.get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
        setCountryName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });

    // Luego, obtén las actividades para ese país
    axios.get(`http://localhost:3001/countries/${id}/activities`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

 
  return (
  <div>
    <h1 className={styles.Title}>Touristic Activities in: {countryName}</h1>
    <div className={styles.TouristicImage} >
    <img  src={activitiesImage} className={styles.enterFromLeft}></img>
    </div> 
    
    <div className={styles.DetailCard}>
      {activities.length > 0 ? (
        <ul className={styles.content}>
          {activities.map((activity, index) => (
            <p key={index}>
              <h3 className={styles.MainLabel}>{activity.name}</h3> 
              <h4 className={styles.Label}>Type:</h4> {activity.type}<br />
              <h4 className={styles.Label}>Description:</h4> {activity.description}<br />
              <h4 className={styles.Label}>Difficulty:</h4> {activity.difficulty}<br />
             
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${activity.difficulty * 20}%` }} >
                </div>
                </div>

              <h4 className={styles.Label}>Duration:</h4> {activity.duration}<br />
              <h4 className={styles.Label}>Season:</h4> {activity.season}
            </p>
          ))}
        </ul>
      ) : (
        <p>No activities available for this country.</p>
      )}
       <Link to={`/detail/${id}/`}>
        <button className={styles.Button}>
          <span className={styles.ButtonSpan}>Back to {countryName}</span>
          </button>
    </Link>
    </div>
   
  </div>
);
}

export default CountryActivities;
