import { useEffect } from "react";
import { useState } from "react";
import calenderIcon from "../../../assets/utils/images/calender.png";
import Storage from "../../../services/Storage";
import SendNewMsgBtn_Default from "../../../assets/utils/images/SendNewMsgBtn_Default.svg";
import Placeholder from "../../../assets/utils/images/placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function MessageList({ openClickedContact, count, readCountData }) {
  const [list, setList] = useState();
  console.log("list: ", list);
  const user = Storage.getStudentDetail();
  console.log("user: ==", user);

  const createContactList = async () => {
    let list = [];
    list = [
      ...user.school_admin,
      ...user.school_it,
      ...user.recruiter,
      ...user.counselor_name,
    ];
    setList(list);
  };

  useEffect(() => {
    createContactList();
  }, []);

  const getCountData = (item) => {
    console.log("count from the data", count, item);
    let message = Object.keys(count ? count : {}).map((key, value) => {
      console.log("key from the count", key, item.id);
      return count[key][item.id];
    });
    console.log("message from the count data", message);
    let data = message && message.filter((item, index) => item !== undefined);
    console.log("data from the messgae", data);
    if (data[0] === 0 || data[0] === undefined || data[0] === null) {
      return '';
    } else {
      return (
        <div className="message-notification">{`${data}`}</div>
      );
    }
  };

  return (
    <>
      <div className="sidebar-header">
        <span className="title">Message</span>
        <div class="contactSearchWrap">
          <FontAwesomeIcon icon={faSearch} className='searchContactIcon' />
          <input type="text" className="form-control search-input contactSearch" placeholder="Search contact and messages" />
        </div>
      </div>
      <div className="list-wrap">
        <p className='messageCount'>
          You have{" "}
          <span className="countText">
            {count ? count.total_notification : 0} new message
          </span>
        </p>
        {list && list.length > 0
          ? list.map((item, index) => {
            return (
              <>
                <div
                  className="list"
                  key={index}
                  onClick={() => openClickedContact(item)}
                >
                  <img
                    className="profile-img"
                    src={item?.profile_image || Placeholder}
                    alt=""
                  />
                  <div className="info">
                    <span className="user">{item.name}</span>
                    <span className="text">{item.role}</span>
                  </div>
                  <div>
                    {/* <div className="count">09:10 PM</div> */}
                    <div className="time">
                      {getCountData(item)}
                      {/* <img src={calenderIcon} alt="img" /> */}
                    </div>
                  </div>
                </div>
              </>
            );
          })
          : "No Data Found"}
      </div>
    </>
  );
}

export default MessageList;
