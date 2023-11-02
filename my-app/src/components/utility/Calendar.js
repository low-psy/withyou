import classes from "./Calendar.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { actions as modalActions } from "../../store/slice/header-modal_slice";
import { actions as searchActions } from "../../store/slice/header-search_slice";

function Calendar({ className, calendar }) {
  const dispatch = useDispatch();
  const headerModalSearch = useSelector((store) => {
    return store.headerSearch.headerModalSearch;
  });
  const headerModal = useSelector((store) => {
    return store.headerModal;
  });

  const day_category = ["일", "월", "화", "수", "목", "금", "토"];
  const days = Array.from(
    { length: Number(calendar.last_date) },
    (v, i) => i + 1
  );

  const dayClickHandler = (e) => {
    const month = parseInt(e.currentTarget.firstChild.textContent);
    const date = parseInt(e.currentTarget.lastChild.textContent);

    if (
      headerModalSearch.checkOut &&
      (headerModal.checkIn.month > month ||
        (headerModal.checkIn.month === month &&
          headerModal.checkIn.date > date))
    ) {
      dispatch(modalActions.defaultCheck());
      dispatch(modalActions.addCheckIn({ month: month, date: date }));
      dispatch(searchActions.headerModalSearchToggle("check_out"));
      return;
    }
    if (headerModalSearch.checkIn) {
      dispatch(modalActions.addCheckIn({ month: month, date: date }));
      dispatch(searchActions.headerModalSearchToggle("check_out"));
      return;
    }
    if (headerModalSearch.checkOut) {
      dispatch(modalActions.addCheckOut({ month: month, date: date }));
      return;
    }
  };

  return (
    <section className={`${className} ${classes["calendar"]}`}>
      <div className={classes["calendar-month"]}>
        {calendar.year}년 {calendar.month}월
      </div>
      <div className={classes["calendar-day"]}>
        <ul className={classes["calendar-day-category"]}>
          {day_category.map((v) => {
            return <li>{v}</li>;
          })}
        </ul>
        <ul className={classes["calendar-day-main"]}>
          {days.map((day, i) => {
            let unfilled = "";
            let first_day = "";
            if (calendar.today_date && day < calendar.today_date) {
              unfilled += classes["unfilled"];
            }
            if (i === 0) {
              first_day += classes[`start_${calendar.first_day}`];
            }
            let filled = "";
            if (
              day === headerModal.checkIn.date &&
              calendar.month === headerModal.checkIn.month
            ) {
              filled = classes["filled"];
            } else if (
              day === headerModal.checkOut.date &&
              calendar.month === headerModal.checkOut.month
            ) {
              filled = classes["filled"];
            }
            return (
              <li
                id={`${calendar.month}_${day}`}
                onClick={dayClickHandler}
                className={`${unfilled} ${first_day} ${classes["day"]} ${filled}`}
              >
                <div style={{ display: "none" }}>{calendar.month}</div>
                <div>{day}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Calendar;
