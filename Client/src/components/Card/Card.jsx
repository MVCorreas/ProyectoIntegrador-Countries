import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './StyledCard.module.css';

const Card = (props) => {
  const { id, flag, name, continents, area, population, subregion, Activities } = props;
  const [isFav, setIsFav] = useState(false);


//? localStorage --> web API that allows you to store key-value pairs in a web browser with no expiration time
//?JSON.parse --> parse a JSON string and convert it into a JavaScript object
//? [] empty array as a default value
//? 'my favorites' name of the key

  useEffect(() => {
    // Cuando el componente se monta, verifica si este elemento está en favoritos
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    const isFavorite = storedFavorites.some((fav) => fav.id === id);
    setIsFav(isFavorite);
  }, [id]);

  const handleFavorite = () => {
    if (isFav) {
      // Quito favs
      const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
      const updatedFavorites = storedFavorites.filter((fav) => fav.id !== id);
      localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites)); //JSON.stringify convierte un objeto en un string
    } else {
      // Agrego favs
      const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
      const newFavorite = { id, flag, name, continents, area, subregion, population, Activities };
      storedFavorites.push(newFavorite);
      localStorage.setItem('myFavorites', JSON.stringify(storedFavorites));
    }
    setIsFav(!isFav);
  };

  return (
    <div className={styles.CardCont}>
      <div className={styles.CardContainer}>
        <div className={styles.ButtonCont}>
          {isFav ? (
            <button className={styles.Favbutton} onClick={handleFavorite}>
              ❤️
            </button>
          ) : (
            
            <button className={styles.Favbutton} onClick={handleFavorite}>
              🤍
            </button>
          )}
        </div>
        <img className={styles.Image} src={flag} alt={`${name} Flag`} />
        <Link to={`/detail/${id}`} className={styles.linkwithoutunderline}>
          <button className={styles.Button}>
            <span className={styles.ButtonSpan}>{name}</span>
          </button>
        </Link>
        <h4 className={styles.Label}>| {continents} |</h4>
      </div>
    </div>
  );
};

export default Card;