import React from "react";
// React Router Dom imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

//Components imports
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

// helper functions
import { fetchData } from "../helpers";

// Creating a loader function
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
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
    return toast.success(`Welcome ${formData.userName}`);
  } catch (error) {
    throw new Error("There was a problem creating your account");
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back,
            <span className="accent">{userName}!</span>
            <div className="grid-sm">
              {/* CONDITIONAL RENDERING BUDGETS TO DO */}
              {/* {budgets ? (): ()} */}
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                </div>
              </div>
            </div>
          </h1>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
