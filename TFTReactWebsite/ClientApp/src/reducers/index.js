import { combineReducers } from "redux";
import ChampionReducer from "./ChampionReducer";
import SetReducer from "./SetReducer";
import TraitReducer from "./TraitReducer";


export default combineReducers({
    Champion: ChampionReducer,
    Set: SetReducer,
    Trait: TraitReducer
});
