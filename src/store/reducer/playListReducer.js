const initialState = {
  currentPlayList: null,
  audioList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYLIST":
      return {
        ...state,
        currentPlayList: action.currentPlayList,
      };
    case "SET_AUDIO_LIST":
      return {
        ...state,
        audioList: action.audioList,
      };
    case "APPEND_AUDIO_LIST":
      return {
        ...state,
        audioList: [...action.audioList, ...state.audioList],
      };
    default:
      return state;
  }
};

export default reducer;
