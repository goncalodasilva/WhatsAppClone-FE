export const initialState = {
    user: null,
    chat: null//{chatId: "6199f49c66661d545a0c9cfc", chatName: "Default Chat", chatUserIds: ["6199f49c66661d545a0c9cfc"]},
    //chats: []
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_CHAT: "SET_CHAT"/*,
    SET_CHATS: "SET_CHATS",
    ADD_CHAT: "ADD_CHATS"*/
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_CHAT:
            return {
                ...state,
                chat: action.chat
            }
        /*case actionTypes.SET_CHATS:
            return {
                ...state,
                chats: action.chats
            }
        case actionTypes.ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, action.chat]
            }*/
        default:
            return state;
    }
};

export default reducer;