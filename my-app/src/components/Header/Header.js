import { Fragment, useState } from "react";
import classes from "./Header.module.css";
import HeaderSearchButton from "./HeaderSearchButton";
import MainLogo from "./MainLogo";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import HeaderModal from "./HeaderModal/HeaderModal";
import Backdrop from "../utility/Backdrop";

function Header({ className }) {
  const [isHeaderModal, setIsHeaderModal] = useState(false);

  const headerSearchButtonClickHandler = () => {
    setIsHeaderModal(true);
  };
  const backdropClickHandler = (e) => {
    setIsHeaderModal(false);
  };
  return (
    <Fragment>
      <header className={`${className} ${classes["header-wrapper"]}`}>
        <nav className={classes.header}>
          <MainLogo className={classes["header-item"]} />
          <HeaderSearchButton
            onClick={headerSearchButtonClickHandler}
            className={classes["header-item"]}
          />
          <HeaderInfo className={classes["header-item"]} />
        </nav>
      </header>
      {isHeaderModal && <HeaderModal onToggleHeaderModal={setIsHeaderModal} />}
      {isHeaderModal && <Backdrop onClick={backdropClickHandler} />}
    </Fragment>
  );
}

export default Header;
