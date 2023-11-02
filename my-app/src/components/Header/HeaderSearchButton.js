// import { useContext } from "react";
// import { headerContext } from "../../store";
import { useSelector, useDispatch } from "react-redux/es/exports";
import classes from "./HeaderSearchButton.module.css";
import { actions } from "../../store/slice/header-search_slice";

function HeaderSearchButton({ className, onClick }) {
  const dispatch = useDispatch();
  const headerCtx = useSelector((store) => {
    return store.headerSearch.headerSearch;
  });
  console.log(headerCtx);
  const searchItemClickHandler = (e) => {
    dispatch(
      actions.headerSearchToggle(e.currentTarget.className.split(" ")[1])
    );
  };
  return (
    <div className={className}>
      <ul onClick={onClick} className={classes["header_search-form"]}>
        <li
          onClick={searchItemClickHandler}
          className={`${classes["search-form-item"]} where`}
        >
          어디든지
        </li>
        <li
          onClick={searchItemClickHandler}
          className={`${classes["search-form-item"]} when`}
        >
          언제든 일주일
        </li>
        <li
          onClick={searchItemClickHandler}
          className={`${classes["search-form-item"]} guest`}
        >
          <span className={classes["item-last-text"]}>게스트 추가</span>
          <span className={`material-icons ${classes["search_icon"]}`}>
            search
          </span>
        </li>
      </ul>
    </div>
  );
}

export default HeaderSearchButton;
