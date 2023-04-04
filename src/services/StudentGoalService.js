import { request } from "./Request";
import { routes } from "../constants/constant.route";

const { STUDENT_GOAL, GOAL } = routes.STUDENT;

// import { routes } from '../constants/constantAPIRoute'
const API_URL = process.env.REACT_APP_API_URL;

export default class StudentGoalService {
  //    static requirement(body){
  //        return request('POST', `${API_URL}${routes.studentgoal.requirement}` , null , body , null )
  //    }
  //    static getGoal(schoolValue, studentValue){
  //        return request('GET',`${API_URL}${routes.studentgoal.studentgoal}?school=${schoolValue}&student=${studentValue}`);
  //    }
  static goal(goalId) {
    return request(
      "GET",
      `${API_URL}${GOAL}/${goalId}`,
      null,
      null,
      null,
      null
    );
  }

  static getGoal(schoolValue, studentValue) {
    return request(
      "GET",
      `${API_URL}${STUDENT_GOAL}?school=${schoolValue}&student=${studentValue}`
    );
  }
}
