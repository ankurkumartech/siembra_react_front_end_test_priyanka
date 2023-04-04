/* eslint-disable import/prefer-default-export */
// const crmPointV2Prefix = '/api/v2/crm-points';

export const routes = {
  AUTH: {
    // FORGOT_PASSWORD: "/api/v1/user/forgot-password/",
    LOGIN: "/api/v1/auth/login",
    // REFRESH_TOKEN: "/api/user/generate_access_token",
    // PASSWORD_VERIFY_TOKEN: "/api/v1/user/password-verify-token",
    // RESET_PASSWORD: "/api/v1/user/forgot-password/confirm/",
    // VERIFY_OTP: '/api/user/auth/verify_otp',
    // RESET_OTP: '/api/user/auth/send_otp'
    // LOGOUT: "/api/v1/user/logout-from-all",
  },
  STUDENT: {
    GOAL: "/api/v1/goal",
    STUDENT_GOAL: "/api/v1/studentgoal",
  },
  PORTFOLIO: {
    CONFIGURELIST: "/api/v1/configure?limit=100",
    GET_INTEREST: "/api/v1/configure/interest",
    SAVE_INTEREST: "/api/v1/configure/interestsave",
    TRANSLATE: "/api/v1/translate/translate",
    GET_ACADEMICS: "/api/v1/configure/academics",
    GET_ACTIVITIES: "/api/v1/configure/activities",
    GET_ATHLETICS: "/api/v1/configure/athletics",
    SAVE_ACTIVITIES: "/api/v1/configure/activitysave",
    SAVE_ACADEMICS: "/api/v1/configure/academicsave",
    SAVE_ATHLETICS: "/api/v1/configure/athleticssave",
  },
  TRANSLATE: {
    TRANSLATE: "/api/v1/translate/translate",
  },
  LADDER: {
    GET_LADDER: "/api/v1/configure/ladder",
    SAVE_LADDER: "/api/v1/configure/ladder",
  },
  PROFILE: {
    UPDATE_PROFILE: "/api/v1/me/profile",
    PROFILE_UPLOAD: "/api/v1/me/attachment",
  },
  CALENDER: {
    CALENDER: "/api/v1/calendar",
  },
  MESSAGE: {
    GET_UNREAD_MESSAGE_COUNT: "/api/v1/me/stud_count_dict",
  },
};
