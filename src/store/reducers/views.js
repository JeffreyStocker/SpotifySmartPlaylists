import {CHANGE_MAIN_VIEW} from '../actions/views';

const defaultState = {
  main: 'home'
}

export default function (prevState = defaultState, action) {
  const {type, payload} = action;
  let newState;
  switch(type) {
    case CHANGE_MAIN_VIEW:
      newState = Object.create({}, prevState);
      newState.main = payload;
      break;
  }

  return newState ? newState : prevState;
}