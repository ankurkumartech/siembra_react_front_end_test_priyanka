import { request } from "./Request";
import { routes } from "../constants/constant.route";
import Storage from "./Storage";

const {
  LOGIN,
  FORGOT_PASSWORD,
  PASSWORD_VERIFY_TOKEN,
  RESET_PASSWORD,
  VERIFY_OTP,
  RESET_OTP,
} = routes.AUTH;

const API_URL = "https://test.siembramobile.com";

export default class AuthService {
  static isAuthenticated() {
    const tokenDetail = Storage.getTokenDetail();
    if (tokenDetail && tokenDetail.accessToken) {
      return true;
    }
    return false;
  }

  static login(loginData) {
    return request("POST", `${API_URL}${LOGIN}`, null, loginData, null);
  }

  static verifyToken(obj) {
    return request(
      "POST",
      `${API_URL}${PASSWORD_VERIFY_TOKEN}`,
      null,
      obj,
      null
    );
  }

  static forgotPassword(body) {
    return request("POST", `${API_URL}${FORGOT_PASSWORD}`, null, body, null);
  }
  static resetPassword(body) {
    return request("POST", `${API_URL}${RESET_PASSWORD}`, null, body, null);
  }
  static verifyOTP(body) {
    return request("POST", `${API_URL}${VERIFY_OTP}`, null, body, null);
  }
  static resetOTP(body) {
    return request("POST", `${API_URL}${RESET_OTP}`, null, body, null);
  }

  static logout() {
    Storage.removeTokenCookie();
    // Storage.removeTokenDetail();
    Storage.removeUserDetail();
  }
}
