import axios from "axios";
import {
    SET_TFT_SET,
    GET_ALL_TFT_SETS
} from "./TFTActionTypes";


import {
    getChampions,
    getPerfects
} from "./ChampionActions";


import {
    getTraitMedal,
    getTraits
} from "./TraitActions";

export const getAllTftSet = () => (dispatch) => {
    axios
        .get("/Set/all")
        .then((res) => {
            dispatch({
                type: GET_ALL_TFT_SETS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


export const setTftSet = (chosenSet) => (dispatch) => {
    axios
        .get("/Set/all")
        .then((res) => {
            dispatch({
                type: GET_ALL_TFT_SETS,
                payload: res.data
            });
            // Get the chosen set from set name
            let chosenSetObject = res.data.filter((e) => e.name === chosenSet)[0];
            dispatch({
                type: SET_TFT_SET,
                payload: chosenSetObject
            });

            // Set it into local
            localStorage.setItem("chosenSet", chosenSetObject.name);

            // Obtain all set data
            // -- Champion
            dispatch(getChampions(chosenSetObject.name));
            dispatch(getPerfects(chosenSetObject.name));

            // -- Trait
            dispatch(getTraitMedal(chosenSetObject.name));
            dispatch(getTraits(chosenSetObject.name));
        })
        .catch((err) => {
            console.log(err);
        });
};


export const initializeTftSet = () => (dispatch) => {
    axios
        .get("/Set/current")
        .then((res) => {
            console.log(res.data);
            dispatch(setTftSet(res.data.set));
        })
        .catch((err) => {
            console.log(err);
        });
};