import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './CountryActivities.module.css';
import activitiesImage from '../../assets/TouristicActivities.jpeg';

function CountryActivities() {
  const { id } = useParams();
  const [countryName, setCountryName] = useState('');
  const [activities, setActivities] = useState([]);
  const [deletedActivity, setDeletedActivity] = useState(null); // State to keep track of the recently deleted activity

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/countries/${id}/activities`);
        setActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    axios.get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
        setCountryName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchActivities();
  }, [id]);

  //?DELETE ACTIVITY
  const handleDeleteActivity = (activityName) => {
    const activityToDelete = activities.find((activity) => activity.name === activityName);
    setDeletedActivity(activityToDelete);
    const updatedActivities = activities.filter((activity) => activity.name !== activityName);
    setActivities(updatedActivities);
  };

  //?UNDO DELETE
  const handleUndoDelete = () => {
    if (deletedActivity) {
      setActivities([...activities, deletedActivity]);
      setDeletedActivity(null);
    }
  };

  return (
    <div>
      <h1 className={styles.Title}>Touristic Activities in: {countryName}</h1>
      <div className={styles.TouristicImage}>
        <img src={activitiesImage} className={styles.enterFromLeft} alt="Activities" />
      </div>

      <div className={styles.DetailCard}>
        {activities.length > 0 ? (
          <ul className={styles.content}>
            {activities.map((activity, index) => (
              <div key={index}>
                <h3>{activity.id}</h3>
                <h3 className={styles.MainLabel}>{activity.name}</h3>
                <h4 className={styles.Label}>Type:</h4> {activity.type}<br />
                <h4 className={styles.Label}>Description:</h4> {activity.description}<br />
                <h4 className={styles.Label}>Difficulty:</h4> {activity.difficulty}<br />

                <div className={styles.progressContainer}>
                  <div className={styles.progressBar} style={{ width: `${activity.difficulty * 20}%` }}></div>
                </div>

                <h4 className={styles.Label}>Duration:</h4> {activity.duration}<br />
                <h4 className={styles.Label}>Season:</h4> {activity.season}
                <button className={styles.Removalbutton} onClick={() => handleDeleteActivity(activity.name)}>
                 DELETE ACTIVITY
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <p>No activities available for this country.</p>
        )}

        {deletedActivity && (
          <button className={styles.Button} onClick={handleUndoDelete}>
          <span className={styles.ButtonSpan}>UNDO DELETE</span>
          </button>
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
