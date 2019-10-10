const SET_KEYDOWN = "SET_KEYDOWN";

function writeKeyDown(keyDown) {
  return {
    type: SET_KEYDOWN,
    keyDown
  };
}

export function setKeyDown(keyDown) {
  return dispatch => dispatch(writeKeyDown(keyDown));
}
