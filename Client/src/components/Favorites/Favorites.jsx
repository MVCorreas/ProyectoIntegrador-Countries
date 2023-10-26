import React, { useState, useEffect } from 'react';
import styles from './StyledFavorites.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const location = useLocation();
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5; // Cantidad de tarjetas por página
  const isFavoritesPage = location.pathname === '/favorites';

  useEffect(() => {
    // Recupera los favoritos del localStorage cuando se carga la página
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavoriteCards(storedFavorites);
  }, []);

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(favoriteCards.length / cardsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  // Calcula el índice de la última tarjeta en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  // Calcula el índice de la primera tarjeta en la página actual
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // Obtiene las tarjetas para mostrar en la página actual
  const currentCards = favoriteCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <h1 className={styles.neonText}>Favorites</h1>

      <Paginado
        countriesPerPage={cardsPerPage}
        allCountries={favoriteCards.length}
        paginate={handlePageChange}
        totalPages={Math.ceil(favoriteCards.length / cardsPerPage)}
        currentPage={currentPage}
      />

        <ul className={styles.FavoriteContainer}>
          {currentCards.map((card) => (
            <div key={card.id} className={styles.cardContainer}>
              <div className={styles.card}>
                <div className={styles.cardFront}>
                  {/* <button
                    className={styles.Favbutton}
                    onClick={() => handleFavorite(card.id)}
                  >
                    {card.isFav ? '❤️' : '🤍'}
                  </button> */}
                  <img src={card.flag} alt={card.name} className={styles.cardImage} />
                </div>
                <div className={styles.cardBack}>
                  <p className={styles.cardName}>{card.name}</p>
                  <p className={styles.cardContinent}>{card.continents}</p>
                  <Link to={`/detail/${card.id}`} className={styles.linkwithoutunderline}>
                    <button className={styles.Button}>
                      <span className={styles.ButtonSpan}>+ INFO</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </ul>







    </div>
  );
};

export default Favorites;
