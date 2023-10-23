import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from '../Card/StyledCard.module.css';

import { addFav, removeFav } from '../../redux/actions';
import { connect } from 'react-redux';


const Card = (props) => {

  const {id, flag, name, continents, area, population, subregion, Activities} = props;
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    myFavorites.forEach((fav) => {
       if (fav.id === props.id) {
          setIsFav(true);
       }
    });
 }, [myFavorites]);

 const handleFavorite = () => {
  if (isFav) {
    dispatch(removeFav(id)); // Utiliza dispatch para llamar a la acción
  } else {
    dispatch(addFav({ id, flag, name, continents, area, subregion, population, Activities })); // Utiliza dispatch para llamar a la acción
  }
  setIsFav(!isFav);
};

//console.log(myFavorites);


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
     <img className={styles.Image} src={props.flag} alt={`${props.name} Flag`} />
     <Link  to={`/detail/${props.id}`} className={styles.linkwithoutunderline}>
        <button className={styles.Button}>
          <span className={styles.ButtonSpan}>{props.name}</span>
          </button>
      </Link>
      {/* <h4 className={styles.Label}>| {id} |</h4> */}
      <h4 className={styles.Label}>| {props.continents} |</h4>
      {/* <h4 className={styles.Label}>| {area} |</h4>
      <h4 className={styles.Label}>| {population} |</h4>
      <h4 className={styles.Label}>| {subregion} |</h4> */}
       
    </div>
  </div>
  );
}

export default Card;

  