import Switch from "react-switch";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import "./AthleticsAndActivities.scss";
import { useEffect } from "react";
import Storage from "../../services/Storage";
import PortFolioService from "../../services/PortfolioService";
import Loading from "../Loading/Loading";
import MessageTemplateService from "../../services/MessageTemplateService";
import CommonButton from "../CommonButton/CommonButton";

function AthleticsAndActivities() {
  const [activeTab, setActiveTab] = useState("1");
  const [user, setUser] = useState(Storage.getStudentDetail());
  const [selectedAcademics, setSelectedAcademics] = useState();
  const [selectedActivities, setSelectedActivities] = useState();
  const [selectedAthletics, setSelectedAthletics] = useState();
  const [configureListData, setConfigureListData] = useState();
  const [academicsData, setAcademicsData] = useState();
  const [activitiesData, setActivitiesData] = useState();
  const [athleticsData, setAthleticsData] = useState();
  const [language, setLanguage] = useState(false);
  const [
    translatedDataForActivities,
    setTranslatedDataForActivities,
  ] = useState();
  const [
    translatedDataForAcademics,
    setTranslatedDataForAcademics,
  ] = useState();
  const [
    translatedDataForAthletics,
    setTranslatedDataForAthletics,
  ] = useState();
  const [showStatus, setShowStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLanguage = (checked) => {
    setLanguage(checked);
    getTranslatedValueForActivities(checked);
    getTranslatedValueForAcademics(checked);
    getTranslatedValueForAthletics(checked);
  };

  const handleToggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (user) {
      getConfigureList();
    }
  }, [user]);

  useEffect(() => {
    let configure =
      configureListData &&
      configureListData.filter((item, index) => {
        return item.list_name === "academics";
      });
    setAcademicsData(configure);
  }, [configureListData]);

  useEffect(() => {
    let configure =
      configureListData &&
      configureListData.filter((item, index) => {
        return item.list_name === "activities";
      });
    setActivitiesData(configure);
  }, [configureListData]);

  useEffect(() => {
    let configure =
      configureListData &&
      configureListData.filter((item, index) => {
        return item.list_name === "athletics";
      });
    setAthleticsData(configure);
  }, [configureListData]);

  const getAcademics = () => {
    let obj = {
      student_id: user && user.id,
    };
    setLoading(true);
    PortFolioService.getAcademics(obj)
      .then((data) => {
        setSelectedAcademics(data.data.academic);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("error from the service", error);
      });
  };

  const getActivities = () => {
    let obj = {
      student_id: user && user.id,
    };
    setLoading(true);
    PortFolioService.getActivities(obj)
      .then((data) => {
        console.log("data from the Activities service", data.data.activities);
        setSelectedActivities(data.data.activities);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error from the service", error);
        setLoading(false);
      });
  };

  const getAthletics = () => {
    let obj = {
      student_id: user && user.id,
    };
    setLoading(true);
    PortFolioService.getAthletics(obj)
      .then((data) => {
        setSelectedAthletics(data.data.athletics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error from the service", error);
        setLoading(false);
      });
  };

  const getConfigureList = () => {
    setLoading(true);
    PortFolioService.getConfigureList()
      .then((data) => {
        setConfigureListData(data.data.objects);
        getAcademics();
        getActivities();
        getAthletics();
      })
      .catch((error) => {
        setLoading(false);

        console.log("error from the service", error);
      });
  };

  const handleAcademicInputChange = (item) => {
    if (
      selectedAcademics &&
      selectedAcademics.some((academic) => academic.config_id === item.id)
    ) {
      let filteredValue = selectedAcademics.filter(
        (academic) => academic.config_id !== item.id
      );
      setSelectedAcademics(filteredValue);
    } else {
      setSelectedAcademics([...selectedAcademics, item]);
    }
  };

  const handleActivityInputChange = (item) => {
    if (
      selectedActivities &&
      selectedActivities.some((activity) => activity.config_id === item.id)
    ) {
      let filteredValue = selectedActivities.filter(
        (activity) => activity.config_id !== item.id
      );
      setSelectedActivities(filteredValue);
    } else {
      setSelectedActivities([...selectedActivities, item]);
    }
  };

  const handleAthleticsInputChange = (item) => {
    if (
      selectedAthletics &&
      selectedAthletics.some((athletic) => athletic.config_id === item.id)
    ) {
      let filteredValue = selectedAthletics.filter(
        (athletic) => athletic.config_id !== item.id
      );
      setSelectedAthletics(filteredValue);
    } else {
      setSelectedAthletics([...selectedAthletics, item]);
    }
  };

  // useEffect(() => {
  //   getTranslatedValueForActivities();
  //   getTranslatedValueForAcademics();
  //   getTranslatedValueForAthletics();
  // }, [language]);

  useEffect(() => {
    let array = [];
    activitiesData?.map((item, index) => {
      let convertedname = {};
      convertedname.name = translatedDataForActivities?.[index];
      let convertedData = { ...item, ...convertedname };
      array.push(convertedData);
    });
    setActivitiesData(array);
  }, [translatedDataForActivities]);

  useEffect(() => {
    let array = [];
    athleticsData?.map((item, index) => {
      let convertedname = {};
      convertedname.name = translatedDataForAthletics?.[index];
      let convertedData = { ...item, ...convertedname };
      array.push(convertedData);
    });
    setAthleticsData(array);
  }, [translatedDataForAthletics]);

  useEffect(() => {
    let array = [];
    academicsData?.map((item, index) => {
      let convertedname = {};
      convertedname.name = translatedDataForAcademics?.[index];
      let convertedData = { ...item, ...convertedname };
      array.push(convertedData);
    });
    setAcademicsData(array);
  }, [translatedDataForAcademics]);

  const getTranslatedValueForActivities = (checked) => {
    let obj = {};
    obj.list_of_values =
      activitiesData && activitiesData.map((item, index) => item.name);
    obj.to = checked === true ? "es" : "en";
    setLoading(true);
    MessageTemplateService.translateTemplate(obj)
      .then((data) => {
        console.log("data from the translatedValue", data);
        setTranslatedDataForActivities(data.data.list_of_results);
        activitiesData?.map((item, index) => {
          item.name = data.data.list_of_results?.[index];
        });
        setActivitiesData(activitiesData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
  };

  const getTranslatedValueForAthletics = (checked) => {
    let obj = {};
    obj.list_of_values =
      athleticsData && athleticsData.map((item, index) => item.name);
    obj.to = checked === true ? "es" : "en";
    setLoading(true);
    MessageTemplateService.translateTemplate(obj)
      .then((data) => {
        console.log("data from the translatedValue", data);
        setTranslatedDataForAthletics(data.data.list_of_results);
        athleticsData?.map((item, index) => {
          item.name = data.data.list_of_results?.[index];
        });
        setAthleticsData(athleticsData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
    //console.log("getting called from useEffect")
  };

  const getTranslatedValueForAcademics = (checked) => {
    let obj = {};
    obj.list_of_values =
      academicsData && academicsData.map((item, index) => item.name);
    obj.to = checked === true ? "es" : "en";
    setLoading(true);
    MessageTemplateService.translateTemplate(obj)
      .then((data) => {
        console.log("data from the translatedValue", data);
        setTranslatedDataForAcademics(data.data.list_of_results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error from the service", error);
      });
    //console.log("getting called from useEffect")
  };

  const handleActivitySubmit = () => {
    let arrayId = [];
    let arrayName = [];
    selectedActivities &&
      selectedActivities.map((item) => {
        arrayId.push(item.config_id ? item.config_id : item.id);
        arrayName.push(item.name || item.activities_name);
      });
    let obj = {
      student_id: user && user.id,
      activity: arrayName && arrayName,
      activity_id: arrayId,
    };
    PortFolioService.saveActivities(obj)
      .then((data) => {
        console.log("data from the service", data);
        if (data.status === 200) {
          setShowStatus(true);
          hideStatus();
        }
      })
      .catch((error) => {
        console.error("error from the service", error);
      });
  };

  const handleAcademicSubmit = () => {
    let arrayId = [];
    let arrayName = [];
    selectedAcademics &&
      selectedAcademics.map((item) => {
        arrayId.push(item.config_id ? item.config_id : item.id);
        arrayName.push(item.name || item.activities_name);
      });
    let obj = {
      student_id: user && user.id,
      academic: arrayName && arrayName,
      academic_id: arrayId,
    };
    PortFolioService.saveAcademics(obj)
      .then((data) => {
        if (data.status === 200) {
          setShowStatus(true);
          hideStatus();
        }
      })
      .catch((error) => {
        console.error("error from the service", error);
      });
  };

  const handleAthleticsSave = () => {
    let arrayId = [];
    let arrayName = [];
    selectedAthletics &&
      selectedAthletics.map((item) => {
        arrayId.push(item.config_id ? item.config_id : item.id);
        arrayName.push(item.name || item.activities_name);
      });
    let obj = {
      student_id: user && user.id,
      athletics: arrayName && arrayName,
      athletics_id: arrayId,
    };
    console.log("reqobj========================: ", obj);
    PortFolioService.saveAthletics(obj)
      .then((data) => {
        if (data.status === 200) {
          setShowStatus(true);
          hideStatus();
        }
      })
      .catch((error) => {
        console.error("error from the service", error);
      });
  };

  const hideStatus = () => {
    setTimeout(() => {
      setShowStatus(false);
    }, 2000);
  };

  return (
    <div className="portfolio-main">
      <Row>
        <Col lg="12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title-main">ACTIVITIES AND ATHLETICS</h1>
            <Switch
              onChange={handleLanguage}
              checked={language}
              width={52}
              height={24}
              handleDiameter={18}
              onColor={'#28131A'}
              offColor={'#049804'}
              uncheckedIcon={<div className="switchIncon uncheckIcon">EN</div>}
              checkedIcon={<div className="switchIncon checkIcon">Spn</div>}
              className="langSwitch"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <div className="d-flex justify-content-center align-items-center mb-3 tabbing">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === "1" ? "active" : null}
                  onClick={() => {
                    handleToggle("1");
                  }}
                >
                  Academics
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "2" ? "active" : null}
                  onClick={() => {
                    handleToggle("2");
                  }}
                >
                  Activities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "3" ? "active" : null}
                  onClick={() => {
                    handleToggle("3");
                  }}
                >
                  Athletics
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
      </Row>
      {showStatus === true && (
        <div
          style={{
            background: "rgb(60,118,61, 0.5)",
            padding: "10px",
            color: "#3c763d",
          }}
        >
          <p className="no-margin-bottom">{`${activeTab === "activities"
            ? "Activities"
            : activeTab === "athletics"
              ? "Athletics"
              : activeTab === "academics"
                ? "Academics"
                : ""
            } Saved`}</p>
        </div>
      )}
      <Row>
        <Col lg="12" className="mx-auto">
          <Card className="main-card mb-3 interest-main">
            <CardBody>
              <TabContent activeTab={activeTab}>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <TabPane tabId="1">
                      <>
                        <Row>
                          {selectedAcademics &&
                            academicsData &&
                            academicsData.map((item, index) => {
                              return (
                                <Col lg="6">
                                  <div className="shadow-box">
                                    <label className="chekbox-container">
                                      {item.name}
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          handleAcademicInputChange(item)
                                        }
                                        checked={
                                          selectedAcademics &&
                                          selectedAcademics.find(
                                            (academic) =>
                                              academic.config_id === item.id
                                          )
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
                                  btnClass='primaryBtn w-100 actBtn'
                                />
                              </div>
                              <div className="btnInner">
                                <CommonButton
                                  name='Save Interest'
                                  btnClass='primaryBtn w-100 actBtn'
                                  onClick={handleAcademicSubmit}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </>
                    </TabPane>
                    <TabPane tabId="2">
                      <>
                        <Row>
                          {selectedActivities &&
                            activitiesData &&
                            activitiesData.map((item, index) => (
                              <Col lg="6">
                                <div className="shadow-box">
                                  <label className="chekbox-container">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        handleActivityInputChange(item)
                                      }
                                      checked={
                                        selectedActivities &&
                                        selectedActivities.find(
                                          (activity) =>
                                            activity.config_id === item.id
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </Col>
                            ))}
                        </Row>
                        <Row>
                          <Col lg='6'>&nbsp;</Col>
                          <Col lg="6">
                            <div className="d-flex justify-content-end btnWrapper">
                              <div className="btnInner">
                                <CommonButton
                                  name='Cancel'
                                  btnClass='primaryBtn w-100 actBtn'
                                />
                              </div>
                              <div className="btnInner">
                              <CommonButton
                                  name='Save Interest'
                                  btnClass='primaryBtn w-100 actBtn'
                                  onClick={handleActivitySubmit}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </>
                    </TabPane>
                    <TabPane tabId="3">
                      <>
                        <Row>
                          {selectedAthletics &&
                            athleticsData &&
                            athleticsData.map((item, index) => (
                              <Col lg="6">
                                <div className="shadow-box">
                                  <label className="chekbox-container">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        handleAthleticsInputChange(item)
                                      }
                                      checked={
                                        selectedAthletics &&
                                        selectedAthletics.find(
                                          (athletic) =>
                                            athletic.config_id === item.id
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </Col>
                            ))}
                        </Row>
                        <Row>
                          <Col lg='6'>&nbsp;</Col>
                          <Col lg="6">
                            <div className="d-flex justify-content-end btnWrapper">
                              <div className="btnInner">
                                <CommonButton
                                  name='Cancel'
                                  btnClass='primaryBtn w-100 actBtn'
                                />
                              </div>
                              <div className="btnInner">
                                <CommonButton
                                  name='Save Interest'
                                  btnClass='primaryBtn w-100 actBtn'
                                  onClick={handleAthleticsSave}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </>
                    </TabPane>
                  </>
                )}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AthleticsAndActivities;
