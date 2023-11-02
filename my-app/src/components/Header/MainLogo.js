import {Link} from 'react-router-dom';
import logoImage from '../../source/logo_full.png'
import classes from './MainLogo.module.css'
function MainLogo({className}){
  return (
    <div className={className}>
      <Link to="/">
        <img
          src={logoImage}
          alt="logo_image"
          className={classes["main_logo_image"]}
        />
      </Link>
    </div>
  );
}

export default MainLogo