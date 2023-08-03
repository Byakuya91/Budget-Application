import React from "react";

// RRD imports
import { useLoaderData } from "react-router-dom";

// Component imports
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import AddExpenseForm from "../components/AddExpenseForm";

// helpers imports
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// library imports
import { toast } from "react-toastify";

// loader function
export async function budgetLoader({ params }) {
  // Step One: Utilize getAllMatchingItems from helper.js
  const budget = await getAllMatchingItems({
    // NOTE: the id for key field, MUST match the dynamic name from path in the router
    // located in App.js
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    // NOTE: the id for key field, MUST match the dynamic name from path in the router
    // located in App.js
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  //   Checking if a budget exists
  if (!budget) {
    throw new Error("The budget you're trying to find does not exist!");
  }

  // Step Two: return the budget and expenses
  return { budget, expenses };
}

// action function
export async function budgetAction({ request }) {
  //  grabbing form data
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
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

  // Deleting an Expense
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

const BudgetPage = () => {
  //   destructure the budget and get data from the loader
  const { budget, expenses } = useLoaderData();

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name} Overview</span>
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span>
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
