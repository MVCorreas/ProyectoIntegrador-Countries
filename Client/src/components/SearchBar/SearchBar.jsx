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
    }
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(getCountryName(name));
    if (response.error) {
      // Si la acción devuelve un error, muestra la alerta
      alert('Country not found');
    }
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
