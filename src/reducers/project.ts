import { ADDPROJECT, DELPROJECT } from "../actions";
import {AnyAction} from "redux";

interface ProjectState{
    active: string;
}

const project = (state: ProjectState = {
    active: "项目 0"
}, action: AnyAction) => {
    switch (action.type) {
        case ADDPROJECT:
            state = {
                active: action.payload,
            };
            break;
        case DELPROJECT:
            state = {
                active: "",
            };
            break;
        default:
            break;
    }
    return state;
}

export default project;
