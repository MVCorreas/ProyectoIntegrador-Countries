
import {Link} from 'react-router-dom'
import '../NavBar/StyledNav.css'
import Facebook from '../../assets/Facebook.png'
import LinkedIn from '../../assets/LinkedIn.avif'
import Github from '../../assets/Github.png'




export default function Nav({ onLogout }) {
  

  return (
   <nav className='nav-main'>
   
    <input type='checkbox' className='nav-main__btn-collapse' id='nav-main__checkbox'/>
    <label htmlFor='nav-main__checkbox' className='nav-main__btn-collapse-icon'>
        <span className='icon-nav'></span>
        <span className='icon-nav'></span>
        <span className='icon-nav'></span>
    </label>
   
    <div className='nav-main__btn-collaps-bg'></div>
   
   <div className='social-networks'>
    <a href='https://www.facebook.com/vickycorreas/' target='_blank' className='social-networks__link-item'>
    <img src={Facebook} alt='Facebook' className='social-icon' />
    </a>
    <a href='https://github.com/MVCorreas/Proyecto-Individual-Countries' target='_blank' className='social-networks__link-item'>
    <img src={Github} alt='Github' className='social-icon' />
    </a>
    <a href='https://www.linkedin.com/in/mar%C3%ADa-victoria-correas-148049b2/' target='_blank' className='social-networks__link-item'>
    <img src={LinkedIn} alt='Linkedin' className='social-icon' />
    </a>
   </div>

    <div className='nav-main__menu'>
        <a href='/home' className='nav-main__link-item'>Home</a>
        <a href='/about' className='nav-main__link-item'>About</a>
        <a href='/activities' className='nav-main__link-item'>Activity Creator</a>
        <a href='/' className='nav-main__link-item'>Log Out</a>
    </div>
   </nav>
  );
}

