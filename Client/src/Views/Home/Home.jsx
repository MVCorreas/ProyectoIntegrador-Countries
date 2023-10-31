import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDbCountries, filterCountriesByContinent, filterByActivity, orderByName, orderByPopulation } from '../../redux/actions';
import Card from '../../components/Card/Card';
import Paginado from '../../components/Paginado/Paginado';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './StyledHome.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [filteredCountries, setFilteredCountries] = useState(allCountries); // Estado para almacenar los países filtrados
  const [currentPage, setCurrentPage] = useState(1); //pagina principal
  const [countriesPerPage, setCountriesPerPage] = useState(10); //cantidad de cartas por pag
  const filters = useSelector((state) => state.filters);
  const navigate = useNavigate();

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const [currentFilters, setCurrentFilters] = useState({
    continent: 'AllContinents',
    orderByName: 'null',
    orderByPopulation: 'null',
    activity: 'AllActivities',
  });

  useEffect(() => {
    dispatch(getDbCountries());
  }, []);


  //!FILTERS COMBINADOS 
  useEffect(() => {
    const filteredCountries = allCountries
      .filter((country) => {
        if (filters.continent !== 'AllContinents' && country.continents !== filters.continent) {
          return false;
        }
  
        if (filters.activity !== 'AllActivities' && !country.Activities.some((activity) => activity.type === filters.activity)) {
          return false;
        }
  
        return true;
      });
  
    // Actualiza los filtros y la lista de países filtrados en el mismo lugar
    setFilteredCountries(filteredCountries);
    setCurrentFilters(filters);
  }, [allCountries, filters]);
  

  const handleReloadFilters = () => {
    // Restablece los filtros a sus valores por defecto
    dispatch(filterCountriesByContinent('AllContinents'));
    dispatch(orderByName('null'));
    dispatch(orderByPopulation('null'));
    dispatch(filterByActivity('AllActivities'));

    // Restablece los valores de los selectores a sus valores por defecto
    setCurrentFilters({
      continent: 'AllContinents',
      orderByName: 'null',
      orderByPopulation: 'null',
      activity: 'AllActivities',
    });
  };
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.HomeTitle}>COUNTRYPEDIA</h1>
        <SearchBar onReload={handleReloadFilters} selectValues={currentFilters}/>
        <div className={styles.FilterContainer}>
          <select onChange={(e) => dispatch(filterCountriesByContinent(e.target.value))}  className={styles.selectContainer}>
            <option value="AllContinents">All Countries</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
         
          <select onChange={(e) => dispatch(orderByName(e.target.value))} className={styles.selectContainer}>
           <option value="null">Order by Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select onChange={(e) => dispatch(orderByPopulation(e.target.value))} className={styles.selectContainer}>
            <option value="null">Order by Population</option>
            <option value="high">Highest Population</option>
            <option value="low">Lowest Population</option>
          </select>

          <select onChange={(e) => dispatch(filterByActivity(e.target.value))}  className={styles.selectContainer}>
            <option value="AllActivities">All Activities</option>
            <option value="City">City</option>
            <option value="Country">Country</option>
            <option value="Beach">Beach</option>
            <option value="Forest">Forest</option>
            <option value="Mountain">Mountain</option>
          </select>
        </div>
        <Paginado
            countriesPerPage={countriesPerPage}
            allCountries={filteredCountries.length}
            paginate={paginate}
            totalPages={Math.ceil(filteredCountries.length / countriesPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

        {currentCountries.length === 0 ? (
          <p className={styles.NoCountriesMessage}>No countries found for the selected activity.</p>
        ) : (
          currentCountries.map((country) => (
            <Card key={country.id} id={country.id} name={country.name} flag={country.flag} continents={country.continents} activities={country.Activities} />
          ))
        )}
      </div>
    </div>
  );
}