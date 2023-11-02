import { useState } from "react";

import Calendar from "../../../utility/Calendar";
import classes from "./CalendarModal.module.css";

const today = new Date();
const today_date = today.getDate();

function CalendarModal() {
  const [now, setNow] = useState(new Date());
  let hidden = "";
  if (
    today.getFullYear() === now.getFullYear() &&
    today.getMonth() >= now.getMonth()
  ) {
    hidden = classes["hidden"];
  }
  const now_calendar = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    first_day: new Date(now.getFullYear(), now.getMonth(), 1).getDay() + 1,
    last_date: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
    today_date: today_date,
  };

  const now_copy = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneMonthLater = new Date(now_copy.setMonth(now_copy.getMonth() + 1));

  const oneMonthLater_calendar = {
    year: oneMonthLater.getFullYear(),
    month: oneMonthLater.getMonth() + 1,
    first_day:
      new Date(
        oneMonthLater.getFullYear(),
        oneMonthLater.getMonth(),
        1
      ).getDay() + 1,
    last_date: new Date(
      oneMonthLater.getFullYear(),
      oneMonthLater.getMonth() + 1,
      0
    ).getDate(),
  };

  const beforeClickHandler = () => {
    return setNow((now) => {
      return new Date(now.setMonth(now.getMonth() - 2));
    });
  };

  const nextClickHandler = () => {
    return setNow((now) => {
      return new Date(now.setMonth(now.getMonth() + 2));
    });
  };

  return (
    <section onClick={(e) => e.stopPropagation()} className={classes["modal"]}>
      <div className={classes["category"]}>
        <ul className={classes["category-wrapper"]}>
          <li className={classes["category-item"]}>날짜 지정</li>
          <li className={classes["category-item"]}>월 단위</li>
          <li className={classes["category-item"]}>유연한 일정</li>
        </ul>
      </div>
      <div className={classes["calendar"]}>
        <div className={`${classes["calendar-icon"]} ${hidden}`}>
          <span
            onClick={beforeClickHandler}
            className={`material-icons ${classes["navigator"]}`}
          >
            navigate_before
          </span>
        </div>
        <div className={classes["calendar-wrapper"]}>
          <div className={classes["calendar-item"]}>
            <Calendar calendar={now_calendar} />
          </div>
          <div className={classes["calendar-item"]}>
            <Calendar calendar={oneMonthLater_calendar} />
          </div>
        </div>
        <div className={`${classes["calendar-icon"]}`}>
          <span
            onClick={nextClickHandler}
            className={`material-icons ${classes["navigator"]}`}
          >
            navigate_next
          </span>
        </div>
      </div>
      <div className={classes["option"]}>
        <ul className={classes["option-wrapper"]}>
          <li className={classes["option-item"]}>
            <span className={classes["option-item-text"]}>정확한 날짜</span>
          </li>
          <li className={classes["option-item"]}>
            <span className={classes["option-item-text"]}>
              <span>+</span>1일
            </span>
          </li>
          <li className={classes["option-item"]}>
            <span className={classes["option-item-text"]}>
              <span>+</span>2일
            </span>
          </li>
          <li className={classes["option-item"]}>
            <span className={classes["option-item-text"]}>
              <span>+</span>3일
            </span>
          </li>
          <li className={classes["option-item"]}>
            <span className={classes["option-item-text"]}>
              <span>+</span>7일
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default CalendarModal;
