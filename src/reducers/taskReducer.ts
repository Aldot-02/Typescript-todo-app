const initialState = {
    tasks: [],
    text: "",
    isUpdating: false,
    taskId: "",
};

const taskReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload,
            };
        case "SET_TEXT":
            return {
                ...state,
                text: action.payload,
            };
        case "SET_IS_UPDATING":
            return {
                ...state,
                isUpdating: action.payload,
            };
        case "SET_TASK_ID":
            return {
                ...state,
                taskId: action.payload,
            };
        default:
            return state;
    }
};

export default taskReducer;