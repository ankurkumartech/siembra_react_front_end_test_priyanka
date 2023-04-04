import React, { Fragment, Component } from "react";

import Slider from "react-slick";
import "./Login.css";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Validation from "../../services/Validation";
import { Link } from "react-router-dom";
// import AuthService from "../../services/AuthService";
// import Storage from "./../../services/Storage";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import { withRouter } from "react-router";
import logo from "../../assets/utils/images/white-logo.png";
import qrcode from "../../assets/utils/images/qr-code.png";
import Validation from "../../services/Validation";
import AuthService from "../../services/AuthService";
import Storage from "../../services/Storage";
import cookie from "react-cookies";
import CommonButton from "../../components/CommonButton/CommonButton";

/**
 * Login page will display login page
 */
class Login extends Component {
  state = {
    controls: {
      username: {
        value: "",
        valid: null,
        touched: false,
        nullValue: null,
      },
      password: {
        value: "",
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null,
      },
      keepMeLoggenIn: false,
    },
    isLoading: false,
    isFormValid: false,
    passwordShown: false,
    errResponseMessage: "",
  };

  handleInputChange = (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    const { controls } = this.state;
    controls[controlName].value = controlValue;
    controls[controlName].touched = true;
    this.setState({ controls });
  };

  setCheckBoxValue = () => {
    const { controls } = this.state;
    controls.keepMeLoggenIn = !controls.keepMeLoggenIn;
    this.setState({ controls });
  };

  togglePassword = () => {
    this.setState({
      passwordShown: !this.state.passwordShown,
    });
  };
  handleValidation = () => {
    let { controls, isFormValid } = this.state;
    let { username, password } = controls;

    username = Validation.notNullValidator(username);
    username.valid = !username.nullValue;

    password = Validation.notNullValidator(password);
    password.valid = !password.nullValue;

    if (username.valid === true && password.valid === true) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }
    this.setState({ controls, isFormValid });

    return isFormValid;
  };

  setKeepMeLoggedIn = (value) => {
    Storage.setKeepMeLoggedInCookie(value);
  };

  login = async (e) => {
    e.preventDefault();
    const { controls } = this.state;
    const { username, password, keepMeLoggenIn } = controls;

    const isFormValid = this.handleValidation();

    if (isFormValid === false) {
      return;
    }

    const obj = {
      username: username.value,
      password: password.value,
      // app: "presure_pace",
      // app_version: "1.0",
    };
    this.setState({ errResponseMessage: "", isLoading: true });

    await AuthService.login(obj)
      .then(async (data) => {
        const response = data.data;
        const userDetail = response;
        console.log("userDetail: ", userDetail);

        const obj = {
          firstName: userDetail.first_name,
          lastName: userDetail.last_name,
          email: userDetail.email,
          userName: userDetail.username,
          studentId: userDetail.student_id,
          studentGoal: userDetail.student_goal,
        };
        Storage.setTokenInCookie(userDetail.token);
        Storage.setSessionId(userDetail.sessionid);
        Storage.setUserDetail(obj);

        if (userDetail.role === "recruiter") {
          console.log("cokikiufidf=====", cookie.load("userToken"));
          console.log("recruiter: ");
          this.props.history.push("/parent");
        } else if (userDetail.role == "student") {
          Storage.setStudentDetail(userDetail);
          this.props.history.push("/student/goal/cc-requirement");
        } else if (userDetail.role == "parent") {
          this.props.history.push("/parent");
        } else if (userDetail.role == "counselor") {
          this.props.history.push("/dashboard");
        } else if (userDetail.role == "admin") {
          window.location.replace("http://test.com:3000/admin");
        }

        // if (keepMeLoggenIn === true) {
        //   this.setKeepMeLoggedIn(true);
        // } else {
        //   this.setKeepMeLoggedIn(false);
        // }
        // this.props.history.replace("/otp-screen");
      })
      .catch((e) => {
        console.log("e: ", e.response);

        const err =
          e?.response?.data?.message ||
          "Oops!Something went wrong.Please try again";

        this.setState({
          errResponseMessage: err,
          isLoading: false,
        });
      });
    // localStorage.setItem("serearchQuery", "");
    // localStorage.setItem("pageNumber", 1);
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    const { controls, passwordShown, errResponseMessage } = this.state;
    const { username, password, keepMeLoggenIn } = controls;

    return (
      <Fragment>
        <Container fluid className='loginContainer m-0 p-0'>
          <Row className="h-100 no-gutters overflow-hidden">
            <Col lg="6" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="slide-img-bg" />
                    <div className="slider-content">
                      <img
                        src={logo}
                        alt="img"
                        style={{
                          width: "50%",
                          margin: "auto",
                          paddingBottom: "30px",
                        }}
                      />
                      <img
                        src={qrcode}
                        alt="img"
                        style={{ width: "80%", margin: "auto" }}
                      />
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="6" className='d-flex justify-content-center align-items-center'>
              <div className="loginArea">
                <h4 className="signin-title"> Please sign in with your username/password</h4>
                <Form className='loginForm'>
                  <Row form>
                    <Col md={12}>
                      <FormGroup className="position-relative">
                        <Label for="exampleEmail" className="custom-lable">
                          Username
                        </Label>
                        <Input
                          type="email"
                          name="username"
                          id="email"
                          className='loginInput'
                          placeholder="Enter your username"
                          value={username.value}
                          onChange={this.handleInputChange}
                        />
                        {/* <FontAwesomeIcon
                            icon={faUser}
                            size="lg"
                            style={{
                              position: "absolute",
                              right: "13px",
                              top: "41px"
                            }}
                          /> */}
                        <div className="error-container">
                          {username.nullValue && (
                            <div className="error">
                              * Username should not be empty
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="position-relative">
                        <Label className="custom-lable">Password</Label>
                        <Input
                          type={passwordShown ? "text" : "password"}
                          name="password"
                          id="password"
                          className='loginInput'
                          placeholder="Password"
                          value={password.value}
                          onChange={this.handleInputChange}
                        />
                        <FontAwesomeIcon
                          icon={faEye}
                          onClick={this.togglePassword}
                          style={{
                            position: "absolute",
                            right: "13px",
                            top: "41px",
                          }}
                        />
                        <div className="error-container">
                          {password.nullValue && (
                            <div className="error">
                              * Password should not be empty
                            </div>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <div className="d-flex justify-content-between">
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            name="check"
                            id="checkbox"
                          // checked={keepMeLoggenIn}
                          // onChange={this.setCheckBoxValue}
                          />
                          <Label for="exampleCheck" check>
                            Rememer me
                          </Label>
                        </FormGroup>
                        <Link
                          to="forgot-password"
                          style={{
                            color: "#083ABF",
                          }}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </Col>
                    {!(
                      errResponseMessage === null || errResponseMessage === ""
                    ) && <div className="error">{errResponseMessage}</div>}
                  </Row>

                  <div className="d-flex align-items-center mt-5">
                    <CommonButton
                      // name='Login'
                      type="submit"
                      btnClass='primaryBtn w-100'
                      btnHeight='40px'
                      onClick={this.login}
                    >
                      Sign In &nbsp; {this.state.isLoading && <CustomSpinner />}
                    </CommonButton>
                  </div>
                </Form>
                <div className="registerLinkWrap text-center">
                  <span>Don’t have an account? </span>
                  <Link className="registerLink" to={''}>Register</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(Login);

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = (dispatch) => ({
//   setAuthDetail: (auth) => dispatch(setAuthDetail(auth)),
// });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Login)
// );
