import React, { Suspense, lazy, Fragment } from "react";
import Loading from "../components/Loading/Loading";

import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

// import Storage from "../services/Storage";

// need to remove

const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const Parents = lazy(() => import("../Pages/Parents/Parents"));
const Goals = lazy(() => import("../Pages/Goals/Goals"));
const Portfolio = lazy(() => import("../Pages/Portfolio/Portfolio"));
const MyPassion = lazy(() => import("../Pages/MyPassion/MyPassion"));
const StudentChecklist = lazy(() =>
  import("../Pages/StudentChecklist/StudentChecklist")
);
const StudentCalendar = lazy(() =>
  import("../components/StudentCalendar/StudentCalendar")
);
const StudentProfile = lazy(() =>
  import("../components/StudentProfile/StudentProfile")
);

const StudentMessage = lazy(() =>
  import("../components/StudentMessage/StudentMessage")
);

const StudentGoal = lazy(() => import("../components/StudentGoal/StudentGoal"));

const suspenseRoutesArr = [
  {
    path: "/dashboard",
    component: Dashboard,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/goal/cc-requirement",
    component: Goals,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/goal/csu-requirement",
    component: Goals,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/goal/uc-requirement",
    component: Goals,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/interest",
    component: MyPassion,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/portfolio",
    component: Portfolio,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/profile",
    component: StudentProfile,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/calendar",
    component: StudentCalendar,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/message",
    component: StudentMessage,
    header: true,
    sidebar: true,
  },
  {
    path: "/student/ladder",
    component: StudentChecklist,
    header: true,
    sidebar: true,
  },
  {
    path: "/parent",
    component: Parents,
    header: true,
    sidebar: true,
  },
];

const PrivateRoutes = () => {
  console.log("PrivateRoutes: ");

  return (
    <Fragment>
      <>
        {suspenseRoutesArr.map((route, i) => (
          <Suspense fallback={<Loading />} key={i}>
            <PrivateRoute
              path={route.path}
              component={route.component}
              // header={route.header}
              // sidebar={route.sidebar}
            />
          </Suspense>
        ))}
      </>
    </Fragment>
  );
};

export default PrivateRoutes;

// const mapStateToProps = (state) => ({
//   auth: state.Auth.auth,
// });

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PrivateRoutes);
