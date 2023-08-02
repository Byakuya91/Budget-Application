import React from "react";

// React Router Dom Imports
import { useLoaderData } from "react-router-dom";

// Component imports
import Table from "../components/Table";

// Helper function imports
import { fetchData } from "../helpers";

// Creating a loader function
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

const ExpensesPage = () => {
  // get expenses
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length}total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>There are no Expenses.</p>
      )}
    </div>
  );
};

export default ExpensesPage;
