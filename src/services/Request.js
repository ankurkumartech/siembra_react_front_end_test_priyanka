/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import Storage from "./Storage";
// import Storage from "./Storage";
// import qs from 'qs';
// import { getScreenResolution } fro../utills/utillsill";
// import { routes } from "../constants/constantRoute";
// import AuthService from "./AuthService";
// import { getScreenResolution } from "../utils/utils";

//const API_URL = process.env.REACT_APP_API_URL;
// const REACT_APP_NODE_ENV = process.env.REACT_APP_NODE_ENV;
// const { LOGIN } = routes.AUTH;

// function refreshRequestToken(refreshToken) {
//   const refreshTokenBody = {
//     refresh_token: refreshToken,
//     grant_type: "refresh_token"
//   };
//   return request("POST", `${API_URL}${LOGIN}`, null, refreshTokenBody, {
//     "content-type": "application/x-www-form-urlencoded",
//     "Authorization": "Basic ZG9vcnN0ZXA6MTIz"
//   })
//     .then(data => {
//       // console.log(data.data);
//       const response = data.data;

//       const obj = {
//         accessToken: response.accessToken,
//         accessTokenExpiresAt: response.accessTokenExpiresAt,
//         refreshToken: response.refreshToken,
//         refreshTokenExpiresAt: response.refreshTokenExpiresAt
//       };

//       const userDetail = response.user;
//       // console.log("obj", obj);
//       // console.log("userDetail", userDetail);
//       Storage.setTokenDetail(obj);
//       Storage.setUserDetail(userDetail);
//       return Promise.resolve(data);
//       // store token to localstorage and send seconde request
//     })
//     .catch(e => {
//       // window.history.replaceState(null, null, '/#/login');
//       const err =
//         e.response &&
//           e.response.data &&
//           e.response.data.error &&
//           e.response.data.error[0]
//           ? e.response.data.error[0]
//           : null;
//       const errorName = err ? err.name : "";
//       if (errorName === "invalid_grant") {
//         Storage.removeKeepMeLoggedInCookie();
//         Storage.removeTokenDetail();
//         Storage.removeUserDetail();
//         window.history.go("/#/login");
//         return Promise.reject(e);
//       }
//       return Promise.reject(e);
//       // remove tokens and redirect to logout
//     });
// }

/**
 * request interceptors
 * @param {String} method GET,PUT,POST,DELETE
 * @param {String} url req url
 * @param {Object} params query parameters
 * @param {Object} body req body
 * @param {Object} headers req headers
 */
export const request = (
  method,
  url,
  params,
  body = {},
  headers = {},
  token = "",
  headersType,
  parameterkey
) => {
  token = Storage.getTokenInCookie() ? Storage.getTokenInCookie() : token;
  console.log("Storage.getTokenInCookie(): ", Storage.getTokenInCookie());
  console.log("token: ", token);

  headers = headers || {};
  params = params || {};
  body = body || {};

  headersType = headersType || "";
  headers.device_type = "browser";
  headers.device = "web_app";
  headers.app = "advantage";

  //   headers.device_type = "browser";
  //   headers.web_version = version;
  //   headers.browser_name = browserName;
  //   headers.resolution = getScreenResolution();

  // if (!headers["content-type"]) {
  //   headers["content-type"] = "application/json";
  // }
  // if((method === "POST" || method === "PUT") ){
  //   headers["content-type"] = "multipart/form-data";
  // }

  //   if (
  //     !(
  //       url.includes("login") ||
  //       url.includes("forgot-password") ||
  //       url.includes("crm-points/about")
  //     )
  //   ) {
  //     if (token && typeof token === 'object' && Object.keys(token).length > 0) {
  //       headers.Authorization = `Bearer ${token.accessToken}`;
  //     } else

  // if (token && window.location.pathname !== '/invitation-profile') {
  //   headers['x-authorization'] = `Bearer ${token}`;
  // }
  //     // headers.Authorization = 'Bearer e6ecea97ca8beda3211586f82eb3d065a6579b26';
  //   } else if (url.includes("login")) {
  //     headers.Authorization = "Basic ZG9vcnN0ZXA6MTIz";
  //   }

  if (token) {
    headers["x-authorization"] = `Bearer ${token}`;
    if (
      headersType === "formData" ||
      headersType === "formData-single-attachment"
    ) {
      headers["content-type"] = "multipart/form-data";
    } else {
      headers["content-type"] = "application/json";
    }
  }

  const options = {
    method,
    headers,
    params,
    url,
  };

  if (headers["content-type"] === "multipart/form-data") {
    console.log("inside formData", body);
    const formData = new FormData();

    if (headersType === "formData-single-attachment") {
      formData.append(parameterkey, body);
    } else {
      for (let [key, value] of Object.entries(body)) {
        console.log("key and value", key, value);
        formData.append(key, value);
      }
    }
    options.data = formData;
  } else {
    options.data = body;
  }
  // options.data = body;
  // if (
  //   (method === "POST" || method === "PUT") &&
  //   headers["content-type"] === "application/x-www-form-urlencoded"
  // ) {
  //   options.data = qs.stringify(body);
  // }
  // else
  // if (
  //   (method === "POST" || method === "PUT") &&
  //   headers["content-type"] === "multipart/form-data"
  // ) {
  //   headers["content-type"] = "multipart/form-data";
  //   // prepate multipart formdata body

  // else if (method === "POST" || method === "PUT") {
  //   options.data = body;
  // }
  //   console.log("Token", options);
  return axios(options)
    .then((data) => {
      //   console.log("Token", Promise.resolve(data));
      return Promise.resolve(data);
    })
    .catch((e) => {
      //   console.log("request error", e);
      const err =
        e.response &&
        e.response.data &&
        e.response.data.error &&
        e.response.data.error.length > 0 &&
        e.response.data.error[0]
          ? e.response.data.error[0]
          : null;
      const errorName = err ? err.name : "";
      console.error("errorName", errorName);
      //   const preserveRequest = options;
      //   if (errorName === "invalid_token") {
      //     return refreshRequestToken(token.refreshToken)
      //       .then(data => {
      //         const accessToken = data.data.accessToken;
      //         preserveRequest.headers.Authorization = `Bearer ${accessToken}`;
      //         return axios(preserveRequest);
      //       })
      //       .then(data => {
      //         return Promise.resolve(data);
      //       })
      //       .catch(e => {
      //         return Promise.reject(e);
      //       });
      //   }

      if (errorName !== "invalid_token") {
        return Promise.reject(e);
      }
    });
};

/**
 * new request interceptors
 * @param {String} method GET,PUT,POST,DELETE
 * @param {String} url req url
 * @param {Object} params query parameters
 * @param {Object} body req body
 * @param {Object} headers req headers
 */
export const newRequest = async (
  method,
  url,
  params,
  body = {},
  headers = {}
) => {
  const { data = {} } = await request(method, url, params, body, headers);
  return data;
};
