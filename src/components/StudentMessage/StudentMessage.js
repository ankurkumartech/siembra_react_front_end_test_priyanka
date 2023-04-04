import { Fragment } from "react";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import "./StudentMessage.scss";
import sendIcon from "../../assets/utils/images/send-icon.png";
import gifIcon from '../../assets/utils/images/gifIcon.png';
import emojiIcon from '../../assets/utils/images/emojiIcon.png';
import pinIcon from '../../assets/utils/images/pinIcon.png';
import Placeholder from "../../assets/utils/images/placeholder.jpg";
import MessageList from "./MessageList/MessageList";
import { useEffect } from "react";
import Storage from "../../services/Storage";
import MsgDataService from "../../services/MsgService";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";

function StudentMessage() {
  const parsedUser = Storage.getStudentDetail();
  const [countData, setCountData] = useState();

  useEffect(() => {
    getUnreadCount();
  }, []);

  const getUnreadCount = () => {
    let obj = {
      school: parsedUser?.school_id,
      user: parsedUser?.id,
    };
    MsgDataService.getUnreadCountForStudent(obj)
      .then((data) => {
        console.log("data from the service", data.data);
        setCountData(data.data);
      })
      .catch((error) => {
        console.log("error from the service", error);
      });
  };

  const openClickedContact = (item) => {
    console.log("item:==================== ", item);
    // setSelectedContact(item);
    // setOpenSingleMessageConversation(true)
  };
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />

        <div className="app-main__outer" style={{ paddingBottom: "0" }}>
          <div className="app-main__inner" style={{ padding: "24px 9px 0 9px" }}>
            <div className="msg-main">
              <Container fluid>
                <div className="msgWrapper">
                  <Row>
                    <Col lg={4} md={6}>
                      <sidebar>
                        <MessageList
                          count={countData}
                          openClickedContact={(item) => openClickedContact(item)}
                        />
                      </sidebar>
                    </Col>
                    <Col lg={8} md={6}>
                      <div className="content">
                        <header>
                          <img src={Placeholder} alt="" />
                          <div className="info d-flex flex-column">
                            <span className="user">Jane Cooper</span>
                            {/* <span className="status">Online</span> */}
                          </div>
                          <div className="open">
                            <a href="javascript:;">UP</a>
                          </div>
                        </header>
                        <div className="message-wrap">
                          <div className="message-list">
                            <div className="msg">
                              <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing
                                elit. Odit minus minima quo corporis.
                              </p>
                            </div>
                            <div className="time">09:10 PM</div>
                          </div>
                          <div className="message-list me">
                            <div className="msg">
                              <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list">
                            <div className="msg">
                              <p>Odit minus minima quo corporis.</p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list me">
                            <div className="msg">
                              <p>Lorem.</p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list">
                            <div className="msg">
                              <p>Lorem, ipsum dolor.</p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list me">
                            <div className="msg">
                              <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Ad numquam laudantium illum quidem? Iste hic
                                doloribus quos non iure libero excepturi, praesentium
                                in, blanditiis repellat labore illo, voluptas sed
                                fugit consequatur dolorum assumenda ea nesciunt.
                                Pariatur.
                              </p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list">
                            <div className="msg">
                              <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing
                                elit. Odit minus minima quo corporis.
                              </p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list me">
                            <div className="msg">
                              <p>Lorem, ipsum.</p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list">
                            <div className="msg">
                              <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing
                                elit. Maxime, nulla doloribus dolore impedit dolorem
                                hic ex dolor quo illo tenetur ab exercitationem atque
                                iusto, voluptatibus quos.
                              </p>
                            </div>
                            <div className="time">now</div>
                          </div>
                          <div className="message-list me">
                            <div className="msg">
                              <p>Lorem dolor sit.</p>
                            </div>
                            <div className="time">now</div>
                          </div>
                        </div>
                        <div className="messageFooterWrapper">
                          <div className="leftMessageFooter">
                            {/* <img src={gifIcon} alt='gifIcon' className="gifIcon" /> */}
                            <input
                            className="messageInput mr-1"
                              type="text"
                              placeholder="Type your message here..."
                            />
                          </div>
                          <div className="rightMessageFooter">
                            {/* <img src={pinIcon} alt='pinIcon' className="pinIcon" /> */}
                            {/* <img src={emojiIcon} alt='emojiIcon' className="emojiIcon" /> */}
                            <img src={sendIcon} alt="img" className="send-icon" />
                          </div>
                        </div>
                        <div className="message-footer">


                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* <div className="msg-container">
                <sidebar>
                  <MessageList
                    count={countData}
                    openClickedContact={(item) => openClickedContact(item)}
                  />
                </sidebar>
                <div className="content">
                  <header>
                    <img src="" alt="" />
                    <div className="info">
                      <span className="user">Jane Cooper</span>
                      <span className="status">Online</span>
                    </div>
                    <div className="open">
                      <a href="javascript:;">UP</a>
                    </div>
                  </header>
                  <div className="message-wrap">
                    <div className="message-list">
                      <div className="msg">
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Odit minus minima quo corporis.
                        </p>
                      </div>
                      <div className="time">09:10 PM</div>
                    </div>
                    <div className="message-list me">
                      <div className="msg">
                        <p>Lorem ipsum dolor sit amet.</p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list">
                      <div className="msg">
                        <p>Odit minus minima quo corporis.</p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list me">
                      <div className="msg">
                        <p>Lorem.</p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list">
                      <div className="msg">
                        <p>Lorem, ipsum dolor.</p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list me">
                      <div className="msg">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ad numquam laudantium illum quidem? Iste hic
                          doloribus quos non iure libero excepturi, praesentium
                          in, blanditiis repellat labore illo, voluptas sed
                          fugit consequatur dolorum assumenda ea nesciunt.
                          Pariatur.
                        </p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list">
                      <div className="msg">
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Odit minus minima quo corporis.
                        </p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list me">
                      <div className="msg">
                        <p>Lorem, ipsum.</p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list">
                      <div className="msg">
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Maxime, nulla doloribus dolore impedit dolorem
                          hic ex dolor quo illo tenetur ab exercitationem atque
                          iusto, voluptatibus quos.
                        </p>
                      </div>
                      <div className="time">now</div>
                    </div>
                    <div className="message-list me">
                      <div className="msg">
                        <p>Lorem dolor sit.</p>
                      </div>
                      <div className="time">now</div>
                    </div>
                  </div>
                  <div className="message-footer">
                    <input
                      type="text"
                      placeholder="Type your message here..."
                    />
                    <img src={sendIcon} alt="img" className="send-icon" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default StudentMessage;
