import { LOGIN, LOGOUT } from "../actions";
import {AnyAction} from "redux";

interface LoginState {
    isLogin: boolean;
}

const login = (state: LoginState = {
    isLogin: false,
}, action: AnyAction) => {
    switch (action.type) {
        case LOGIN:
            state = {
                isLogin: true,
            }
            break;
        case LOGOUT:
            state = {
                isLogin: false,
            }
            break;
        default:
            break;
    }
    return state;
}

export default login;
