import React from "react";
import {
  useLoaderData,
  Await,
  useFetcher,
  useNavigation,
} from "react-router-dom";

import classes from "./MainContents.module.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { actions as mainActions } from "../../../store/slice/main-item_slice";

const now = new Date();
const default_date = 5;
const default_date_text = `${now.getMonth() + 1}월 ${now.getDate()}일 ~${
  now.getDate() + default_date
}일`;

function MainContents({ className }) {
  const navigation = useNavigation();
  console.log(navigation.state);
  const dispatch = useDispatch();
  const data = useLoaderData();
  const results = data.results;

  const mainItemData = useSelector((store) => store.mainItem);

  let element_active = classes["element_active"];

  return (
    <section className={className}>
      <ul className={classes["main-list"]}>
        <React.Suspense fallback={<p>Loading package...</p>}>
          <Await resolve={results} errorElement={<p>Error Loading...</p>}>
            {(results) =>
              results.map((v, i) => {
                const text_title = `${v.host_name}의 ${
                  v.property_type || "house"
                }`;
                const text_price = (v.price * 1337)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const text_summary = v.summary;
                const text_bed = `숙박 ${v.accommodates}개`;
                const id = v.id;

                const picture_url_array = Array.from(
                  { length: 5 },
                  () => v.xl_picture_url
                );

                let text_review_rate = (v.review_scores_rating / 20).toFixed(2);

                if (text_review_rate == 0.0) {
                  text_review_rate = "new";
                }
                let favoriteClickHandler = (event) => {
                  dispatch(mainActions.favoriteToggleHandler(event.target.id));
                };

                let backClickHandler = (event) => {
                  dispatch(mainActions.removeCountHandler(event.target.id));
                };
                let forwardClickHandler = (event) => {
                  dispatch(mainActions.addCountHandler(event.target.id));
                };

                let nav_back_class = "";
                let nav_forward_class = "";
                let grid_class = "";

                switch (mainItemData[i].count) {
                  case 0:
                    nav_back_class = classes["disabled"];
                    backClickHandler = () => {};
                    break;
                  case 1:
                    grid_class = classes["one_scroll"];
                    break;
                  case 2:
                    grid_class = classes["two_scroll"];
                    break;
                  case 3:
                    grid_class = classes["three_scroll"];
                    break;
                  case 4:
                    grid_class = classes["four_scroll"];
                    nav_forward_class = classes["disabled"];
                    forwardClickHandler = () => {};
                    break;
                }

                let favoriteIsActive = "";
                if (mainItemData[i].favorite) {
                  favoriteIsActive = classes["item-favorite_active"];
                }

                if (navigation.state === "loading") {
                  return (
                    <li
                      className={`${classes["main-item"]} ${classes["loading_img_item"]}`}
                    >
                      Loading...
                    </li>
                  );
                }

                return (
                  <li className={classes["main-item"]}>
                    <div className={classes["img_padding"]}>
                      <div className={classes["item-img_wrapper"]}>
                        <span
                          onClick={favoriteClickHandler}
                          className={`material-icons ${classes["favorite_icon"]} ${favoriteIsActive}`}
                          id={id}
                        >
                          favorite
                        </span>
                        <span
                          onClick={backClickHandler}
                          className={`material-icons ${classes["img_nav_icon"]} ${nav_back_class}`}
                          id={id}
                        >
                          chevron_left
                        </span>
                        <span
                          onClick={forwardClickHandler}
                          className={`material-icons ${classes["img_nav_icon"]} ${classes["img_nav_icon_right"]} ${nav_forward_class}`}
                          id={id}
                        >
                          chevron_right
                        </span>
                        <div className={`${classes["item-img_aboluste"]}`}>
                          {picture_url_array.map((src) => {
                            return (
                              <img
                                className={`${classes["item-img"]} ${grid_class}`}
                                src={src}
                                alt="hotel_img"
                              />
                            );
                          })}
                        </div>
                        <ul className={classes["img_nav"]}>
                          {picture_url_array.map((src, index) => {
                            if (index === mainItemData[i].count) {
                              return (
                                <li
                                  className={`${classes["img_nav_element"]} ${element_active}`}
                                ></li>
                              );
                            }
                            return (
                              <li className={classes["img_nav_element"]}></li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className={classes["item-text"]}>
                      <div className={classes["item-text-title"]}>
                        <h2>{text_title}</h2>
                        <div className={classes["item-text-grade"]}>
                          <span class="material-icons-round">grade</span>
                          <span>{text_review_rate}</span>
                        </div>
                      </div>
                      <div className={classes["item-text-para"]}>
                        {text_summary && <p>{text_summary}</p>}
                        <h3 className={classes["item-text-accommodate"]}>
                          {text_bed}
                        </h3>
                        <h3>{default_date_text}</h3>
                      </div>
                      <div className={classes["item-text-price"]}>
                        {text_price}
                      </div>
                    </div>
                  </li>
                );
              })
            }
          </Await>
        </React.Suspense>
      </ul>
    </section>
  );
}

export default MainContents;
