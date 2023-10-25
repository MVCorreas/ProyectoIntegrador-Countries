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
    if (country) {
      return (
        <>
          <div>

            <h2 >ID: {country.id}</h2>
            <h2>Continent: {country.continents}</h2>
            <h2 >Capital: {country.capital}</h2>
            {country.subregion ? (
              <h2 >Subregion: {country.subregion}</h2>
            ) : (
              <h2 >Subregion: Information not available</h2>
            )}
            {country.area ? (
              <h2 >Area: {country.area}</h2>
            ) : (
              <h2 >Area: Information not available</h2>
            )}
            <h2 >Population: {country.population}</h2>
          </div>
        </>
      );
    } else {
      return <p>No information available for the selected country</p>;
    }
  }
     
      
  return (
    <div className={styles.bgContainer}>
       <h1 className={styles.Title}>{country.name}</h1>
      <div className={styles.detailContainer}>
       
        <div className={styles.DetailCard}>
          {countryDetail()}
        </div>
        <div className={styles.DetailCard}>
        <h2>Find what to do in {country.name}</h2>
        <h2>Tourism and Activities</h2>
          <Link to={`/countries/${id}/activities`}>
            
            <button className={buttons.Button}>
              <span className={buttons.ButtonSpan}>+ INFO</span>
            </button>
          </Link>
        </div>
        <div className={styles.DetailCard}>
          <h2>Planning a trip?</h2>
          <a href='https://www.expedia.com' target='_blank'>
          <button className={buttons.Button}>
              <span className={buttons.ButtonSpan}>EXPEDIA</span>
            </button>
          </a>
          <a href='https://www.tripadvisor.com' target='_blank'>
          <button className={buttons.Button}>
              <span className={buttons.ButtonSpan}>TRIPADVISOR</span>
            </button>
          </a>
           
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.Image} src={country.flag} alt='image' />
        </div>
      </div>
    </div>
  );
}


export default Detail;


