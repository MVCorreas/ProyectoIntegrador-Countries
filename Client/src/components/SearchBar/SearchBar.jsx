import React, {useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryName, getDbCountries } from '../../redux/actions';
import styles from './StyledSearchBar.module.css';
import buttons from '../../Styles/Buttons.module.css';

export default function SearchBar ({onReload}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const countries = useSelector((state) => state.countries);
    

  
   const handleChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value === '') {
      // Si el input está vacío, traigo todos los países nuevamente 
      handleReloadAllCountries();
    } else {
      const idRegex = /^[A-Z]{3}$/; // A regular expression to match 3-letter IDs

      if (idRegex.test(value)) {
        // If the input matches the 3-letter ID pattern, search by ID
        dispatch(getCountryID(value));
      } else {
        // Otherwise, search by name
        dispatch(getCountryName(value));
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryName(name));
   
};

  function handleReloadAllCountries() {
    onReload(); // Llamo a la función para restablecer los filtros
    dispatch(getDbCountries());
  }

  function handleKeyDown(e) { //searchbar, al apretar enter se ejecuta la búsqueda
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
     
  }
    return (
        <div className={styles.StyledSearchContainer}>
        <div className={styles.StyledSearch}> 
          <nav>
            <input className={styles.Input}
              type='search'
              placeholder='Find a country...'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            
              <button className={buttons.Button} onClick={(e) => handleSubmit(e)}>
                <span className={buttons.ButtonSpan}>Find</span>
              </button> 
              <button className={buttons.Button} onClick={(e) => handleReloadAllCountries(e)}>
                <span className={buttons.ButtonSpan}>Reload </span>
              </button>
          </nav>
        </div>
      </div>
        );
}
