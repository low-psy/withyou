import classes from "./TravleModal.module.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { actions as headerModalActions } from "../../../../store/slice/header-modal_slice";
import { actions as headerSliceActions } from "../../../../store/slice/header-search_slice";

function TravleModal({ onClick }) {
  const dispatch = useDispatch();
  const countries = useSelector((store) => store.searchInfo.countries);
  const countries_6 = countries.slice(-6);

  const travleClickHandler = (e) => {
    dispatch(
      headerModalActions.travleSearch(e.currentTarget.nextSibling.textContent)
    );
    dispatch(headerSliceActions.headerModalSearchToggle("check_in"));
    onClick(e.currentTarget.nextSibling.textContent);
  };
  return (
    <section onClick={(e) => e.stopPropagation()} className={classes["modal"]}>
      <h3 className={classes["modal-title"]}>지역으로 검색하기</h3>
      <ul className={classes["modal-grid"]}>
        {countries_6.map((country) => {
          const country_en = Object.keys(country)[0];
          const country_ko = country[country_en];

          return (
            <li className={classes["modal-grid-item"]}>
              <div
                onClick={travleClickHandler}
                className={classes["item-image"]}
              >
                <img
                  src="https://img.freepik.com/premium-vector/world-map-with-countries-borders_47243-900.jpg"
                  alt="world"
                />
              </div>
              <h4 className={classes["item-text"]}>{country_ko}</h4>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TravleModal;
