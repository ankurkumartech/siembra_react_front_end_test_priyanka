import React, { Fragment } from "react";

import Ionicon from "react-ionicons";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  Button,
  NavItem,
} from "reactstrap";

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import Tabs from "react-responsive-tabs";

// Dropdown Tabs Content
import ChatExample from "./TabsContent/ChatExample";
import TimelineEx from "./TabsContent/TimelineExample";
import SysErrEx from "./TabsContent/SystemExample";

const tabsContent = [
  {
    title: "Messages",
    content: <ChatExample />,
  },
  {
    title: "Events",
    content: <TimelineEx />,
  },
  {
    title: "System Errors",
    content: <SysErrEx />,
  },
];

function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
}

class HeaderDots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="header-dots">
          <UncontrolledDropdown>
            <DropdownToggle className="p-0 mr-2" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-danger" />
                <Ionicon
                  beat={true}
                  color="#d92550"
                  fontSize="23px"
                  icon="md-notifications-outline"
                />
                <div className="badge badge-dot badge-dot-sm badge-danger">
                  Notifications
                </div>
              </div>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-xl rm-pointers">
              <div className="dropdown-menu-header mb-0">
                <div className="dropdown-menu-header-inner bg-deep-blue">
                  <div
                    className="menu-header-image opacity-1"
                    style={{
                      backgroundImage: "url(" + city3 + ")",
                    }}
                  />
                  <div className="menu-header-content text-dark">
                    <h5 className="menu-header-title">Notifications</h5>
                    <h6 className="menu-header-subtitle">
                      You have <b>21</b> unread messages
                    </h6>
                  </div>
                </div>
              </div>
              <Tabs
                tabsWrapperClass="body-tabs body-tabs-alt"
                transform={false}
                showInkBar={true}
                items={getTabs()}
              />
              <Nav vertical>
                <NavItem className="nav-item-divider" />
                <NavItem className="nav-item-btn text-center">
                  <Button
                    size="sm"
                    className="btn-shadow btn-wide btn-pill"
                    color="focus"
                  >
                    View Latest Changes
                  </Button>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Fragment>
    );
  }
}

export default HeaderDots;
