import { request } from "../services/Request";
import { routes } from "../constants/constant.route";

const API_URL = process.env.REACT_APP_API_URL;

const {
  CONFIGURELIST,
  GET_INTEREST,
  SAVE_INTEREST,
  TRANSLATE,
  GET_ACADEMICS,
  GET_ACTIVITIES,
  GET_ATHLETICS,
  SAVE_ACTIVITIES,
  SAVE_ACADEMICS,
  SAVE_ATHLETICS,
} = routes.PORTFOLIO;

export default class PortFolioService {
  static getAcademics(body) {
    return request(
      "POST",
      `${API_URL}${GET_ACADEMICS}`,
      null,
      body,
      null,
      null
    );
  }
  static getActivities(body) {
    return request(
      "POST",
      `${API_URL}${GET_ACTIVITIES}`,
      null,
      body,
      null,
      null
    );
  }
  static getAthletics(body) {
    return request(
      "POST",
      `${API_URL}${GET_ATHLETICS}`,
      null,
      body,
      null,
      null
    );
  }
  static translateTemplate(body) {
    return request("POST", `${API_URL}${TRANSLATE}`, null, body, null);
  }

  static getConfigureList() {
    return request("GET", `${API_URL}${CONFIGURELIST}`, null, null, null, null);
  }
  static saveActivities(body) {
    return request(
      "POST",
      `${API_URL}${SAVE_ACTIVITIES}`,
      null,
      body,
      null,
      null
    );
  }
  static saveAcademics(body) {
    return request(
      "POST",
      `${API_URL}${SAVE_ACADEMICS}`,
      null,
      body,
      null,
      null
    );
  }
  static saveAthletics(body) {
    return request(
      "POST",
      `${API_URL}${SAVE_ATHLETICS}`,
      null,
      body,
      null,
      null
    );
  }
  static getInterest(body) {
    return request("POST", `${API_URL}${GET_INTEREST}`, null, body, null, null);
  }
  static saveInterest(body) {
    return request(
      "POST",
      `${API_URL}${SAVE_INTEREST}`,
      null,
      body,
      null,
      null
    );
  }
}
