import React, { Suspense, Fragment } from "react";
import Loading from "../components/Loading/Loading";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import Login from "../Pages/Login/Login";

const suspenseRoutesArr = [
  {
    path: "/login",
    component: Login,
  },
  // {
  //   path: "/forgot-password",
  //   component: ForgotPassword
  // },
  // {
  //   path: "/reset-password",
  //   component: ResetPassword
  // },
];

const PublicRoutes = () => {
  console.log("PublicRoutes: ");
  return (
    <Fragment>
      {suspenseRoutesArr.map((route, i) => (
        <Suspense fallback={<Loading />} key={i}>
          <PublicRoute path={route.path} component={route.component} />
        </Suspense>
      ))}
    </Fragment>
  );
};

export default PublicRoutes;
