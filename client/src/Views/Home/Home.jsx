import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDbCountries, filterCountriesByContinent, filterByActivity, orderByName, orderByPopulation, addFav } from '../../redux/actions';
import Card from '../../components/Card/Card';
import Paginado from '../../components/Paginado/Paginado';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './StyledHome.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [filteredCountries, setFilteredCountries] = useState(allCountries); // Estado para almacenar los países filtrados
  const [currentPage, setCurrentPage] = useState(1); //pagina principal
  const [order, setOrder] = useState('');
  const [countriesPerPage, setCountriesPerPage] = useState(10); //cantidad de cartas por pag
  //const myFavorites = useSelector((state) => state.myFavorites);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const [filter, setFilter] = useState('All'); 

  useEffect(() => {
    dispatch(getDbCountries());
  }, []);

  useEffect(() => {
    setFilteredCountries(allCountries); // Inicialmente, todos los países están disponibles
  }, [allCountries]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFavorites = allCountries.filter((country) => {
    if (filter === 'Favorites') {
      return myFavorites.some((fav) => fav.id === country.id);
    } else if (filter === 'NotFavorites') {
      return !myFavorites.some((fav) => fav.id === country.id);
    }
    return true;
  });
  

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.HomeTitle}>COUNTRYPEDIA</h1>
        <SearchBar />
        <div className={styles.FilterContainer}>
          <select onChange={(e) => dispatch(filterCountriesByContinent(e.target.value))} className={styles.SelectContainer}>
            <option value="AllContinents">All Countries</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select onChange={(e) => dispatch(filterByActivity(e.target.value))} className={styles.SelectContainer}>
            <option value="AllActivities">All Activities</option>
            <option value="City">City</option>
            <option value="Country">Country</option>
            <option value="Beach">Beach</option>
            <option value="Forest">Forest</option>
            <option value="Mountain">Mountain</option>
          </select>
          <select onChange={(e) => dispatch(orderByName(e.target.value))} className={styles.SelectContainer}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select onChange={(e) => dispatch(orderByPopulation(e.target.value))} className={styles.SelectContainer}>
            <option value="high">Highest Population</option>
            <option value="low">Lowest Population</option>
          </select>
          {/* <select onChange={handleFilterChange} value="filter" className={styles.SelectContainer}>
          <option value="Favorites">Favorites</option>
          <option value="NotFavorites">Not Favorites</option>
        </select> */}
        
        </div>
        <Paginado
            countriesPerPage={countriesPerPage}
            allCountries={filteredCountries.length}
            paginate={paginate}
            totalPages={Math.ceil(filteredCountries.length / countriesPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

      
          {currentCountries.map((country) => (
            <Card key={country.id} id={country.id} name={country.name} flag={country.flag} continents={country.continents} activities={country.Activities}/>
          ))}
      
        
      </div>
    </div>
  );
}