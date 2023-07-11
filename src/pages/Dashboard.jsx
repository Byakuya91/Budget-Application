import React from "react";
// React Router Dom imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

//Components imports
import Intro from "../components/Intro";

// helper functions
import { fetchData } from "../helpers";

// Creating a loader function
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

//action
export async function dashboardAction({ request }) {
  //  grabbing form data
  const data = await request.formData();
  //  THREE TESTS

  // TEST ONE:checking the request is working(WORKS. TEST COMPLETED)
  // console.log({ data, request });

  // TEST TWO: checking is USERNAME data works(WORKS. TEST COMPLETED)
  // const userName = data.get("userName");
  // console.log("dashboard action~userName:", userName);

  // TEST THREE: form data(SUCCESS)
  const formData = Object.fromEntries(data);
  // console.log("dashboard action~userName:", formData);

  // SAVE DATA TO LOCAL STORAGE: using a Try-catch
  try {
    //  Testing error message(DONE)
    // throw new Error("Ya Finished!");
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.failure(`Welcome ${formData.userName}`);
  } catch (error) {
    throw new Error("There was a problem creating your account");
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default Dashboard;
