import React, { useEffect, useState } from 'react';
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
  // const [order, setOrder] = useState('asc');
  const [countriesPerPage, setCountriesPerPage] = useState(10); //cantidad de cartas por pag
  const filters = useSelector((state) => state.filters);
  const countries = useSelector((state) => state.countries);
  const [populationOrder, setPopulationOrder] = useState('null');
  const [nameOrder, setNameOrder] = useState('null');
  const [activityFilter, setActivityFilter] = useState('AllActivities');
  const [continentFilter, setContinentFilter] = useState('AllContinents');
 


  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const [filter, setFilter] = useState('All'); 

  useEffect(() => {
    dispatch(getDbCountries());
  }, []);


  //!FILTERS COMBINADOS PERO SIN A-Z
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
      })
      // .sort((a, b) => {
      //   if (filters.orderByName === 'asc' || filters.orderByPopulation === 'high') {
      //     // Ordena por nombre ascendente (A-Z), luego por población ascendente
      //     return a.name.localeCompare(b.name) || a.population.localeCompare(b.population);
      //   } else {
      //     // Ordena por nombre descendente (Z-A), luego por población descendente
      //     return b.name.localeCompare(a.name) || b.population.localeCompare(a.population);
      //   }
      // });
  
    setFilteredCountries(filteredCountries);
  }, [allCountries, filters]);

  //!LUKI
  // const handleContinentChange = (e) => {
  //   const selectedContinent = e.target.value;
  //   dispatch(filterCountriesByContinent(selectedContinent));
  //   // Reiniciar los ordenamientos
  //   setContinentFilter(selectedContinent);
  //   // setActivityFilter('AllActivities');
   
  // };

  // const handleActivityChange = (e) => {
  //   const selectedActivity = e.target.value;
  //   dispatch(filterByActivity(selectedActivity));
  //   setActivityFilter(selectedActivity);
  // };

  // const handleOrderByNameChange = (e) => {
  //   const selectedOrderByName = e.target.value;
  //   dispatch(orderByName(selectedOrderByName));
  //   // Desactivar el ordenamiento por población
  //   setNameOrder(selectedOrderByName)
  //   setPopulationOrder(null)
  // };

  // const handleOrderByPopulationChange = (e) => {
  //   const selectedOrderByPopulation = e.target.value;
  //   dispatch(orderByPopulation(selectedOrderByPopulation));
  //   // Desactivar el ordenamiento por nombre
  //   setPopulationOrder(selectedOrderByPopulation)
  //   setNameOrder(null)
  // };
  

//!FILTERS SIN ACTIVITY
// useEffect(() => {
  
//   setFilteredCountries(allCountries); // Inicialmente, todos los países están disponibles, si lo comento, no funciona el reload
// }, [allCountries, filters]);


  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // const handleFavorites = allCountries.filter((country) => {
  //   if (filter === 'Favorites') {
  //     return myFavorites.some((fav) => fav.id === country.id);
  //   } else if (filter === 'NotFavorites') {
  //     return !myFavorites.some((fav) => fav.id === country.id);
  //   }
  //   return true;
  // });
  

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.HomeTitle}>COUNTRYPEDIA</h1>
        <SearchBar />
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
           <option value="null">None</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select onChange={(e) => dispatch(orderByPopulation(e.target.value))} className={styles.selectContainer}>
            <option value="null">None</option>
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

      
          {currentCountries.map((country) => (
            <Card key={country.id} id={country.id} name={country.name} flag={country.flag} continents={country.continents} activities={country.Activities}/>
          ))}
      
        
      </div>
    </div>
  );
}