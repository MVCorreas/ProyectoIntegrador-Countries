import React, { useState, useEffect } from 'react';
import styles from './StyledFavorites.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Favorites = () => {
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5; // Cantidad de tarjetas por página
  const isFavoritesPage = location.pathname === '/favorites';
  

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavorites(storedFavorites);
  }, [location]);
  
  
  //?Paginación
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(favorites.length / cardsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage + 1;
  const currentCards = favorites.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <h1 className={styles.neonText}>Favorites</h1>

      {favorites.length > 1 && ( // Verificar si hay más de 1 favorito
      <Paginado
        countriesPerPage={cardsPerPage}
        allCountries={favorites.length}
        paginate={handlePageChange}
        totalPages={Math.ceil(favorites.length / cardsPerPage)}
        currentPage={currentPage}
      />
    )}


        {favorites.length === 1 ? (
          <h2 className={styles.NoFavMessage}>No Favorite Countries for display</h2>
        ) : (
        <ul className={styles.FavoriteContainer}>
          {currentCards.map((card) => (
           
            <div className={styles.cardWrap}>
              <div className={styles.card}>
                <div className={styles.cardFront}>
                  <img src={card.flag} alt={card.name} className={styles.cardImage} />
                </div>
                <div className={styles.cardBack}>
                  <button className={styles.FavButton}>
                    ❤️
                  </button>
                  <p className={styles.cardName}>{card.name}</p>
                  <p className={styles.cardContinent}>{card.continents}</p>
                 
                  <Link to={`/detail/${card.id}`} className={styles.linkwithoutunderline}>
                    <button className={styles.ButtonFav}>
                      <span className={styles.ButtonFavSpan}>+ INFO</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
           
            ))}
          </ul>
)}
      
    </div>
  );
};    

export default Favorites;
