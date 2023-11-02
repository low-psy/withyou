import { useLoaderData } from "react-router-dom";
import { Fragment, useEffect, useRef } from "react";
import classes from "./Map.module.css";

let { google } = window;
let map;
let selectedMarker = "";

function buildContent(result, price, title) {
  const content = document.createElement("div");

  let text_review_rate = (result.rate / 20).toFixed(2);
  if (text_review_rate == 0.0) {
    text_review_rate = "new";
  }
  let accomodates_text = `숙박 ${result.accommodates}개`;

  content.classList.add(classes["marker_module"]);
  content.innerHTML = `
    <div class=${classes["price-tag"]}>
        ${price}
    </div>
    <div class="${classes["info_window"]}">
        <div class=${classes["info-image"]}>
          <img src=${result.picture} alt="info_window_img" />
        </div>
        <div class=${classes["info-text"]}>
          <div class=${classes["info-title"]}>
            <h2>${title}</h2>
            <div class=${classes["info-title-rate"]}>
               <span class="material-icons-round">grade</span>
              <div>${text_review_rate}</div>
            </div>
          </div>
          <div class=${classes["info-para"]}>
            <div class=${classes["mb"]}>${accomodates_text}</div>
            <div class=${classes["info-para-price"]}>${price}/박</div>
          </div>
        </div>
    </div>
    `;
  return content;
}

function toggleHighlight(markerView) {
  if (selectedMarker) {
    selectedMarker.zIndex = null;
    selectedMarker.content.classList.remove(classes["highlight"]);
  }
  markerView.content.classList.add(classes["highlight"]);
  markerView.zIndex = 1;
  selectedMarker = markerView;
}

async function initMap(results, mapRef) {
  const { Map } = await google.maps.importLibrary("maps");
  // const { Marker } = await google.maps.importLibrary("marker");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { LatLng } = await google.maps.importLibrary("core");
  const center = new LatLng(
    results[0].geolocation.lat,
    results[0].geolocation.lng
  );

  map = new Map(mapRef.current, {
    center: center,
    zoom: 15,
    mapId: "core_map",
  });

  let markers = results.map((result) => {
    const marker_price = (result.price * 1337)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const marker_price_text = `￦${marker_price}원`;
    const title_text = `${result.host_name}의 ${result.results || "house"}`;

    const marker = new AdvancedMarkerElement({
      map,
      position: result.geolocation,
      content: buildContent(result, marker_price_text, title_text),
      title: title_text,
      zIndex: null,
    });
    marker.addListener("click", (e) => {
      const geolocation = marker.position;
      map.setCenter(geolocation);
      map.panTo(geolocation);
      toggleHighlight(marker);
    });
    return marker;
  });
}

function MapComponent() {
  const mapRef = useRef(null);
  const data = useLoaderData();
  const results = data.results.map((result) => {
    return {
      id: result.id,
      host_name: result.host_name,
      results: result.results_type,
      geolocation: { lat: result.geolocation.lat, lng: result.geolocation.lon },
      price: result.price,
      picture: result.xl_picture_url,
      rate: result.review_scores_rating,
      accommodates: result.accommodates,
    };
  });

  useEffect(() => {
    initMap(results, mapRef);
  });
  return (
    <Fragment>
      <section ref={mapRef} id="map" className={classes.map} />
    </Fragment>
  );
}

export default MapComponent;
