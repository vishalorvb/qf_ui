import { Suspense } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import { Routes } from "./Routes";

const role = "";

const routeLister = (rawList) => {
  const routeList = rawList
    .filter((routeItem) => routeItem.accessRole.includes(role))
    .map((routeItem, idx) => {
      return routeItem.subRoute === undefined ? (
        <Route
          key={idx}
          path={routeItem.path}
          element={
            <Suspense fallback={<>...</>}>
              <routeItem.element />
            </Suspense>
          }
        ></Route>
      ) : (
        <Route key={idx} path={routeItem.path}>
          <Route
            index
            element={
              <Suspense fallback={<>...</>}>
                <routeItem.element />
              </Suspense>
            }
          ></Route>
          {routeItem.subRoute && routeLister(routeItem.subRoute)}
        </Route>
      );
    });
  return routeList;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      {routeLister(Routes)}
    </Route>
  )
);
