import { useState } from "react";
import { useEffect } from "react";
import { Card, Row, Col, CardBody, Button } from "reactstrap";
import PortFolioService from "../../services/PortfolioService";
import Storage from "../../services/Storage";
import Loading from "../Loading/Loading";
import "./Interest.scss";
import Switch from "react-switch";
import CommonButton from "../CommonButton/CommonButton";

function Interest() {
  const [configData, setConfigData] = useState();
  const [user, setUser] = useState(Storage.getStudentDetail());
  const [interestData, setInterestData] = useState();
  const [showInterestData, setShowInterestData] = useState();
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [language, setLanguage] = useState(false);
  const [translatedData, setTranslatedData] = useState();

  console.log("user: ", user);

  useEffect(() => {
    getConfigureList();
    getInterest();
  }, []);

  const getConfigureList = () => {
    setLoading(true);
    PortFolioService.getConfigureList()
      .then((data) => {
        console.log("data from the configure list", data);
        setConfigData(data.data.objects);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error from the service", error);
        setLoading(false);
      });
  };

  const getInterest = () => {
    let obj = {
      student_id: user && user.id,
    };
    PortFolioService.getInterest(obj)
      .then((data) => {
        console.log("data from the interest", data);
        setInterestData(data.data.interests);
      })
      .catch((error) => {
        console.error("error from the service", error);
      });
  };

  useEffect(() => {
    let configure =
      configData &&
      configData.filter((item, index) => {
        return item.list_name === "intrest";
      });
    setShowInterestData(configure);
  }, [configData]);

  const handleInterestInputChange = (item) => {
    if (
      interestData &&
      interestData.some((interest) => interest.config_id === item.id)
    ) {
      let filteredValue = interestData.filter(
        (interest) => interest.config_id !== item.id
      );
      setInterestData(filteredValue);
    } else {
      setInterestData([...interestData, item]);
    }
  };

  const handleInterestSubmit = () => {
    let arrayId = [];
    let arrayName = [];
    interestData &&
      interestData.map((item) => {
        arrayId.push(item.config_id ? item.config_id : item.id);
        arrayName.push(item.name || item.activities_name);
      });
    let obj = {
      student_id: user && user.id,
      interest: arrayName && arrayName,
      id: arrayId,
    };
    setLoading(true);
    PortFolioService.saveInterest(obj)
      .then((data) => {
        console.log("data from the service=====================", data);
        if (data.status === 200) {
          // getInterest();
          setShowStatus(true);
          hideStatus();
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("error from the service", error);
      });
  };

  const hideStatus = () => {
    setTimeout(() => {
      setShowStatus(false);
    }, 2000);
  };

  const handleLanguage = (checked) => {
    setLanguage(checked);
  };

  useEffect(() => {
    getTranslatedValue();
  }, [language]);

  useEffect(() => {
    showInterestData?.map((item, index) => {
      item.name = translatedData?.list_of_results[index];
    });
  }, [translatedData]);

  const getTranslatedValue = () => {
    let obj = {};
    obj.list_of_values =
      showInterestData && showInterestData.map((item, index) => item.name);
    obj.to = language === true ? "es" : "en";
    setLoading(true);
    PortFolioService.translateTemplate(obj)
      .then((data) => {
        console.log("data from the translatedValue", data);
        setTranslatedData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
    //console.log("getting called from useEffect")
  };
  return (
    <>
      {showStatus === true && (
        <div
          style={{
            background: "rgb(60,118,61, 0.5)",
            padding: "10px",
            color: "#3c763d",
          }}
        >
          <p className="no-margin-bottom">{`Interest Saved`}</p>
        </div>
      )}

      <Row>
        <Col lg="12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title-main">My Passion</h1>
            <Switch
              onChange={handleLanguage}
              checked={language}
              width={52}
              height={24}
              handleDiameter={18}
              onColor={'#28131A'}
              offColor={'#049804'}
              uncheckedIcon={<div className="switchIncon uncheckIcon">EN</div>}
              checkedIcon={<div className="switchIncon checkIcon">ES</div>}
              className="langSwitch"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="12" className="mx-auto">
          <Card className="main-card mb-3 interest-main">
            <CardBody>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Row>
                    {showInterestData &&
                      showInterestData.map((item, index) => {
                        return (
                          <Col lg="6">
                            <div className="shadow-box">
                              <label className="chekbox-container">
                                {item.name}
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    handleInterestInputChange(item)
                                  }
                                  checked={
                                    interestData &&
                                    interestData.find((interest) => {
                                      console.log(
                                        "interest.config_id === item.id: ",
                                        interest.config_id === item.id
                                      );

                                      return interest.config_id === item.id;
                                    })
                                  }
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </Col>
                        );
                      })}
                  </Row>
                  <Row>
                    <Col lg='6'>&nbsp;</Col>
                    <Col lg="6">
                      <div className="d-flex justify-content-end btnWrapper">
                      <div className="btnInner">
                          <CommonButton
                            name='Cancel'
                            btnClass='primaryBtn w-100 passionBtn'
                          />
                        </div>
                        <div className="btnInner">
                          <CommonButton
                            name='Save'
                            btnClass='primaryBtn w-100 passionBtn'
                            onClick={handleInterestSubmit}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Interest;
