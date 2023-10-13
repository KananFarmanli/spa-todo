import { useState, useEffect } from "react";
import classes from "./Layout.module.scss";
import {  Outlet } from "react-router-dom";
import Header from "../components/Header/Header";


export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  return (
    <div className={classes.main}>
      {windowWidth >= 576 && <Header />}
      <Outlet />
    </div>
  );
}
/* d */
