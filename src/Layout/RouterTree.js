import { Suspense } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import RequireAuth from "./RequireAuth";
import { Routes } from "./Routes";
import PersistLogin from "./PersistLogin";
import Login from "./Login";
import UnAuthorized from "../pages/UnAuthorized";
import Dashboard from "../pages/Dashboard";
import Skeleton from "./Skeleton";

const routeLister = (rawList) => {
  const routeList = rawList.map((routeItem, idx) => {
    return (
      <Route
        key={idx + routeItem.path}
        element={<RequireAuth allowedRoles={routeItem.accessRole} />}
      >
        {routeItem.subRoute === undefined ? (
          <Route
            key={idx}
            path={routeItem.path}
            element={
              <Suspense fallback={<Skeleton />}>
                <routeItem.element />
              </Suspense>
            }
          ></Route>
        ) : (
          <Route key={idx} path={routeItem.path}>
            <Route
              index
              element={
                <Suspense fallback={<Skeleton />}>
                  <routeItem.element />
                </Suspense>
              }
            ></Route>
            {routeItem.subRoute && routeLister(routeItem.subRoute)}
          </Route>
        )}
      </Route>
    );
  });
  return routeList;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistLogin />}>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path="/" element={<AppLayout />}>
          <Route element={<RequireAuth allowedRoles={[1, 2, 4]} />}>
            <Route index element={<Dashboard />} />
          </Route>
          {routeLister(Routes)}
        </Route>
      </Route>
    </>
  )
);
