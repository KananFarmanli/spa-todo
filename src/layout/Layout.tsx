import React from "react";
import classes from "./Layout.module.scss";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className={classes.main}>
      <Outlet />
    </div>
  );
}
