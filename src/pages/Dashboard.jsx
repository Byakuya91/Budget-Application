import React from "react";
// React Router Dom imports
import { Link, useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

//Components imports
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";

// Creating a loader function
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//ACTIONS
export async function dashboardAction({ request }) {
  // TODO: Expanding the app to enable editing Budget name and amount
  // ! 1) Figure out a way to update localStorage within helpers.js
  // ! 2)  Create EditBudget component(DONE)
  // ! 3)  Conditionally Render out the EditBudget form on Dashboard
  // ! 4)  Test it out.

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

  // ADDING a new expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }
  //  DELETING an Expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

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
                    <AddExpenseForm budgets={budgets} />
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))}
                  </div>
                  {expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                        expenses={expenses
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 8)}
                      />
                      {expenses.length > 8 && (
                        <Link to="expenses" className="btn btn--dark">
                          View all expenses
                        </Link>
                      )}
                    </div>
                  )}
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
