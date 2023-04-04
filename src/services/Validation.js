export default class Validation {
  // add email validation logic here
  static emailValidator(control) {
    const value = control.value;
    control.nullValue = false;
    control.invalidEmail = false;
    if (value === "") {
      control.nullValue = true;
    }

    let lastAtPos = value.lastIndexOf("@");
    let lastDotPos = value.lastIndexOf(".");
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        value.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        value.length - lastDotPos > 2
      )
    ) {
      control.invalidEmail = true;
    } else {
      control.invalidEmail = false;
    }
    return control;
  }

  static notNullValidator(control) {
    const value = control.value;
    control.nullValue = false;
    if (value === "" || value === null || value === undefined) {
      control.nullValue = true;
    } else {
      control.nullValue = false;
    }
    return control;
  }

  // add password validation logic here
  static passwordValidator(control) {
    //eslint-disable-next-line
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const value = control.value;
    if (value !== null) {
      if (!value.match(regex)) {
        control.invalidPassword = true;
      } else {
        control.invalidPassword = null;
      }
    }
    return control;
  }

  static validateLength(control, length) {
    const value = control.value;
    if (value !== null && value !== "") {
      if (value.length <= length) {
        control.invalidLength = false;
      } else {
        control.invalidLength = true;
      }
    } else if (value === null || value === "") {
      control.invalidLength = null;
    }
    return control;
  }

  static validatePhoneNumber(control) {
    const regex = /^[0-9]*$/;
    const value = control.value;
    if (!(value === null || value === "")) {
      if (value.length !== 10) {
        control.invalidPhone = true;
        return control;
      }
      if (!value.match(regex)) {
        control.invalidPhone = true;
      } else {
        control.invalidPhone = null;
      }
    } else {
      control.invalidPhone = null;
    }
    return control;
  }

  static validateSerialNumber(control) {
    const value = control.value ? control.value : "";
    if (value < 65537 && value > 0) {
      control.invalidSerialNumber = null;
    } else {
      control.invalidSerialNumber = true;
    }
    return control;
  }

  static validateAlphabetic(control) {
    const regex = /^[a-zA-Z ]*$/;
    const value = control.value;
    if (!(value === null || value === "")) {
      const isRegexMatched = value.match(regex) ? true : false;
      if (isRegexMatched) {
        control.invalidAlphabetic = null;
      } else {
        control.invalidAlphabetic = true;
      }
    } else {
      control.invalidAlphabetic = null;
    }

    return control;
  }
}
