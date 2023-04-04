import React, { Component, Fragment } from "react";
import { HashRouter as Router } from "react-router-dom";
import cx from "classnames";
import { connect } from "react-redux";
// import AppMain from "./Layout/AppMain";
import Routes from "./Routes";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userDetail: Storage.getUserDetail(),
    };
  }
  // setCookie(userId) {
  //   cookie.save('userId', userId, { path: '/' })
  // }

  render() {
    const {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
    } = this.props;
    return (
      <>
        <Fragment>
          <Router>
            <div
              className={cx(
                `app-container app-theme-${colorScheme}`,
                { "fixed-header": enableFixedHeader },
                { "fixed-sidebar": enableFixedSidebar },
                { "fixed-footer": enableFixedFooter },
                // { "closed-sidebar": enableClosedSidebar },
                { "closed-sidebar": false },
                {
                  "closed-sidebar-mobile": closedSmallerSidebar,
                },
                { "sidebar-mobile-open": enableMobileMenu },
                { "body-tabs-shadow-btn": enablePageTabsAlt }
              )}
            >
              {/* <AppMain /> */}
              <Routes />
            </div>
          </Router>
        </Fragment>
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default connect(mapStateToProp)(App);
