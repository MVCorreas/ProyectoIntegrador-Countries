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
  // const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavorites(storedFavorites);
  }, [location]);
  
  

  // const handleFavorite = ( id) => {
  //   const updatedFavorites = favorites.map((card) => {
  //     if (card.id === id) {
  //       // Invertir el estado de "favorito" de la tarjeta
  //       return { ...card, isFav: !card.isFav };
  //     }
  //     return card;
  //   });

  //   setFavorites(updatedFavorites);

  //   // Actualiza el localStorage con la lista actualizada de favoritos
  //   localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites));
  // };


 //?Paginación
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(favorites.length / cardsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  // Calcula el índice de la última tarjeta en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  // Calcula el índice de la primera tarjeta en la página actual
  const indexOfFirstCard = indexOfLastCard - cardsPerPage +1;
  // Obtiene las tarjetas para mostrar en la página actual
  const currentCards = favorites.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <h1 className={styles.neonText}>Favorites</h1>

      <Paginado
        countriesPerPage={cardsPerPage}
        allCountries={favorites.length}
        paginate={handlePageChange}
        totalPages={Math.ceil(favorites.length / cardsPerPage)}
        currentPage={currentPage}
      />

        {favorites.length === 0 ? (
          <p>No Favorite Countries for display</p>
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
