import { Fragment } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import classes from "../Header.module.css";
import HeaderModalCategory from "./HeaderModalCategory";
import HeaderModalSearch from "./HeaderModalSearch";
import MainLogo from "../MainLogo";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import modalClasses from "./HeaderModal.module.css";

import { actions } from "../../../store/slice/header-search_slice";

function HeaderModal({ onToggleHeaderModal }) {
  const dispatch = useDispatch();
  const headerModalClickHandler = (e) => {
    dispatch(actions.headerModalSearchToggle("default"));
  };
  return (
    <Fragment>
      <header
        onClick={headerModalClickHandler}
        className={`${modalClasses["header_modal"]}`}
      >
        <nav className={classes.header}>
          <MainLogo className={classes["header-item"]} />
          <HeaderModalCategory className={classes["header-item"]} />
          <HeaderInfo className={classes["header-item"]} />
        </nav>
        <HeaderModalSearch onToggleHeaderModal={onToggleHeaderModal} />
      </header>
    </Fragment>
  );
}

export default HeaderModal;
