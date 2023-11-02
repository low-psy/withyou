import { useState } from "react";
import classes from "./MainFilter.module.css";
import { useFetcher, useNavigate } from "react-router-dom";

const filter_category_title = [
  "풀빌라",
  "수영장",
  "한옥",
  "캠핑장",
  "인기 급상승",
  "스키",
  "도시",
  "키즈",
  "가성비",
  "서핑",
  "골프장",
  "해변 근처",
  "풀빌라",
  "수영장",
  "한옥",
  "캠핑장",
  "인기 급상승",
  "스키",
  "도시",
  "키즈",
  "가성비",
  "서핑",
  "골프장",
  "해변 근처",
  "풀빌라",
  "수영장",
  "한옥",
  "캠핑장",
  "인기 급상승",
  "스키",
  "도시",
  "키즈",
  "가성비",
  "서핑",
  "골프장",
  "해변 근처",
  "풀빌라",
  "수영장",
  "한옥",
  "캠핑장",
  "인기 급상승",
  "스키",
  "도시",
  "키즈",
];
const filter_category_icon_text = [
  "apartment",
  "pool",
  "castle",
  "grass",
  "favorite_border",
  "downhill_skiing",
  "location_city",
  "child_care",
  "discount",
  "surfing",
  "sports_golf",
  "beach_access",
];

function MainFilter({ className }) {
  const [scrollCount, setScrollCount] = useState(0);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  let scrollClass = "";
  let backDirectionClass = "";
  let forwardDirectionClass = "";
  const forwardClickHandler = () => {
    setScrollCount((count) => count + 1);
  };
  let backClickHandler = () => {
    setScrollCount((count) => count - 1);
  };
  switch (scrollCount) {
    case 0:
      backDirectionClass = classes["disabled"];
      backClickHandler = () => {};
      break;
    case 1:
      scrollClass = classes["scroll_one"];
      break;
    case 2:
      scrollClass = classes["scroll_two"];
      break;
    case 3:
      scrollClass = classes["scroll_three"];
      forwardDirectionClass = classes["disabled"];
      break;
  }
  const filterClickHandler = (event) => {
    const id = event.currentTarget.id;
    navigate(
      `?submitUrl=public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?select=id%2C%20xl_picture_url%2Chost_name%2C%20property_type%2Cgeolocation%2Csummary%2C%20accommodates%2Creview_scores_rating%2Cprice&where=search(amenities%2C%22${id}%22)&limit=40`
    );
  };
  return (
    <section className={`${className}`}>
      <ul className={classes["filter"]}>
        <div className={classes["filter_absolute"]}>
          <li className={`${classes["filter-icon"]} ${backDirectionClass}`}>
            <span
              onClick={backClickHandler}
              className={`material-icons ${classes["direction"]}`}
            >
              chevron_left
            </span>
          </li>
        </div>
        <ul className={`${classes["filter-list"]} ${scrollClass}`}>
          {filter_category_title.map((title, index) => {
            let icon = "";
            index = index % 12;
            icon = filter_category_icon_text[index];
            return (
              <li
                id={icon}
                onClick={filterClickHandler}
                className={classes["filter-item"]}
              >
                <div className={classes["filter-item-content"]}>
                  <div>
                    <span class="material-icons-outlined md-36">{icon}</span>
                  </div>
                  <div className={classes["mt_5"]}>
                    <h3>{title}</h3>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={`${classes["filter_absolute"]} ${classes["right"]}`}>
          <li
            className={`${classes["filter-icon"]} ${classes["filter_right"]} ${forwardDirectionClass}`}
          >
            <span
              onClick={forwardClickHandler}
              className={`material-icons ${classes["direction"]}`}
            >
              chevron_right
            </span>
          </li>
          <div className={classes["filter-button_wrapper"]}>
            <li className={classes["filter-button"]}>
              <span class="material-icons-round">tune</span>필터
            </li>
          </div>
        </div>
      </ul>
    </section>
  );
}

export default MainFilter;
