import React from "react";

// library imports
import { BanknotesIcon } from "@heroicons/react/24/outline";

// RRD imports
import { Form, Link } from "react-router-dom";

// helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  //    destructure budget object
  const { id, name, amount, color } = budget;
  // create spent variable
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      {/* <p>{formatCurrency(amount)} Budgeted</p> */}
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}spent</small>
        <small>{formatCurrency(amount - spent)}remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form>
            <p>hi</p>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
