import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import Modal from "../../utility/Modal";
import GuestSearchIcon from "./GuestSearchIcon";
import classes from "./HeaderModalSearch.module.css";
import CalendarModal from "./modal/CalendarModal";
import TravleModal from "./modal/TravleModal";
import SearchCalendar from "./SearchCalendar";
import GuestModal from "./modal/GuestModal";
import { actions } from "../../../store/slice/header-search_slice";
import { actions as headerModalActions } from "../../../store/slice/header-modal_slice";

function HeaderModalSearch({ className, onToggleHeaderModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerModalSearch = useSelector((store) => {
    return store.headerSearch.headerModalSearch;
  });
  const headerSearch = useSelector((store) => {
    return store.headerSearch.headerSearch;
  });
  const headerModalCategory = useSelector((store) => {
    return store.headerSearch.headerModalCategory;
  });
  const headerModalTravle = useSelector((store) => {
    return store.headerModal.travle;
  });
  const headerModalCheckIn = useSelector((store) => {
    return store.headerModal.checkIn;
  });
  const headerModalCheckOut = useSelector((store) => {
    return store.headerModal.checkOut;
  });
  const headerModalGuest = useSelector((store) => {
    return store.headerModal.guest;
  });
  const countries = useSelector((store) => store.searchInfo.countries);

  useEffect(() => {
    if (headerSearch.where) {
      dispatch(actions.headerModalSearchToggle("travle_search"));
    } else if (headerSearch.when) {
      dispatch(actions.headerModalSearchToggle("check_in"));
    } else if (headerSearch.guest) {
      dispatch(actions.headerModalSearchToggle("guest"));
    }
  }, [headerSearch, dispatch]);

  const isActive =
    headerModalSearch.travleSearch ||
    headerModalSearch.checkIn ||
    headerModalSearch.checkOut ||
    headerModalSearch.guest;

  // searchItem에 해당하는 요소는 className의 index 1번으로 무조건 active의 기준이 되는 값(tavle, checkIn, checkOut, guest)값을 가져야 한다.
  const searchItemClickHandler = (e) => {
    dispatch(
      actions.headerModalSearchToggle(e.currentTarget.className.split(" ")[1])
    );
  };
  let travleClass = "";
  if (headerModalTravle) {
    travleClass = classes["active_text"];
  }
  const [travleSearch, setTravleSearch] = useState();
  const travleSearchHandler = (e) => {
    setTravleSearch(e.currentTarget.value);
  };
  let modalClass = `${classes["modal"]}`;

  if (headerModalSearch.travleSearch) {
    modalClass = `${classes["modal"]} ${classes["travle"]}`;
  } else if (headerModalSearch.checkIn || headerModalSearch.checkOut) {
    modalClass = `${classes["modal"]} ${classes["check"]}`;
  } else if (headerModalSearch.guest) {
    modalClass = `${classes["modal"]} ${classes["guest"]}`;
  }

  let checkInText = "날짜 추가";
  let checkInClass = "";
  if (headerModalCheckIn.month && headerModalCheckIn.date) {
    checkInText = `${headerModalCheckIn.month}월 ${headerModalCheckIn.date}일`;
    checkInClass = classes["active_text"];
  }

  let checkOutText = "날짜 추가";
  let checkOutClass = "";
  if (headerModalCheckOut.month && headerModalCheckOut.date) {
    checkOutText = `${headerModalCheckOut.month}월 ${headerModalCheckOut.date}일`;
    checkOutClass = classes["active_text"];
  }

  let calendar = [
    {
      className: `${classes["search-item"]} check_in ${
        headerModalSearch.checkIn && classes["onActive"]
      } ${classes["search-item_check"]}`,
      children: (
        <div className={classes["search-item-list"]}>
          <h3>체크인</h3>
          <p className={checkInClass}>{checkInText}</p>
          <input value={headerModalCheckIn} name="checkIn" type="hidden" />
        </div>
      ),
    },
    {
      className: `${classes["search-item"]} check_out ${
        headerModalSearch.checkOut && classes["onActive"]
      } ${classes["search-item_check"]}`,
      children: (
        <div className={classes["search-item-list"]}>
          <h3>체크아웃</h3>
          <p className={checkOutClass}>{checkOutText}</p>
          <input value={headerModalCheckOut} name="checkOut" type="hidden" />
        </div>
      ),
    },
  ];

  let checkDayText = "날짜 추가";
  let checkDayClass = "";
  if (
    headerModalCheckIn.month &&
    headerModalCheckIn.date &&
    !headerModalCheckOut.month
  ) {
    checkDayText = `${headerModalCheckIn.month}월 ${headerModalCheckIn.date}일`;
    checkDayClass = classes["active_text"];
  } else if (
    headerModalCheckIn.month &&
    headerModalCheckIn.date &&
    headerModalCheckOut.month &&
    headerModalCheckOut.date
  ) {
    checkDayText = `${headerModalCheckIn.month}월 ${headerModalCheckIn.date}일~${headerModalCheckOut.month}월 ${headerModalCheckOut.date}일`;
    checkDayClass = classes["active_text"];
  }

  if (headerModalCategory.activate) {
    calendar = [
      {
        className: `${classes["search-item"]} check_in ${
          headerModalSearch.checkIn && classes["onActive"]
        } ${classes["search-item_check_day"]}`,
        children: (
          <div className={classes["search-item-list"]}>
            <h3>날짜</h3>
            <p className={checkDayClass}>{checkDayText}</p>
            <input
              value={{
                checkIn: headerModalCheckIn,
                checkOut: headerModalCheckOut,
              }}
              name="checkDay"
              type="hidden"
            />
          </div>
        ),
      },
    ];
  }
  let guestText = "게스트 추가";
  let guestClass = "";

  if (
    headerModalGuest.adult ||
    headerModalGuest.chidren ||
    headerModalGuest.baby ||
    headerModalGuest.animal
  ) {
    let baby = "";
    let animal = "";
    let guest = headerModalGuest.adult + headerModalGuest.children;
    if (headerModalGuest.baby) {
      baby = `,유아 ${headerModalGuest.baby}명`;
    }
    if (headerModalGuest.animal) {
      animal = `,반려동물 ${headerModalGuest.animal}마리`;
    }
    guestText = `게스트 ${guest}명${baby}${animal}`;
    guestClass = classes["active_text"];
  }

  const searchClickHandler = () => {
    console.log(headerModalTravle);
    if (headerModalTravle == "") {
      onToggleHeaderModal();
      return navigate("/");
    }
    const country_ko = headerModalTravle;
    const country_en_obj = countries.filter((obj) => {
      const country = Object.keys(obj)[0];
      return obj[country] === country_ko;
    })[0];
    let guest = headerModalGuest.adult + headerModalGuest.children;
    console.log(guest);

    const country_en = Object.keys(country_en_obj)[0];

    const searchUrl = `?searchUrl=public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records&where=country%3D%22${country_en}%22%20and%20guests_included%3E%3D${guest}&limit=40`;
    navigate(searchUrl);
    onToggleHeaderModal();
    dispatch(headerModalActions.defaultAll());
  };

  return (
    <Form method="post" className={classes["header-modal-wrapper"]}>
      <ul
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${className} ${classes["header-modal-search"]}`}
      >
        <li
          onClick={searchItemClickHandler}
          className={`${classes["search-item"]} travle_search ${
            headerModalSearch.travleSearch && classes["onActive"]
          }`}
        >
          <div className={classes["search-item-list"]}>
            <h3>여행지</h3>
            <input
              className={`${classes["item-list-input"]} ${travleClass}`}
              placeholder="여행지 검색"
              type="text"
              onChange={travleSearchHandler}
              value={travleSearch}
            />
          </div>
        </li>
        <SearchCalendar onSearch={searchItemClickHandler} calendar={calendar} />
        <li
          onClick={searchItemClickHandler}
          className={`${classes["search-item"]} guest ${
            headerModalSearch.guest && classes["onActive"]
          }`}
        >
          <div className={classes["search-item-list"]}>
            <ul className={classes["guest-search"]}>
              <li>
                <h3>여행자</h3>
                <p className={`${classes["guest-search-text"]} ${guestClass}`}>
                  {guestText}
                </p>
                <input value={headerModalGuest} name="guest" type="hidden" />
              </li>
              <div
                onClick={searchClickHandler}
                className={classes["guest-search-btn"]}
              >
                {isActive && <GuestSearchIcon />}
                {!isActive && (
                  <span className={`material-icons ${classes["search_icon"]}`}>
                    search
                  </span>
                )}
              </div>
            </ul>
          </div>
        </li>
      </ul>
      {isActive && (
        <Modal className={modalClass}>
          {headerModalSearch.travleSearch && (
            <TravleModal onClick={setTravleSearch} />
          )}
          {(headerModalSearch.checkIn || headerModalSearch.checkOut) && (
            <CalendarModal />
          )}
          {headerModalSearch.guest && <GuestModal />}
        </Modal>
      )}
    </Form>
  );
}

export default HeaderModalSearch;
