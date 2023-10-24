import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetail, cleanDetail } from '../../redux/actions';
import styles from './StyledDetail.module.css';
import buttons from '../../Styles/Buttons.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';



function Detail() {
  const { id } = useParams();
  const country = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => {
      dispatch(cleanDetail())
    }
  }, [dispatch, id]);

  const countryDetail = () => {
    console.log(country)
    if (country) {
     
      
      return (
        <div>
          <div className={styles.DetailCard}>
            
            <h2 className={styles.Title}>{country.name}</h2>
            <p className={styles.Label}>ID: {country.id}</p>
            <p className={styles.Label}>Continent: {country.continents}</p>
            <p className={styles.Label}>Capital: {country.capital}</p>
            {country.subregion ? (
              <p className={styles.Label}>Subregion: {country.subregion}</p>
            ) : (
              <p className={styles.Label}>Subregion: Information not available</p>
            )}
            {country.area ? (
              <p className={styles.Label}>Area: {country.area}</p>
            ) : (
              <p className={styles.Label}>Area: Information not available</p>
            )}
            <p className={styles.Label}>Population: {country.population}</p>
            {/* {renderActivities()} */}
            <p className={styles.Label}>Activities:</p>
            <Link to={`/countries/${id}/activities`}>
              <button className={buttons.Button}>
                <span className={buttons.ButtonSpan}>+ INFO</span>
              </button>
            </Link>
          </div>
         
          <div>
            <img className={styles.Image} src={country.flag} alt='image' />
          </div>
          
        </div>
      );
    } else {
      return <p>No information available for the selected country</p>;
    }
  }

  return (
    <div>
      {countryDetail()}
    </div>
  );
}


export default Detail;


