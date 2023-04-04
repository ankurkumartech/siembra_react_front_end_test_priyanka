import { useState } from "react";
import { Fragment } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  Button,
  Label,
  Input,
  FormGroup,
  CardHeader,
} from "reactstrap";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import Storage from "../../services/Storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./StudentProfile.scss";
import ProfileService from "../../services/ProfileService";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import { useRef } from "react";
import exportIcon from "../../assets/utils/images/export.png";
import Loading from "../Loading/Loading";
import CommonButton from "../CommonButton/CommonButton";

function StudentProfile() {
  const user = Storage.getStudentDetail();
  let scrollToSuccess = useRef();

  const [firstGen, setFirstGen] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [mobile, setMobile] = useState(user?.mobile);
  const [recoveryEmail, setRecoveryEmail] = useState(user?.recovery_email);
  const [language, setLanguage] = useState(user?.language);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [guidanceByCollege, setGuidanceByCollege] = useState(
    user?.student_opt_out
  );
  const [parentName, setParentName] = useState(user && user.parent_name);
  const [parentEmail, setParentEmail] = useState(user && user.parent_email);
  const [parentMobileNumber, setParentMobileNumber] = useState(
    user && user.parent_mobile
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [showError, setShowError] = useState(false);
  const [profileAfterSave, setProfileAfterSave] = useState();
  const [nextClicked, setNextClicked] = useState(false);
  const [profileSavedSuccessfully, setProfileSavedSuccessfully] = useState(
    false
  );
  const [imageDataAfterUpload, setImageDataAfterUpload] = useState();
  const [profileImage, setProfileImage] = useState();
  const [loading, setLoading] = useState(false);
  const [
    profileImageUploadedSuccessfully,
    setProfileImageUploadedSuccessfully,
  ] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const onNextClick = () => {
    // setNextClicked(true);
    setLoading(true);
    if (confirmPassword && password !== confirmPassword) {
      setShowError(true);
      return;
    }
    let obj = {};
    if (firstName) {
      obj.first_name = firstName;
    }
    if (lastName) {
      obj.last_name = lastName;
    }
    if (email) {
      obj.email = email;
    }
    if (mobile) {
      obj.mobile = mobile;
    }
    if (language) {
      obj.language = language;
    }
    if (recoveryEmail) {
      obj.recover_email = recoveryEmail;
    }
    if (password) {
      obj.password = password;
    }
    if (confirmPassword) {
      obj.confirm_password = confirmPassword;
    }
    if (parentMobileNumber) {
      obj.parent_mobile = parentMobileNumber;
    }
    if (parentEmail) {
      obj.parent_email = parentEmail;
    }
    if (parentName) {
      obj.parent_name = parentName;
    }
    obj.student_opt_out = guidanceByCollege ? guidanceByCollege : false;
    obj.student_first_gen = firstGen ? firstGen : false;
    obj.profile_image = imageDataAfterUpload
      ? imageDataAfterUpload?.image_name
      : null;
    // obj.student_career_opt_in = receiveOpportunityFromUniversity
    //   ? receiveOpportunityFromUniversity
    //   : false;
    let final = { ...user, ...obj };
    console.log("final obj during update", obj);
    ProfileService.updateProfile(final)
      .then((data) => {
        console.log("data from the update profile", data);
        setProfileAfterSave(data.data);
        setNextClicked(false);
        if (data.data.image_name) {
          // let updatedProfileImage = {
          //     profile_image:data.data.image_name
          // }
          // let finalUserobj = {...final, ...updatedProfileImage}
          localStorage.setItem("profile_image", data.data.image_name);
        } else {
          Storage.setStudentDetail(final);
          //   localStorage.setItem("user", JSON.stringify(final));
        }
        setProfileSavedSuccessfully(true);
        setTimeout(() => {
          setProfileSavedSuccessfully(false);
        }, 3500);
        scrollFunction();
        setLoading(false);
        document.getElementById("hiddenBtn").click();
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
  };

  const scrollFunction = () => {
    scrollToSuccess.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    setLoading(true);
    ProfileService.uploadProfileImage(e.target.files[0])
      .then((data) => {
        setLoading(false);
        setImageDataAfterUpload(data.data);
        setProfileImageUploadedSuccessfully(true);
        setTimeout(() => {
          setProfileImageUploadedSuccessfully(false);
        }, 3500);
        // profileImageRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />

        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="student-profile-info-main">
              <div className="header-title d-flex justify-content-between align-items-center mb-3">
                <h4 className="title-main">Profile Information</h4>
              </div>
              {profileSavedSuccessfully && (
                <div
                  ref={scrollToSuccess}
                  id="success-container"
                  className="success_alert"
                >
                  Profile Information Saved Successfully.
                </div>
              )}
              {profileImageUploadedSuccessfully && (
                <div id="image-success-container" className="success_alert">
                  Profile Image uploaded Successfully!!. Please Click Save
                  Profile to Save the Image.
                </div>
              )}
              {loading ? (
                <Loading />
              ) : (
                <Card className="main-card mb-3 profile-main">
                  <CardHeader>Personal Information</CardHeader>
                  <CardBody>
                    <label className="chekbox-container topCheckbox">
                      I am a first gen student.
                      <input
                        type="checkbox"
                        checked={firstGen}
                        onChange={() => setFirstGen(!firstGen)}
                        value={firstGen}
                      />
                      <span className="checkmark" />
                    </label>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            First Name
                          </Label>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter your firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Enter your lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Language Preference
                          </Label>
                          <select
                            className="form-control form-group-select select select-height-70rem"
                            name="reason"
                            onChange={(e) => setLanguage(e.target.value)}
                            value={language}
                          >
                            <option value="en">En</option>
                            <option value="es">Es</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <div className="drop-box">
                            <input
                              type="file"
                              id="fileID"
                              onChange={handleFileChange}
                            />
                            <img src={exportIcon} alt="img" />
                            <h4>Choose File</h4>
                            <p>Supports: JPG, JOEG2000, PNG</p>
                          </div>
                          {profileImage && (
                            <p className="profile-name">{profileImage?.name}</p>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardHeader>Student Contact Information</CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            School Email Address
                          </Label>
                          <Input
                            type="email"
                            disabled
                            name="email"
                            id="email"
                            value={email}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Mobile Number
                          </Label>
                          <Input
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Recovery Email Address
                          </Label>
                          <Input
                            type="email"
                            name="recoveryEmail"
                            id="recoveryEmail"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <label className="chekbox-container agreeLabel">
                          I agree to share my school progress information, my
                          interests, awards and athletics with college
                          admissions professionals.
                          <input
                            type="checkbox"
                            value={guidanceByCollege}
                            checked={guidanceByCollege}
                            onChange={() =>
                              setGuidanceByCollege(!guidanceByCollege)
                            }
                          />
                          <span className="checkmark" />
                        </label>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardHeader>User Information</CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                          Language Preference
                          </Label>
                          <select
                            className="form-control form-group-select select select-height-70rem"
                            name="reason"
                            onChange={(e) => setLanguage(e.target.value)}
                            value={language}
                          >
                            <option value="en">En</option>
                            <option value="es">Es</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Password
                          </Label>
                          <Input
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            onClick={togglePassword}
                            style={{
                              position: "absolute",
                              right: "13px",
                              top: "41px",
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Confirm Password
                          </Label>
                          <Input
                            type={confirmPasswordShown ? "text" : "password"}
                            name="confirmpassword"
                            id="confirmpassword"
                            value={confirmPassword}
                            onFocus={() => setShowError(false)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            onClick={toggleConfirmPassword}
                            style={{
                              position: "absolute",
                              right: "13px",
                              top: "41px",
                            }}
                          />
                        </FormGroup>
                      </Col>
                      {showError && (
                        <div className="show_error">
                          Password and Confirm Password should be same.
                        </div>
                      )}
                    </Row>
                  </CardBody>
                  <CardHeader>Parent/Guardian Contact Information</CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Parent Name
                          </Label>
                          <Input
                            type="text"
                            name="parentname"
                            id="parentname"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Parent Email Address
                          </Label>
                          <Input
                            type="text"
                            name="parentemailname"
                            id="parentemailname"
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="position-relative">
                          <Label for="exampleEmail" className="custom-lable">
                            Parent Mobile Phone Number
                          </Label>
                          <Input
                            type="text"
                            name="parentMobileNumber"
                            id="parentMobileNumber"
                            value={parentMobileNumber}
                            onChange={(e) =>
                              setParentMobileNumber(e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <div className="d-flex btnWrapper">
                          <div className="btnInner">
                            <CommonButton
                              name='Cancel'
                              btnClass='secondaryBtn profileBtn'
                              btnWidth='153px'
                              btnHeight='50px'
                            />
                          </div>
                          <div className="btnInner">
                            <CommonButton
                              btnClass='primaryBtn profileBtn'
                              onClick={onNextClick}
                              btnWidth='153px'
                              btnHeight='50px'
                            >
                              Save Profile {loading && <CustomSpinner />}
                            </CommonButton>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>&nbsp;</Col>
                    </Row>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default StudentProfile;
