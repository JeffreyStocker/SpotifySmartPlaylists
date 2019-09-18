import {CHANGE_MAIN_VIEW} from '../actions/views';

const defaultState = {
  main: 'home'
}

const reqMainViews = ['main', 'syncSpotify'];
const checkMainViews = function (view) {
  return reqMainViews.includes(view);
}

export default function (prevState = defaultState, action) {
  const {type, payload} = action;
  let newState;
  switch(type) {
    case CHANGE_MAIN_VIEW:
      if (!checkMainViews(action.payload)) throw new Error('Must be one of these view', reqMainViews);
      newState = Object.assign({}, prevState);
      newState.main = payload;
      break;
  }

  return newState ? newState : prevState;
}