import {SET_USER} from '../actions/user';

export default function (prevState = {}, action) {
  let newState;

  switch(action.type) {
    case SET_USER:
      newState = {...action.payload};
      break;
  }
  return newState ? newState : prevState;
}