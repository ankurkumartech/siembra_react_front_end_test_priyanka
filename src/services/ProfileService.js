import { request } from "../services/Request";
import { routes } from "../constants/constant.route";

const API_URL = process.env.REACT_APP_API_URL;

const { UPDATE_PROFILE, PROFILE_UPLOAD } = routes.PROFILE;

export default class ProfileService {
  static uploadProfileImage(body) {
    return request(
      "POST",
      `${API_URL}${PROFILE_UPLOAD}`,
      null,
      body,
      null,
      null,
      "formData-single-attachment",
      "user_image"
    );
  }

  static updateProfile(body) {
    return request(
      "POST",
      `${API_URL}${UPDATE_PROFILE}`,
      null,
      body,
      null,
      null
    );
  }
}
