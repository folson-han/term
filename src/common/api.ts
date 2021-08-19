import { instance } from "../plugins";
import url from "./url";

/***/
export function login(){
    return instance({
        method: "POST",
        url: url.get("login"),
    });
}
