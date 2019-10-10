const SET_KEYDOWN = "SET_KEYDOWN";

const initialState = { keyDown: '' };

export default function game(state = initialState, action) {
    switch (action.type) {
        case SET_KEYDOWN:
            return {
                ...state,
                keyDown: action.keyDown
            };
        default:
            return state;
    }
}
