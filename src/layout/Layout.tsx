import  { useState, useEffect } from "react";
import classes from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";

export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const path= useParams();
  console.log(path)

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
   {/*         {!path.id && windowWidth >= 576 &&  <Header/> } */}
   <Header/> 
      <Outlet />
    </div>
  );
}
/* d */
