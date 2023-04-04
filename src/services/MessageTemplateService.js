import { request } from "../services/Request";
import { routes } from "../constants/constant.route";
const API_URL = process.env.REACT_APP_API_URL;

const { TRANSLATE } = routes.TRANSLATE;

export default class MessageTemplateService {
  static translateTemplate(body) {
    return request("POST", `${API_URL}${TRANSLATE}`, null, body, null);
  }
  // static getCannedMessageForTemplateAfterCreatingNew(body) {
  //     return request("POST", `${API_URL}${routes.cannedMessageForTemplate.cannedMessageForTemplate}`, null, body, null);
  // }

  // static getCannedMessageForTemplateAfterCreatingNewForSuperCounselor(body) {
  //     return request("POST", `${API_URL}${routes.cannedMessageTemplateForSuperCounselor.cannedMessageTemplateForSuperCounselor}`, null, body, null, null);
  // }

  // static getCannedMessageForTemplateAfterEditing(body, id){
  //     return request("PATCH", `${API_URL}${routes.cannedMessageForTemplate.cannedMessageForTemplate}/${id}`, null, body, null);
  // }

  // static getCannedMessageForTemplateAfterEditingForSuperCounselor(body, id){
  //     return request("PATCH", `${API_URL}${routes.cannedMessageTemplateForSuperCounselor.cannedMessageTemplateForSuperCounselor}/${id}`, null, body, null, null);
  // }
}
