import { useDispatch } from "react-redux/es/exports";
import classes from "./MapButton.module.css"
import {actions} from "../../store/slice/map-modal"

function MapButton({text}){
  const dispatch = useDispatch();
  const mapClickHandler = () => {
    dispatch(actions.mapModalToggle());
  }
  return (
    <div onClick={mapClickHandler} className={classes["map"]}>
      {text.text}
      {text.icon}
    </div>
  );
}

export default MapButton