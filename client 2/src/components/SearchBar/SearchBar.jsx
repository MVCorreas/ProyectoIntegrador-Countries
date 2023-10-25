import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getCountryName, getDbCountries } from '../../redux/actions';
import styles from '../SearchBar/StyledSearchBar.module.css';
import buttons from '../../Styles/Buttons.module.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

  
   const handleChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value === '') {
      // Si el input está vacío, traigo todos los países nuevamente
      handleGetAllCountries();
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountryName(name));
    };

    function handleClick(e) {
      e.preventDefault();
      dispatch(getDbCountries());
  };

  function handleGetAllCountries() {
    dispatch(getDbCountries());
  }
    return (
        <div className={styles.StyledSearchContainer}>
        <div className={styles.StyledSearch}> 
          <nav>
            <input className={styles.Input}
              type='search'
              placeholder='Find a country...'
              onChange={handleChange}
            />
            
              <button className={buttons.Button} onClick={(e) => handleSubmit(e)}>
                <span className={buttons.ButtonSpan}>Find</span>
              </button> 
              <button className={buttons.Button} onClick={(e) => handleClick(e)}>
                <span className={buttons.ButtonSpan}>Reload </span>
              </button>
          </nav>
        </div>
      </div>
        );
}
