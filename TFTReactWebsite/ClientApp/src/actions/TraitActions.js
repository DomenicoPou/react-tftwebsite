import axios from "axios";
import {
    GET_TRAIT_MEDALS,
    GET_TRAITS
} from "./TFTActionTypes";

export const getTraitMedal = (chosenSet) => (dispatch) => {
    dispatch({
        type: GET_TRAIT_MEDALS,
        payload: `/Image/traits/${chosenSet}/bg/png`
    });
}; 

export const getTraits = (chosenSet) => (dispatch) => {
    axios
        .get(`/Trait/${chosenSet}`)
        .then((res) => {
            dispatch({
                type: GET_TRAITS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};