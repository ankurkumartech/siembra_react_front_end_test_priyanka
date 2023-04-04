import React, { useState, Fragment } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import CommonButton from "../CommonButton/CommonButton";
import "./SendMessageModal.scss";

function SendMessageModal({ open, closeHandler, modalTitle }) {
  console.log("modalTitle: ", modalTitle);
  const [selectedCounselor, setSelectedCounselor] = useState();

  const [textAreaMessage, setTextAreaMessage] = useState();
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={closeHandler}
        centered
        className="modal-box mesage-modal"
      >
        <ModalHeader>
          {modalTitle == "msg" ? "New Message" : "Request To Change Goal"}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="10" className="mx-auto">
              <FormGroup>
                <select
                  className="form-control form-group-select select"
                  value={selectedCounselor}
                  onChange={(e) => setSelectedCounselor(e.target.value)}
                >
                  <option className="select-option" disabled hidden selected>
                    Choose Counselor
                  </option>
                  <option className="select-option" value="1">
                    1
                  </option>
                  <option className="select-option" value="12">
                    12
                  </option>
                  <option className="select-option" value="123">
                    123
                  </option>
                  {/* {23
                            us3er && user.counselor_name && user.counselor_name.map((item, index) =>(
                                <option className="select-option" key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }  */}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="10" className="mx-auto">
              <textarea
                className="form-control form-group-select"
                rows={3}
                cols={50}
                placeholder="Type a message..."
                onChange={(e) => setTextAreaMessage(e.target.value)}
                value={textAreaMessage}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="10" className="mx-auto text-center">
              <CommonButton
                name={modalTitle === "msg" ? "Send Message" : "Change Goal Request"}
                type='submit'
                btnClass='primaryBtn modalBtn mt-4 mb-3'
                btnWidth='320px'
                btnHeight='50px'
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default SendMessageModal;
