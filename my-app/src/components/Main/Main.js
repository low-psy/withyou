import { useSelector } from "react-redux/es/exports";
import { useState } from "react";
import classes from "./Main.module.css";
import MainContents from "./MainContents/MainContents";
import MainFilter from "./MainFilter/MainFilter";
import MapButton from "./MapButton";
import Map from "../Map/MapComponent";

function Main({className}) {
  const mapIsActive = useSelector((store) => store.mapModal.mapModalIsActive);
  const [scrollClass, setScrollClasses] = useState("")
  let scrollYIsTrue = false;
  document.addEventListener('scroll', () => {
    if(scrollYIsTrue === (window.scrollY > 0)){
      return;
    }else{
      if(window.scrollY === 0){
        setScrollClasses("");
        scrollYIsTrue = false;
        return
      }
      if (window.scrollY > 100) {
        setScrollClasses(classes["scroll_filter"]);
        scrollYIsTrue = true;
        return;
      }
    }
  })
  const mapActiveText = {
    text: "목록 표시하기",
    icon: <span class="material-icons">location_on</span>,
  };

  const defaultText = {
    text: "지도 표시하기",
    icon: <span class="material-icons">location_on</span>,
  };
  
  const mapButtonText = mapIsActive ? mapActiveText : defaultText;
  
  return (
    <main className={`${className} ${classes["main-wrapper"]}`}>
      <MainFilter className={`${classes["main-filter"]} ${scrollClass}`} />
      {!mapIsActive && <MainContents className={classes["main-contents"]} />}
      {mapIsActive && <Map />}
      <MapButton text={mapButtonText} />
    </main>
  );
}

export default Main
