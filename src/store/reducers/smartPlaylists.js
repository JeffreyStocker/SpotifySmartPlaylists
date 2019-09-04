import {ADD_PLAYLIST, REMOVE_PLAYLIST, UPDATE_PLAYLIST} from '../actions/smartPlaylists'

const reducer = function (state = [], action) {
  const {type, payload} = action;
  let newState;

  switch(type) {
    case ADD_PLAYLIST:
      if (payload.index === null) {
        newState = [...state, payload];
      } else (
        newState = [...state.slice(0, payload.index), payload.playlist, ...state.slice(payload.index)]
      )
      break;
    case REMOVE_PLAYLIST:
      newState = [...state.slice(0, payload.index), ...state.slice(payload.index + 1)]
      break;
    case UPDATE_PLAYLIST:
      newState = [...state];
      newState[payload.index] = payload.playlist;
      break;
  }
  return newState ? newState : state;
}

export default reducer;