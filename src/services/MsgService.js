import { request } from "../services/Request";
import { routes } from "../constants/constant.route";
const API_URL = process.env.REACT_APP_API_URL;

const { GET_UNREAD_MESSAGE_COUNT } = routes.MESSAGE;

export default class MsgDataService {
  // static getMsgData(body) {
  //     return request("POST", `${API_URL}${routes.msg.GET_MESSAGE_LIST}`, null, body, null);
  // }

  // static getCannedMsg(){
  //     return request('GET' , `${API_URL}${routes.getCannedMsg.GET_CANNED_MSG}`, null, null, null)
  // }

  // static getList(isStudentOrCounselor , queryValue){
  //     console.log("queryValue", queryValue)
  //     if(queryValue.length > 0){
  //         let query;
  //         if(isStudentOrCounselor === 'students'){
  //             query = 'q'
  //         }else{
  //             query = 'w'
  //         }
  //         return request('GET' , `${API_URL}${routes.getListOfStudent.GET_LIST}/${isStudentOrCounselor}?${query}=${queryValue}&role=recruiter`, null, null, null)
  //     }

  // }
  // static sendMessage(body){
  //     return request('POST', `${API_URL}${routes.sendMessage.SEND_MESSAGE}`, null , body , null)
  // }

  // static attachment(body){
  //     return request('POST', `${API_URL}${routes.attachment.ATTACHMENT}`, null , body , null , null, "formData-single-attachment","file")
  // }

  // static deleteattachment(body){
  //     return request('DELETE', `${API_URL}${routes.attachment.ATTACHMENT}`, null , body , null , null, null)
  // }

  // static deleteMsg(body){
  //     return request('POST', `${API_URL}${routes.deleteMessage.DELETE_MESSAGE}`, null , body , null , null, null)
  // }

  // static getCannedMsgPage(body){
  //     return request('POST', `${API_URL}${routes.getMessageTemplate.getMessageTemplate}`, null , body , null , null, null)
  // }
  // static deleteCannedMessageTemplate(body , id){
  //     return request('DELETE', `${API_URL}${routes.deleteMessageTemplate.deleteMessageTemplate}${id}`, null , body , null , null, null)
  // }

  // static getSingleMessagesForStudent=(id)=>{
  //     return request('GET', `${API_URL}${routes.getSingleMessageForStudent.getSingleMessageForStudent}/${id}`, null, null, null, null);
  // }

  // static getIdOfSelectedRole=(body)=>{
  //     return request('POST', `${API_URL}${routes.getSingleMessageForStudent.gettingIdForMessageList}`, null , body , null , null, null)
  // }

  // static reply=(body , id)=>{
  //     return request('POST', `${API_URL}${routes.getSingleMessageForStudent.getSingleMessageForStudent}/${id}/reply`, null , body , null , null, null)
  // }

  // static query_result_message=(body)=>{
  //     return request('POST', `${API_URL}${routes.query_result_pagination.query_result_pagination}`, null , body , null , null, null)
  // }
  static getUnreadCountForStudent = (body) => {
    return request(
      "POST",
      `${API_URL}${GET_UNREAD_MESSAGE_COUNT}`,
      null,
      body,
      null,
      null,
      null
    );
  };

  // static getSpecificMessageDetail=(id)=>{
  //     return request('GET', `${API_URL}${routes.getSingleMessageForStudent.getSingleMessageForStudent}/${id}`, null , null , null , null, null)
  // }

  // static readCountDate=(body)=>{
  //     return request('POST',`${API_URL}${routes.getSingleMessageForStudent.date}`, null , body , null , null, null )
  // }
}
