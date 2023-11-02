import classes from "./HeaderModalCategory.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { actions } from "../../../store/slice/header-search_slice";

function HeaderModalCategory({ className }) {
  const headerModalCategory = useSelector((store) => {
    return store.headerSearch.headerModalCategory;
  });
  console.log(headerModalCategory);
  const dispatch = useDispatch();
  const searchItemClickHandler = (e) => {
    e.stopPropagation();
    dispatch(
      actions.headerModalCategoryToggle(e.currentTarget.className.split(" ")[1])
    );
  };

  return (
    <div className={className}>
      <ul className={classes["header-category"]}>
        <li
          onClick={searchItemClickHandler}
          className={`${classes["header-category-item"]} place ${
            headerModalCategory.place && classes["onActive"]
          }`}
        >
          숙소
        </li>
        <li
          onClick={searchItemClickHandler}
          className={`${classes["header-category-item"]} activate ${
            headerModalCategory.activate && classes["onActive"]
          }`}
        >
          체험
        </li>
        <li
          onClick={searchItemClickHandler}
          className={`${classes["header-category-item"]} online ${
            headerModalCategory.online && classes["onActive"]
          }`}
        >
          온라인 체험
        </li>
      </ul>
    </div>
  );
}

export default HeaderModalCategory;
