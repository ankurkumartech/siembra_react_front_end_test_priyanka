import { useEffect } from "react";
import { useState } from "react";
import { Card, Row, Col, CardBody, Button } from "reactstrap";
import LaddersDataService from "../../services/LaddersService";
import CommonButton from "../CommonButton/CommonButton";
import Loading from "../Loading/Loading";
import "./Ladders.scss";

function Ladders() {
  const [
    collegeEnrollMentLaddersList,
    setCollegeEnrollMentLaddersList,
  ] = useState(false);

  const [completedFafsa, setCompletedFafsa] = useState(false);
  const [recommendations, setRecommendations] = useState(false);
  const [completedCollegeEssay, setCompletedCollegeEssay] = useState(false);
  const [submittedTranscript, setSubmittedTranscript] = useState(false);
  const [paidApplicationFees, setPaidApplicationFees] = useState(false);
  const [loading, setLoading] = useState(false);
  const [laddersData, setLaddersData] = useState();
  const [tagline, setTagLine] = useState();
  const [ladderUpdate, setLadderUpdate] = useState(false);

  useEffect(() => {
    getLaddersData();
  }, []);

  const getLaddersData = () => {
    setLoading(true);
    LaddersDataService.getLaddersData()
      .then((data) => {
        setLoading(false);
        setLaddersData(data.data.message[0]);
        console.log(
          "data from the service",
          data.data.profile_quote[0].profile_quote
        );
        if (data && data.data && data.data.message && data.data.message[0]) {
          console.log("data.data:==== ", data.data);
          // const [{complete_all , essay, p_recom, transcript, paid_fee , fafsa}] = data.data.message[0]
          setCollegeEnrollMentLaddersList(data.data.message[0].complete_all);
          setCompletedCollegeEssay(data.data.message[0].essay);
          setRecommendations(data.data.message[0].p_recom);
          setSubmittedTranscript(data.data.message[0].transcript);
          setPaidApplicationFees(data.data.message[0].paid_fee);
          setCompletedFafsa(data.data.message[0].fafsa);
          setTagLine(data.data.profile_quote[0].profile_quote);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
  };

  const handleCheckBoxChange = async (value) => {
    if (value === "completedFafsa") {
      setCompletedFafsa(!completedFafsa);
    } else if (value === "recommendations") {
      setRecommendations(!recommendations);
    } else if (value === "completedCollegeEssay") {
      setCompletedCollegeEssay(!completedCollegeEssay);
    } else if (value === "submittedTranscript") {
      setSubmittedTranscript(!submittedTranscript);
    } else if (value === "paidApplicationFees") {
      setPaidApplicationFees(!paidApplicationFees);
    }
  };

  const handleSelectAll = () => {
    if (collegeEnrollMentLaddersList === true) {
      setCollegeEnrollMentLaddersList(false);
      setCompletedFafsa(false);
      setRecommendations(false);
      setCompletedCollegeEssay(false);
      setSubmittedTranscript(false);
      setPaidApplicationFees(false);
      setCollegeEnrollMentLaddersList(false);
    } else if (collegeEnrollMentLaddersList === false) {
      setCollegeEnrollMentLaddersList(true);
      setCompletedFafsa(true);
      setRecommendations(true);
      setCompletedCollegeEssay(true);
      setSubmittedTranscript(true);
      setPaidApplicationFees(true);
      setCollegeEnrollMentLaddersList(true);
    }
  };

  const saveLadder = () => {
    setLoading(true);
    let obj = {
      essay: completedCollegeEssay && completedCollegeEssay,
      fafsa: completedFafsa && completedFafsa,
      p_recom: recommendations && recommendations,
      paid_fee: paidApplicationFees && paidApplicationFees,
      transcript: submittedTranscript && submittedTranscript,
      profile_quote: tagline && tagline,
    };
    LaddersDataService.saveLaddersData(obj)
      .then((data) => {
        console.log("data from the user", data);
        if (data.data.error === false) {
          setLadderUpdate(true);
          setLoading(false);
        }
        hideUpdateLadder();
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
  };

  const hideUpdateLadder = () => {
    setTimeout(() => {
      setLadderUpdate(false);
    }, 2000);
  };

  return (
    <div className="ladder-main">
      {ladderUpdate === true && (
        <div style={{ padding: "15px", background: "#99ff99" }}>
          <p style={{ color: "#00cc00" }} className="no-margin-bottom">
            Ladder Updated Successfully
          </p>
        </div>
      )}
      <Row>
        <Col lg="12" className="mx-auto">
          <Card className="main-card mb-3 interest-main">
            <CardBody>
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <Row>
                      <Col lg="6">
                        <div className="shadow-box">
                          <label className="chekbox-container">
                            College Enrollment Ladders Checklist
                            <input
                              type="checkbox"
                              value={collegeEnrollMentLaddersList}
                              checked={collegeEnrollMentLaddersList}
                              onChange={() => handleSelectAll()}
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="shadow-box">
                          <label className="chekbox-container">
                            Completed FAFSA
                            <input
                              type="checkbox"
                              checked={completedFafsa}
                              value={completedFafsa}
                              onChange={() =>
                                handleCheckBoxChange("completedFafsa")
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="shadow-box">
                          <label className="chekbox-container">
                            Provided Recommendations
                            <input
                              type="checkbox"
                              checked={recommendations}
                              value={recommendations}
                              onChange={() =>
                                handleCheckBoxChange("recommendations")
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="shadow-box">
                          <label className="chekbox-container">
                            Completed College Essay
                            <input
                              type="checkbox"
                              checked={completedCollegeEssay}
                              value={completedCollegeEssay}
                              onChange={() =>
                                handleCheckBoxChange("completedCollegeEssay")
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="shadow-box">
                          <label className="chekbox-container">
                            Submitted Transcript
                            <input
                              type="checkbox"
                              checked={submittedTranscript}
                              value={submittedTranscript}
                              onChange={() =>
                                handleCheckBoxChange("submittedTranscript")
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="shadow-box">
                          <label className="chekbox-container">
                            Paid Application Fees
                            <input
                              type="checkbox"
                              checked={paidApplicationFees}
                              value={paidApplicationFees}
                              onChange={() =>
                                handleCheckBoxChange("paidApplicationFees")
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </Col>
                    </Row>


                    <Row>
                    <Col lg="6">
                        <div className="d-flex justify-content-end btnWrapper">
                          <div className="btnInner">
                            <CommonButton
                              name='Save'
                              btnClass='primaryBtn w-100 saveListBtn'
                              btnHeight='50px'
                              onClick={saveLadder}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg='6'>&nbsp;</Col>
                    </Row>
                  </>
                )}
              </>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Ladders;
