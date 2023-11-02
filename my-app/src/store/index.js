import { configureStore } from "@reduxjs/toolkit";

import { reducer as headerSearchReducer } from "./slice/header-search_slice";
import { reducer as headerModalReducer } from "./slice/header-modal_slice";
import { reducer as mapModalReducer } from "./slice/map-modal";
import { reducer as mainItemReducer } from "./slice/main-item_slice";
import { reducer as searchInfoReducer } from "./slice/search_info_slice";

const store = configureStore({
  reducer: {
    headerSearch: headerSearchReducer,
    headerModal: headerModalReducer,
    mapModal: mapModalReducer,
    mainItem: mainItemReducer,
    searchInfo: searchInfoReducer,
  },
});

export default store;

// import { createContext, useCallback, useState } from "react";

// const headerSearchInitialState = {
//   where: false,
//   when: false,
//   guest: false,
// };

// const headerSearchModalInitialState = {
//   travleSearch: false,
//   checkIn: false,
//   checkOut: false,
//   guest: false,
// };

// const headerCategoryModalInitialState = {
//   place: true,
//   activate: false,
//   online: false,
// };

// export const headerContext = createContext({
//   headerSearch: headerSearchInitialState,
//   headerSearchModal: headerSearchModalInitialState,
//   headerCategoryModal: headerCategoryModalInitialState,
//   headerSearchClickHandler: (type) => {},
//   headerSearchModalClickHandler: (type) => {},
//   headerCategoryModalClickHandler: (type) => {}
// });

// const HeaderContextProvider = ({children}) => {
//   const [headerSearch, setHeaderSearch] = useState(headerSearchInitialState);
//   const [headerSearchModal, setHeaderSearchModal] = useState(
//     headerSearchModalInitialState
//   );
//   const [headerCategoryModal, setHederCategoryModal] = useState(headerCategoryModalInitialState)

//   const headerSearchClickHandler = useCallback((type) => {
//     switch (type) {
//       case "where":
//         setHeaderSearch(() => {
//           return { ...headerSearchInitialState, where: true };
//         });
//         break;
//       case "when":
//         setHeaderSearch(() => {
//           return { ...headerSearchInitialState, when: true };
//         });
//         break;
//       case "guest":
//         setHeaderSearch(() => {
//           return { ...headerSearchInitialState, guest: true };
//         });
//         break;
//       case "default":
//         setHeaderSearch(headerSearchInitialState)
//     }
//   },[])

//   const headerSearchModalClickHandler = useCallback((type) => {
//     switch (type) {
//       case "travle_search":
//         setHeaderSearchModal(() => {
//           return { ...headerSearchModalInitialState, travleSearch: true };
//         });
//         break;
//       case "check_in":
//         setHeaderSearchModal(() => {
//           return { ...headerSearchModalInitialState, checkIn: true,};
//         });
//         break;
//       case "check_out":
//         setHeaderSearchModal(() => {
//           return { ...headerSearchModalInitialState, checkOut: true };
//         });
//         break;
//       case "guest":
//         setHeaderSearchModal(() => {
//           return { ...headerSearchModalInitialState, guest: true };
//         });
//         break;
//       case "default":
//         setHeaderSearchModal(headerSearchModalInitialState);
//         break;
//     }
//   },[])

//   const headerCategoryModalClickHandler = useCallback((type) => {
//     switch (type) {
//       case "place":
//         setHederCategoryModal(() => {
//           return { ...headerCategoryModalInitialState, place: true };
//         });
//         break;
//       case "activate":
//         setHederCategoryModal(() => {
//           return {
//             ...headerCategoryModalInitialState,
//             activate: true,
//             place: false,
//           };
//         });
//         break;
//       case "online":
//         setHederCategoryModal(() => {
//           return {
//             ...headerCategoryModalInitialState,
//             online: true,
//             place: false,
//           };
//         });
//         break;
//       case "default":
//         setHederCategoryModal(headerCategoryModalInitialState);
//     }
//   }, []);

//   const headerComponentContext = {
//     headerSearch: headerSearch,
//     headerSearchModal: headerSearchModal,
//     headerCategoryModal: headerCategoryModal,
//     headerSearchClickHandler,
//     headerSearchModalClickHandler,
//     headerCategoryModalClickHandler,
//   };

//   return (
//     <headerContext.Provider value={headerComponentContext}>
//       {children}
//     </headerContext.Provider>
//   );
// }

// export default HeaderContextProvider;
