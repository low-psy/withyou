import Header from "./Header/Header";
import MainComponent from "./Main/Main";
import Footer from "./Footer";
import classes from "./RootLayout.module.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { actions } from "../store/slice/main-item_slice";
import { useLoaderData } from "react-router";
import { searchCountriesAction } from "../store/slice/search_info_slice";

let first_render = 0;

function RootLayout() {
  let resources = useLoaderData();
  resources = resources.storeResources;

  const dispatch = useDispatch();

  dispatch(actions.resetItemHandler());
  dispatch(actions.addItemHandler(resources));

  const mapIsActive = useSelector((store) => store.mapModal.mapModalIsActive);

  if (first_render === 0) {
    dispatch(searchCountriesAction());
    first_render++;
  }
  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <MainComponent className={classes.main} />
      {!mapIsActive && <Footer className={classes.footer} />}
    </div>
  );
}

export default RootLayout;
