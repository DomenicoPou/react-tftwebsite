import axios from "axios";
import {
    GET_CHAMPIONS,
    GET_PERFECT_SET
} from "./TFTActionTypes";

export const getChampions = (set) => (dispatch) => {
    axios
        .get(`/Champion/all/${set}`)
        .then((res) => {
            dispatch({
                type: GET_CHAMPIONS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


export const getPerfects = (set) => (dispatch) => {
    axios
        .get(`/Champion/perfects/${set}`)
        .then((res) => {
            dispatch({
                type: GET_PERFECT_SET,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

