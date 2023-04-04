import React, { Component } from "react";
import { Spinner } from "reactstrap";
import "./CustomSpinner.css";

/**
 * @description CustomSpinner is use for display spinner loader in button
 */
class CustomSpinner extends Component {
  render() {
    return (
      <div className="spinner-middle-con" style={{ display: "inline" }}>
        <Spinner animation="border" size="sm" />
      </div>
    );
  }
}

export default CustomSpinner;
