import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import PlaceHolder from "../../assets/utils/images/profile-img.png";
import Advert from "../Advert/Advert";
import "./StudentGoal.scss";
import StopLightOnTrack from "../../assets/utils/images/on-track.png";
import StopLightOffTrack from "../../assets/utils/images/off-track.png";
import StopLightAtRisk from "../../assets/utils/images/at-risk.png";

import Storage from "../../services/Storage";
import StudentGoalService from "../../services/StudentGoalService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import SendMessageModal from "./SendMessageModal";
import CommonButton from "../CommonButton/CommonButton";

const statusMessage = [
  {
    title: "Needs Attention!",
    remark: "You are not making progress on your goal.",
    img: StopLightOffTrack,
  },
  {
    title: "Congratulations! 🎉✨",
    remark: "You are on track to complete your goal.",
    subremark: "Keep up the great work!.",
    img: StopLightOnTrack,
  },
  {
    title: "Keep It Up!",
    remark: "There are few areas that need more of .",
    subremark: "your attention",
    img: StopLightAtRisk,
  },
  {
    title: `We're having trouble displaying your goal`,
    remark: "status at this time. Please try again.",
    // img: StopLight_NoStatusAvailable,
  },
];

function StudentGoal() {
  let studentData = Storage.getStudentDetail();
  console.log("studentData: ", studentData);
  let location = useLocation();

  const [studentGoalData, setStudentGoalData] = useState();
  const [goalId, setGoalId] = useState();
  const [goalIdData, setGoalIdData] = useState();
  const [studentCourseData, setStudentCourseData] = useState();
  const [showRemark, setShowRemark] = useState();
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSendMessageModal, setOpenSendMessageModal] = useState(false);
  const [modalTitle, setModalTilte] = useState();

  const [goalStatus, setGoalStatus] = useState();

  let goal = location.pathname.split("/").pop();
  // const [goal, setGoal] = useState(location.pathname.split("/").pop());

  const getGoalById = () => {
    setLoading(true);
    StudentGoalService.goal(goalId)
      .then((data) => {
        setGoalIdData(data.data);
        let convertToArray = [];
        Object.keys(data && data.data && data.data.green).map((key, index) => {
          convertToArray.push(data.data.green[key]);
        });
        setStudentCourseData(convertToArray);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (goalId) {
      getGoalById();
    }
  }, [goalId]);

  useEffect(() => {
    if (goalStatus === "blank") {
      setShowRemark(statusMessage[3]);
    } else if (goalStatus === "red") {
      setShowRemark(statusMessage[0]);
    } else if (goalStatus === "yellow") {
      setShowRemark(statusMessage[2]);
    } else {
      setShowRemark(statusMessage[1]);
    }
  }, [goalStatus]);

  useEffect(() => {
    getStudentGoal();
  }, [location]);

  const getStudentGoal = () => {
    console.log("getStudentGoal: ===========>>>");
    setLoading(true);
    StudentGoalService.getGoal(studentData?.school_id, studentData?.student_id)
      .then((data) => {
        setStudentGoalData(data.data.objects);
        setLoading(false);
      })
      .catch((error) => console.error("error from the service", error));
  };

  useEffect(() => {
    if (studentGoalData?.length > 0) {
      let arr = [];
      console.log("goal: ", goal);
      if (goal === "uc-requirement") {
        arr = studentGoalData?.filter((item) => item.goal_id === 45);
        setGoalId(arr[0].goal_id);
        setGoalStatus(arr[0].status);
      }
      if (goal === "cc-requirement") {
        arr = studentGoalData?.filter((item) => item.goal_id === 65);
        setGoalId(arr[0].goal_id);
        setGoalStatus(arr[0].status);
      }
      if (goal === "csu-requirement") {
        arr = studentGoalData?.filter((item) => item.goal_id === 68);
        setGoalId(arr[0].goal_id);
        setGoalStatus(arr[0].status);
      }
    }
  }, [studentGoalData]);

  const handleToggleModal = (data) => {
    setOpenSendMessageModal(true);
    setModalTilte(data);
  };
  return (
    <>
      <Row>
        <Col lg="12" className="mx-auto">
          <div className="student-profile-container">
            <img
              className="goal-placeholder"
              src={PlaceHolder}
              alt="Placeholder"
            />
            <div>
              <h1>
                Hello {studentData?.first_name + " " + studentData?.last_name}
              </h1>
              <p className="no-margin-bottom">You have an active goals</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="12" className="mx-auto">
          <Advert />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <div className="title">
            <h1>Goal Progress Detail</h1>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <Card className="main-card mb-3 shadow-box p-0 requirementCard">
              <CardHeader>{goalIdData?.goal_name}</CardHeader>
              <CardBody>
                <Row>
                  <Col lg="6" className='mb-lg-0 mb-3 text-lg-left text-center'>
                    <img src={showRemark?.img} alt="on-track" className="trackImg" />
                  </Col>

                  <Col lg="6" className='d-flex flex-column'>
                    {!showViewDetails && goalStatus && (
                      <div className="congrats-main text-center">
                        <h2>{showRemark?.title}</h2>
                        <p>{showRemark?.remark}</p>
                      </div>
                    )}

                    {showViewDetails &&
                      studentCourseData &&
                      studentCourseData.slice(0, 1).map((_item, index) => {
                        return (
                          <div className="detail-main w-100">
                            <h3>Active goals</h3>
                            <div className="shadow-box mb-4">
                              <h4>My Goals</h4>
                              <ul>
                                <li> {goalIdData?.goal_name}</li>
                              </ul>
                            </div>
                            <h3>Progress details</h3>
                            <div className="shadow-box mb-4">
                              <h4>On Track to complete</h4>
                              {studentCourseData?.slice(0, 1).map((item) => (
                                <ul>
                                  <li>{`${item.display_fieldname
                                    } ${item.display_operator === ">="
                                      ? "greater than equal to"
                                      : item.display_operator === "<="
                                        ? "less than equal to"
                                        : item.display_operator === ">"
                                          ? "greater than"
                                          : item.display_operator === "<"
                                            ? "less than"
                                            : item.display_operator === "="
                                              ? "equal to"
                                              : ""
                                    } ${item.value}`}</li>
                                </ul>
                              ))}

                              {studentCourseData
                                ?.slice(1)
                                .map((item, index) => (
                                  <ul>
                                    <li
                                      key={index}
                                      style={{ fontSize: "14px" }}
                                    >{`Credit Deficient ${item.display_coursename
                                      } req`}</li>
                                  </ul>
                                ))}
                            </div>
                            <h3>At risk/In trouble to complete</h3>
                            <div className="shadow-box mb-4">
                              <ul>
                                <li>None</li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}

                    <div className="mt-3 btnWrapper">
                      <div className="btnInner">
                        <CommonButton
                          name={showViewDetails ? "Hide Details" : "View Details"}
                          btnClass={`${showViewDetails ? 'secondaryBtn' : 'primaryBtn'} w-100 btnGoal`}
                          onClick={() => setShowViewDetails(!showViewDetails)}
                        />
                      </div>
                      
                      <div className="btnInner">
                        <CommonButton
                          name={showViewDetails ? "Contact counselor" : "Send Message"}
                          btnClass={`${showViewDetails ? 'primaryBtn' : 'secondaryBtn'} w-100 btnGoal`}
                          onClick={() => handleToggleModal("msg")}
                        />
                      </div>
                    </div>
                    <CommonButton
                      name='Change Goal'
                      btnClass='primaryBtn w-100'
                      onClick={() => handleToggleModal("goal")}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      {openSendMessageModal && (
        <SendMessageModal
          open={openSendMessageModal}
          closeHandler={() => setOpenSendMessageModal(false)}
          modalTitle={modalTitle}
        />
      )}
    </>
  );
}

export default StudentGoal;
