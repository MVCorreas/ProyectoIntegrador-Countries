import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StyledLanding.module.css';
import buttons from '../../Styles/Buttons.module.css';
// import video from '../../assets/GlobeOnWood.mp4';
import video from '../../assets/GreenBoard.mp4';




const Landing = () => {
 

  return (
    <div className={styles.bgContainer}>
        <div className={styles.overlay}>
            <video src={video} autoPlay muted loop />
            <div className={styles.container}>
          
            <h1 className={styles.LandingTitle}>Countrypedia</h1>
          
             <h4>Click to find an interactive glossary of all countries</h4>
             <Link to="/home">
          <button className={buttons.Button}><span className={buttons.ButtonSpan}>HOME</span></button> 
          </Link> 
            </div>
        </div>  
       
    </div>
  )
};

export default Landing;



