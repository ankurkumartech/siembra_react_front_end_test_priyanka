import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import {
  MainNav,
  ComponentsNav,
  FormsNav,
  WidgetsNav,
  ChartsNav,
} from "./NavItems";
import { useState } from "react";

// class Nav extends Component {
//   state = {};

//   render() {
//     return (
//       <Fragment>
//         <MetisMenu
//           content={MainNav}
//           activeLinkFromLocation
//           className="vertical-nav-menu"
//           iconNamePrefix=""
//           classNameStateIcon="pe-7s-angle-down"
//           onSelected={e => onMenuSelected(e)}
//         />
//         <h5 className="app-sidebar__heading">UI Components</h5>
//         <MetisMenu
//           content={ComponentsNav}
//           activeLinkFromLocation
//           className="vertical-nav-menu"
//           iconNamePrefix=""
//           classNameStateIcon="pe-7s-angle-down"
//         />
//         <h5 className="app-sidebar__heading">Dashboard Widgets</h5>
//         <MetisMenu
//           content={WidgetsNav}
//           activeLinkFromLocation
//           className="vertical-nav-menu"
//           iconNamePrefix=""
//           classNameStateIcon="pe-7s-angle-down"
//         />
//         <h5 className="app-sidebar__heading">Forms</h5>
//         <MetisMenu
//           content={FormsNav}
//           activeLinkFromLocation
//           className="vertical-nav-menu"
//           iconNamePrefix=""
//           classNameStateIcon="pe-7s-angle-down"
//         />
//         <h5 className="app-sidebar__heading">Charts</h5>
//         <MetisMenu
//           content={ChartsNav}
//           activeLinkFromLocation
//           className="vertical-nav-menu"
//           iconNamePrefix=""
//           classNameStateIcon="pe-7s-angle-down"
//         />
//       </Fragment>
//     );
//   }

//   isPathActive(path) {
//     return this.props.location.pathname.startsWith(path);
//   }
// }

export default function Nav() {
  const [selected, setSelected] = useState("");

  const onMenuSelected = (data) => {
    console.log("data: ", data);
    console.log("data: ", data.target.value);
    const item = data.currentTarget;
    setSelected(item.name);
    console.log("data: ", data.currentTarget.name);
    /* istanbul ignore next */
  };
  return (
    <Fragment>
      <MetisMenu
        content={MainNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        activeLinkTo={selected}
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
        onSelected={(e) => onMenuSelected(e)}
      />
      {/* <h5 className="app-sidebar__heading">UI Components</h5>
      <MetisMenu
        content={ComponentsNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">Dashboard Widgets</h5>
      <MetisMenu
        content={WidgetsNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">Forms</h5>
      <MetisMenu
        content={FormsNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">Charts</h5>
      <MetisMenu
        content={ChartsNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      /> */}
    </Fragment>
  );
}
