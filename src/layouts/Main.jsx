import React from "react";
// React Router Dom imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets imports
import wave from "../assets/wave.svg";

// component imports
import Nav from "../components/nav";

// helper functions
import { fetchData } from "../helpers";

// Creating a loader function
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
