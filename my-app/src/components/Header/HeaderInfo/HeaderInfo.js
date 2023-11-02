import {Link} from 'react-router-dom'
import classes from './HeaderInfo.module.css'

function HeaderInfo({className}){
  return (
    <div className={className}>
      <ul className={classes["info-wrapper"]}>
        <li className={classes["info-item"]} to="host/homes">
          <Link to="host/homes" className={classes["header-host"]}>
            당신의 공간을 위드미하세요
          </Link>
        </li>
        <li className={classes["info-item"]}>
          <span class="material-symbols-outlined">language</span>
        </li>
        <li className={`${classes["info-item"]} ${classes["account"]}`}>
          <span class="material-symbols-outlined">menu</span>
          <span class="material-icons">account_circle</span>
        </li>
      </ul>
    </div>
  );
}

export default HeaderInfo