export const CHANGE_MAIN_VIEW = 'CHANGE_MAIN_VIEW';

export function changeMainView (newView) {
  return {
    type: CHANGE_MAIN_VIEW,
    payload, newView
  }
}