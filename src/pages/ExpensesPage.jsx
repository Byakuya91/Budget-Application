import React from "react";

// React Router Dom Imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// Component imports
import Table from "../components/Table";

// Helper function imports
import { deleteItem, fetchData } from "../helpers";

// loader function
export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

// action function
export async function expensesAction({ request }) {
  //  grabbing form data
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
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
