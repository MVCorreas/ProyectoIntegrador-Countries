
import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";
import styles from './StyledFavorites.module.css';
import Card from '../Card/Card';
import { useEffect } from "react";
import { addFav } from "../../redux/actions";

const Favorites = () => {

  const dispatch = useDispatch();

  //const [aux, setAux] = useState(false);

  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    // Cuando el componente se monta, carga la lista de países favoritos
    console.log('El componente se ha montado');
    dispatch(addFav());
  }, [dispatch]);


  return (
    <div>
      <h1 className={styles.Title}>My Favorites</h1>
      <div className={styles.CardContainer}>
        {myFavorites.map((fav) => {
          return (
            <div className={styles.CardCont} key={fav.id}>
              <img className={styles.Image} src={fav.flag} alt={fav.name} />
              <h2 className={styles.Button}>{fav.name}</h2>
            </div>
          )})}
          </div>
    </div>
  )
}


export default Favorites;