import { request } from "../services/Request";
import { routes } from "../constants/constant.route";

const { GET_LADDER, SAVE_LADDER } = routes.LADDER;

const API_URL = process.env.REACT_APP_API_URL;

export default class LaddersDataService {
  static getLaddersData() {
    return request("GET", `${API_URL}${GET_LADDER}`, null, null, null, null);
  }

  static saveLaddersData(body) {
    return request("POST", `${API_URL}${SAVE_LADDER}`, null, body, null, null);
  }
}
