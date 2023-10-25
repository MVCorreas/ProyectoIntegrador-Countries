import React, { useState, useEffect } from 'react';
import styles from './StyledFavorites.module.css';
import Card from '../Card/Card';

const Favorites = () => {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5; // Cantidad de tarjetas por página

  useEffect(() => {
    // Recupera los favoritos del localStorage cuando se carga la página
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavoriteCards(storedFavorites);
  }, []);

  // Calcula el índice de la última tarjeta en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  // Calcula el índice de la primera tarjeta en la página actual
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // Obtiene las tarjetas para mostrar en la página actual
  const currentCards = favoriteCards.slice(indexOfFirstCard, indexOfLastCard);

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className={styles.neonText}>Mis Favoritos</h1>

      <ul className={styles.FavCards}>
        {currentCards.map((card) => (
          <Card key={card.id} id={card.id} name={card.name} flag={card.flag} continents={card.continents} />
        ))}
      </ul>

      {/* Botones de paginación */}
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(favoriteCards.length / cardsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
