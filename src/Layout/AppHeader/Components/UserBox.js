import React, { Fragment } from "react";

import Ionicon from "react-ionicons";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownItem,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import { withRouter } from "react-router-dom";
import Storage from "../../../services/Storage";
import PlaceholderImage from "../../../assets/utils/images/placeholder.jpg";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      profileImage: localStorage.getItem("profile_image"),
      user: Storage.getStudentDetail(),
    };
    console.log("user:==== ", this.state.user);
    console.log("profileImage: ", this.state.profileImage);
  }

  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success",
      }
    ));

  handleLogout = () => {
    let sessionid = this.state.user && this.state.user?.sessionid;
    let obj = {
      sessionid,
    };
    axios
      .post(`${API_URL}/api/v1/auth/logout`, obj)
      .then((res) => {
        if (res.status === 200) {
          Storage.removeTokenCookie();
          Storage.removeSessionId();
          Storage.removeUserDetail();
          localStorage.removeItem("profile_image");
          this.props.history.push("/login");
        }
        console.log("res:===log ", res);
      })
      .catch((err) => {
        console.log("err: ", err.response);
      });

    // fetch(`${API_URL}/api/v1/auth/logout`, {
    //   method: "POST",
    //   headers: {
    //     "x-authorization": `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify(obj),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     cookie.remove("user", { path: "/", domain: "siembramobile.com" });
    //     cookie.remove("sessionid", { path: "/", domain: "siembramobile.com" });
    //     cookie.remove("role", { path: "/", domain: "siembramobile.com" });
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("name");
    //     localStorage.removeItem("user");
    //     localStorage.removeItem("profile_image");
    //     localStorage.removeItem("page");
    //     window.location.replace(REDIRECT_URL);
    //   })
    //   .catch((error) => console.log("error from the service", error));
  };

  render() {
    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-1 user-detail-box">
                    <div className="d-flex align-items-center">
                      <img
                        width={35}
                        className="rounded-circle"
                        src={
                          this.state.profileImage
                            ? this.state.profileImage
                            : PlaceholderImage
                        }
                        alt=""
                      />
                      <div className="widget-content-left  ml-3 header-user-info">
                        <div className="widget-heading">
                          {this.state.user
                            ? this.state.user?.first_name +
                              " " +
                              this.state.user?.last_name
                            : null}{" "}
                          <FontAwesomeIcon
                            className="ml-2 opacity-8"
                            icon={faAngleDown}
                          />
                        </div>
                      </div>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <div className="rm-pointers dropdown-menu-sm p-0">
                      {/* <div className="dropdown-menu-header-inner bg-info"> */}
                      <DropdownItem
                        onClick={() =>
                          this.props.history.push("/student/profile")
                        }
                      >
                        My Profile
                      </DropdownItem>
                      <DropdownItem onClick={this.handleLogout}>
                        Logout
                      </DropdownItem>
                      {/* </div> */}
                    </div>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              {/* <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">
                  {this.state.user
                    ? this.state.user?.first_name +
                      " " +
                      this.state.user?.last_name
                    : null}{" "}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(UserBox);
