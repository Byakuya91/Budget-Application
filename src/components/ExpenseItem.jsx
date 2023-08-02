import React from "react";
// helper  imports
import { formatCurrency, formatDateToLocaleString } from "../helpers";

const ExpenseItem = ({ expense, expenseId }) => {
  return (
    <>
      {/* <td>{expenseId}</td> */}
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
    </>
  );
};

export default ExpenseItem;
