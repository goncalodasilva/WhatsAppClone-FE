export const initialState = {
    user: null,
    room: {roomId: "6199f49c66661d545a0c9cfc", roomName: "Default Room"}
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ROOM: "SET_ROOM"
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_ROOM:
            return {
                ...state,
                room: action.room
            }
        default:
            return state;
    }
};

export default reducer;