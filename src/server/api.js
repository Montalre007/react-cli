import LoginApi from "./LoginApi";
import UserInfoApi from "./UserInfoApi";
import ZoneBasicInfoApi from "./ZoneBasicInfoApi";

class Api {
    LoginApi = LoginApi
    UserInfoApi = UserInfoApi
    ZoneBasicInfoApi = ZoneBasicInfoApi
}
const server = (new Api());
export {server}