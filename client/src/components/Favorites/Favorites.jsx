
// import { useDispatch } from "react-redux";
// import React from "react";
// import { useSelector } from "react-redux";
// import styles from './StyledFavorites.module.css';
// import Card from '../Card/Card';
// import { useEffect } from "react";
// import { addFav } from "../../redux/actions";

// const Favorites = () => {

//   const dispatch = useDispatch();

//   //const [aux, setAux] = useState(false);

//   const myFavorites = useSelector((state) => state.myFavorites);

//   useEffect(() => {
//     // Cuando el componente se monta, carga la lista de países favoritos
//     console.log('El componente se ha montado');
//     dispatch(addFav());
//   }, [dispatch]);


//   return (
//     <div>
//       <h1 className={styles.Title}>My Favorites</h1>
//       <div className={styles.CardContainer}>
//         {myFavorites.map((fav) => {
//           return (
//             <div className={styles.CardCont} key={fav.id}>
//               <img className={styles.Image} src={fav.flag} alt={fav.name} />
//               <h2 className={styles.Button}>{fav.name}</h2>
//             </div>
//           )})}
//           </div>
//     </div>
//   )
// }


// export default Favorites;

import React, { useState, useEffect } from 'react';
import styles from './StyledFavorites.module.css';

const Favorites = () => {
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    // Recupera los favoritos del localStorage cuando se carga la página
    const storedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    setFavoriteCards(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Mis Favoritos</h1>
      <ul>
        {favoriteCards.map((card) => (
          <li key={card.id}>
            <img src={card.flag} alt={`${card.name} Flag`} />
            <span>{card.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
