// React imports
import { useRef } from "react";
import { useEffect } from "react";
import React from "react";

// Router Dom Imports
import { Form, useFetcher } from "react-router-dom";
// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  // Fetcher allows for state tracking within Router Dom.
  // You're submitting something to that page and not navigating to components
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  // clear the form when submitting through UseRef
  // STEP ONE: grab UseRef and add it to the form and focus ref
  const formRef = useRef();
  const focusRef = useRef();

  // STEP TWO: clear the form with useEffect

  useEffect(() => {
    //  side effect code: note the isSubmit dependency is required
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g,Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g.,$400"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating budget...</span>
          ) : (
            <>
              <span className="budget-btn-label">Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
