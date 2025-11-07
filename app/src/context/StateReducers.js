import { reducerCases } from "./constants";

export const initialState = {
  user: undefined,
  showLoginModal: false,
  isSeller: false,
  serviceData: undefined,
  hasOrdered: false,
  reloadReviews: false,
  isDarkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case reducerCases.CLEAR_USER:
      return {
        ...state,
        user: undefined,
      };
    case reducerCases.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.showLoginModal,
      };
    case reducerCases.CLOSE_AUTH_MODAL:
      return {
        ...state,
        showLoginModal: false,
      };
    case reducerCases.SWITCH_MODE:
      return {
        ...state,
        isSeller: !state.isSeller,
      };
    case reducerCases.SET_SERVICE_DATA:
      return {
        ...state,
        serviceData: action.serviceData,
      };

    case reducerCases.HAS_USER_ORDERED_SERVICE:
      return {
        ...state,
        hasOrdered: action.hasOrdered,
      };
    case reducerCases.ADD_REVIEW:
      return {
        ...state,
        serviceData: {
          ...state.serviceData,
          reviews: [...state.serviceData.reviews, action.newReview],
        },
      };
    case reducerCases.TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case reducerCases.SET_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
