import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { actions as modalActions } from "../../../../store/slice/header-modal_slice";
import classes from "./GuestModal.module.css";

function GuestModal() {
  const dispatch = useDispatch();
  const headerModalGuest = useSelector((store) => {
    return store.headerModal.guest;
  });
  const addClickHandler = (e) => {
    const target = e.currentTarget.className;
    if (target !== "adult" && headerModalGuest.adult === 0) {
      dispatch(modalActions.addGuest(target));
      dispatch(modalActions.addGuest("adult"));
      return;
    }
    dispatch(modalActions.addGuest(target));
  };
  let adultRemoveClickHandler = (e) => {
    dispatch(modalActions.removeGuest("adult"));
  };
  let childrenRemoveClickHandler = (e) => {
    dispatch(modalActions.removeGuest("children"));
  };
  let babyRemoveClickHandler = (e) => {
    dispatch(modalActions.removeGuest("baby"));
  };
  let animalRemoveClickHandler = (e) => {
    dispatch(modalActions.removeGuest("animal"));
  };
  let adultDisabled = "";
  let chidrenDisabled = ""
  let babyDisabled = ""
  let animalDisabled = ""
  if (
    headerModalGuest.adult <= 1 && (headerModalGuest.children || headerModalGuest.baby || headerModalGuest.animal)
  ) {
    adultDisabled = classes["disabled"];
    adultRemoveClickHandler = () => {};
  }
  if(headerModalGuest.adult===0){
    adultDisabled = classes["disabled"];
    adultRemoveClickHandler = () => {};
  }
  if(headerModalGuest.children===0){
    chidrenDisabled = classes["disabled"];
    childrenRemoveClickHandler = () => {};
  }
  if(headerModalGuest.baby===0){
    babyDisabled = classes["disabled"];
    babyRemoveClickHandler = () => {};
  }
  if(headerModalGuest.animal===0){
    animalDisabled = classes["disabled"];
    animalRemoveClickHandler = () => {};
  }

  return (
    <section onClick={(e) => e.stopPropagation()} className={classes["guest"]}>
      <ul className={classes["guest-wrapper"]}>
        <li className={classes["guest-item"]}>
          <ul className={classes["item-contents"]}>
            <li className={classes["person"]}>
              <h4>성인</h4>
              <span>13세 이상</span>
            </li>
            <div className={classes["count"]}>
              <li className="adult" onClick={adultRemoveClickHandler}>
                <span
                  className={`material-icons ${classes["minus_icon"]} ${adultDisabled}`}
                >
                  remove
                </span>
              </li>
              <li className={classes["count-number"]}>
                {headerModalGuest.adult}
              </li>
              <li className="adult" onClick={addClickHandler}>
                <span className={`material-icons ${classes["plus_icon"]}`}>
                  add
                </span>
              </li>
            </div>
          </ul>
        </li>
        <li className={classes["guest-item"]}>
          <ul className={classes["item-contents"]}>
            <li className={classes["person"]}>
              <h4>어린이</h4>
              <span>2~12세</span>
            </li>
            <div className={classes["count"]}>
              <li className="children" onClick={childrenRemoveClickHandler}>
                <span
                  className={`material-icons ${classes["minus_icon"]} ${chidrenDisabled}`}
                >
                  remove
                </span>
              </li>
              <li className={classes["count-number"]}>
                {headerModalGuest.children}
              </li>
              <li className="children" onClick={addClickHandler}>
                <span className={`material-icons ${classes["plus_icon"]}`}>
                  add
                </span>
              </li>
            </div>
          </ul>
        </li>
        <li className={classes["guest-item"]}>
          <ul className={classes["item-contents"]}>
            <li className={classes["person"]}>
              <h4>유아</h4>
              <span>2세 미만</span>
            </li>
            <div className={classes["count"]}>
              <li className="baby" onClick={babyRemoveClickHandler}>
                <span
                  className={`material-icons ${classes["minus_icon"]} ${babyDisabled}`}
                >
                  remove
                </span>
              </li>
              <li className={classes["count-number"]}>
                {headerModalGuest.baby}
              </li>
              <li className="baby" onClick={addClickHandler}>
                <span className={`material-icons ${classes["plus_icon"]}`}>
                  add
                </span>
              </li>
            </div>
          </ul>
        </li>
        <li className={classes["guest-item"]}>
          <ul className={classes["item-contents"]}>
            <li className={classes["person"]}>
              <h4>반려동물</h4>
              <span className={classes["assist_animal"]}>
                보조동물을 동반하시나요?
              </span>
            </li>
            <div className={classes["count"]}>
              <li className="animal" onClick={animalRemoveClickHandler}>
                <span
                  className={`material-icons ${classes["minus_icon"]} ${animalDisabled}`}
                >
                  remove
                </span>
              </li>
              <li className={classes["count-number"]}>
                {headerModalGuest.animal}
              </li>
              <li className="animal" onClick={addClickHandler}>
                <span className={`material-icons ${classes["plus_icon"]}`}>
                  add
                </span>
              </li>
            </div>
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default GuestModal;
