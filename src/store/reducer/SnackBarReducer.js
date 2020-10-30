const initialState = {
  open: false,
  severity: "",
  message: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        open: action.open,
        severity: action.severity,
        message: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
