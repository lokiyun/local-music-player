import List from '../pages/List';
// import React from "react";
// import { Redirect } from "react-router-dom";

export default [
  {
    path: "/",
    component: List,
    exact: true,
  },
  {
    path: "/list",
    component: List,
    routes: [
      {
        path: "/list/:id",
        component: List
      }
    ]
  },
]