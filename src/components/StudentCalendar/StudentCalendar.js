import { useState } from "react";
import { Fragment } from "react";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarService from "../../services/CalendarService";
import { useEffect } from "react";
import StringUtil from "../../utils/StringParser";
import parse from "html-react-parser";
import "./StudentCalendar.scss";

const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
  console.log("toolbar: ", toolbar);
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span className="date-main">
        <b>{date.format("MMMM")}</b>
        &nbsp;
        <span>{date.format("YYYY")}</span>
      </span>
    );
  };

  const handleViewChange = (event) => {
    toolbar.onView(event.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-start mb-4">
        <div className="rbc-btn-group">
          {/* <button type="button" onClick={goToToday}>
          today
        </button> */}
          <button type="button" className="arrow mr-2" onClick={goToBack}>
            &#60;
          </button>
          <button type="button" className="arrow" onClick={goToNext}>
            &#62;
          </button>
        </div>
        <label style={{ padding: "0 10px" }}>{label()}</label>
        <div className="rbc-toolbar-view" style={{ marginLeft: "auto" }}>
          <select
            value={toolbar.view}
            onChange={handleViewChange}
            className="form-control select"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="agenda">Agenda</option>
          </select>
        </div>
      </div>
    </>
  );
};

function StudentCalendar() {
  const [events, setEvents] = useState([]);
  const [calendarView, setCalendarView] = useState(Views.MONTH);
  const [calendarDetails, setCalendarDetails] = useState([]);
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const onSelectEvent = () => {
    console.log("clicked from the select event", calendarView);
    setCalendarView(Views.DAY);
  };

  useEffect(() => {
    getCalendarDetails();
  }, []);

  const getCalendarDetails = () => {
    CalendarService.getCalendarEventDetails()
      .then((data) => {
        console.log("data: ", data);
        setCalendarDetails(data.data.objects);
      })
      .catch((error) => {
        console.error("error from the service", error);
      });
  };

  useEffect(() => {
    let array = [];
    console.log("calendarDetails: ", calendarDetails);
    calendarDetails?.map((item, index) => {
      console.log("item.nstart_time: ", item.nstart_time);
      let obj = {};
      let convertedStartTime = moment.tz(item.nstart_time, timeZone);
      console.log("convertedStartTime: ", convertedStartTime);
      let convertedEndTime = moment.tz(item.nend_time, timeZone);
      let parseString = StringUtil.parseHyperlinks(item.msg_content);
      let year = new Date(convertedStartTime._d).getFullYear();
      let month = new Date(convertedStartTime._d).getMonth();
      let day = new Date(convertedStartTime._d).getDate();
      let hr = new Date(convertedStartTime._d).getHours();
      let mm = new Date(convertedStartTime._d).getMinutes();
      let ss = new Date(convertedStartTime._d).getSeconds();
      let endyear = new Date(convertedEndTime._d).getFullYear();
      let endmonth = new Date(convertedEndTime._d).getMonth();
      let endday = new Date(convertedEndTime._d).getDate();
      let endhr = new Date(convertedEndTime._d).getHours();
      let endmm = new Date(convertedEndTime._d).getMinutes();
      let endss = new Date(convertedEndTime._d).getSeconds();
      // let obj={};
      obj.title = parse(parseString);
      obj.start = new Date(year, month, day, hr, mm, ss);
      obj.end = new Date(endyear, endmonth, endday, endhr, endmm, endss);
      array.push(obj);
    });
    console.log("array: ====", array);
    setEvents(array);
  }, [calendarDetails]);

  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />

        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="calender-main">
              <Calendar
                style={{ height: "100vh", backgroundColor: "#fff" }}
                localizer={localizer}
                onSelectEvent={(event) => onSelectEvent(event)}
                events={events}
                components={{
                  toolbar: CustomToolbar,
                }}
                // defaultView="month"
                step={12}
                timeslots={5}
                view={calendarView}
                onView={setCalendarView}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default StudentCalendar;
