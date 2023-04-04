import { request } from "../services/Request";
import { routes } from "../constants/constant.route";

const { CALENDER } = routes.CALENDER;
const API_URL = process.env.REACT_APP_API_URL;

export default class CalendarService {
  static getCalendarEventDetails(body) {
    return request("GET", `${API_URL}${CALENDER}`, null, body, null, null);
  }
}
