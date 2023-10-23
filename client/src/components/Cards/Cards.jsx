import React from 'react';
import Card from "../Card/Card";
import styles from '../Cards/StyledCards.module.css';

export default function Cards({ countries, onClose }) {
  return (
    <div className={styles.cardsContainer}>
      {countries.map((country) => (
        <Card
          key={country.id}
          id={country.id}
          flag={country.flag}
          name={country.name}
          continents={country.continents}
          area={country.area}
          subregion={country.subregion}
          population={country.population}
          onClose={onClose}
        >
          <div>
         
              {country.Activities.map((activity, index) => (
                <li key={index}>
                  <strong>Name:</strong> {activity.name}<br />
                  <strong>Type:</strong> {activity.type}<br />
                  <strong>Description:</strong> {activity.description}<br />
                  <strong>Difficulty:</strong> {activity.difficulty}<br />
                  <strong>Duration:</strong> {activity.duration}<br />
                  <strong>Season:</strong> {activity.season}
                </li>
              ))}
           
          </div>
        </Card>
      ))}
    </div>
  );
}
