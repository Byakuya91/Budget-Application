// react Imports
import React from "react";
import { useRef } from "react";
// React Router Dom imports
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ budgets }) => {
  // define fetcher
  const fetcher = useFetcher();

  // define formRef
  const formRef = useRef();

  // define focusRef
  const focusRef = useRef();

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g.,Coffee"
              ref={focusRef}
              required
            />
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
