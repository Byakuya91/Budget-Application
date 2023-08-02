import React from "react";

// RRD imports
import { useLoaderData } from "react-router-dom";

// helpers import
import { getAllMatchingItems } from "../helpers";

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

  //   Checking if a budget exists
  if (!budget) {
    throw new Error("The budget you're trying to find does not exist!");
  }

  // Step Two: return the budget
  return { budget };
}

const BudgetPage = () => {
  //   destructure the budget and get data from the loader
  const { budget } = useLoaderData();

  return <div>{budget.name}</div>;
};

export default BudgetPage;
