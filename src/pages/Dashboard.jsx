import React from "react";
// React Router Dom imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

//Components imports
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

// helper functions
import { createBudget, fetchData, waait } from "../helpers";

// Creating a loader function
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

//action
export async function dashboardAction({ request }) {
  // Test waait function
  // await waait();
  await waait();

  //  grabbing form data
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // testing the _action
  // console.log(_action);

  // newUser submission
  if (_action === "newUser") {
    try {
      //  Testing error message(DONE)
      // throw new Error("Ya Finished!");
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
    }
  }

  // adding a new budget
  if (_action === "createBudget") {
    try {
      //  create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });

      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
    }
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
              {budgets && budgets.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                  </div>
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom!</p>
                  <p>Create a budget to get started.</p>
                  <AddBudgetForm />
                </div>
              )}
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
