import React from "react";

// helper functions
import { calculateSpentByBudget, formatCurrency } from "../helpers";

const BudgetItem = ({ budget }) => {
  //    destructure budget object
  const { id, name, amount, color } = budget;
  // create spent variable
  const spent = calculateSpentByBudget(id);

  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      {/* <p>{formatCurrency(amount)} Budgeted</p> */}
      <progress max={formatCurrency(amount)} value="100">
        {/* percentage */}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}spent</small>
        <small>{formatCurrency(amount - spent)}remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
