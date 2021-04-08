import {
    GET_TRAIT_MEDALS,
    GET_TRAITS
} from "../actions/TFTActionTypes.js";

const initialState = {
    Medals: ""
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TRAIT_MEDALS:
            return {
                ...state,
                Medals: action.payload
            }; 
        case GET_TRAITS:
            return {
                ...state,
                Traits: action.payload
            };
        default:
            return state;
    }
}