import {
    SET_TFT_SET,
    GET_ALL_TFT_SETS,
    GET_CURRENT_SET
} from "../actions/TFTActionTypes";

const initialState = {
    Sets: [],
    CurrentSet: {},
    ChosenSet: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_TFT_SET:
            return {
                ...state,
                ChosenSet: action.payload
            };

        case GET_ALL_TFT_SETS:
            return {
                ...state,
                Sets: action.payload
            };

        case GET_CURRENT_SET:
            return {
                ...state,
                CurrentSet: action.payload
            };

        default:
            return state;
    }
}