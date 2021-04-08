import {
    GET_PERFECT_SET,
    GET_CHAMPIONS,
} from "../actions/TFTActionTypes.js";

const initialState = {
    PerfectSets: [],
    Champions: [],
    TraitMedals: ""
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PERFECT_SET:
            return {
                ...state,
                PerfectSets: action.payload
            };

        case GET_CHAMPIONS:
            return {
                ...state,
                Champions: action.payload
            }; 

        default:
            return state;
    }
}