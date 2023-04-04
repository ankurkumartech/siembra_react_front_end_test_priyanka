// all localstorage operation will be reside here
import cookie from "react-cookies";

function setLocalItem(key, value) {
  localStorage.setItem(key, value);
}

function getLocalItem(key) {
  return localStorage.getItem(key);
}

function removeLocalItem(key) {
  return localStorage.removeItem(key);
}

function setCookie(name, value, options) {
  cookie.save(name, value, options);
}

function getCookie(name) {
  return cookie.load(name);
}

export default class Storage {
  static setStudentDetail(studentDetail) {
    setLocalItem("student-detail", JSON.stringify(studentDetail));
  }

  static getStudentDetail() {
    let studentDetail = getLocalItem("student-detail");
    return JSON.parse(studentDetail);
  }

  static setKeepMeLoggedInCookie(value) {
    if (value) {
      setCookie("KeepMeLoggedIn", true, { maxAge: 21321231312 });
    } else {
      setCookie("KeepMeLoggedIn", false, null);
    }
  }

  static setTokenInCookie(value) {
    if (value) {
      setCookie("userToken", value, {
        path: "/",
        secure: true,
      });
    } else {
      setCookie("userToken", false, null);
    }
  }

  static getTokenInCookie() {
    return getCookie("userToken");
  }
  static removeTokenCookie() {
    cookie.remove("userToken", { path: "/" });
  }

  static setSessionId(value) {
    if (value) {
      setCookie("sessionId", value, {
        path: "/",
        secure: true,
      });
    } else {
      setCookie("sessionId", false, null);
    }
  }

  static getSessionId() {
    return getCookie("sessionId");
  }
  static removeSessionId() {
    cookie.remove("sessionId", { path: "/" });
  }

  static setUserDetail(value) {
    if (value) {
      setCookie("userDetail", value, {
        path: "/",
        // secure: true,
      });
    } else {
      setCookie("userDetail", false, null);
    }
  }

  static getUserDetail() {
    return getCookie("userDetail");
  }
  static removeUserDetail() {
    cookie.remove("userDetail", { path: "/" });
  }
}
