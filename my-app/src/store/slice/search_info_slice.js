import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
};
const searchInfoSlice = createSlice({
  name: "searchInfo",
  initialState,
  reducers: {
    resetCountries: (state, action) => {
      state.countries = action.payload;
      return state;
    },
  },
});

export const searchCountriesAction = () => {
  return async (dispatch) => {
    const res = await fetch(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?select=country&group_by=country&limit=30"
    );
    const data = await res.json();
    let countries = data.results.map((obj) => {
      if (obj.country === "0") {
        return { flexible_trip: "유연한 검색" };
      }
      if (obj.country) {
        const country = obj.country;
        switch (country) {
          case "Australia":
            return { [country]: "오스트레일리아" };
          case "Austria":
            return { [country]: "오스트리아" };
          case "Belgium":
            return { [country]: "벨기에" };
          case "Canada":
            return { [country]: "케나다" };
          case "China":
            return { [country]: "중국" };
          case "Cuba":
            return { [country]: "쿠바" };
          case "Denmark":
            return { [country]: "덴마크" };
          case "France":
            return { [country]: "프랑스" };
          case "Germany":
            return { [country]: "독일" };
          case "Greece":
            return { [country]: "그리스" };
          case "Hong Kong":
            return { [country]: "홍콩" };
          case "Italy":
            return { [country]: "이탈리아" };
          case "Mexico":
            return { [country]: "멕시코" };
          case "Netherlands":
            return { [country]: "네덜란드" };
          case "Spain":
            return { [country]: "스페인" };
          case "Switzerland":
            return { [country]: "스위스" };
          case "United Kindom":
            return { [country]: "영국" };
          case "Uruguay":
            return { [country]: "우루과이" };
          case "Vanuatu":
            return { [country]: "우루과이" };
          case "Vatican City":
            return { [country]: "바티칸 시티" };
        }
      }
      return null;
    });
    countries = countries.filter((v) => v);
    dispatch(searchInfoSlice.actions.resetCountries(countries));
  };
};

export const action = searchInfoSlice.actions;
export const reducer = searchInfoSlice.reducer;
