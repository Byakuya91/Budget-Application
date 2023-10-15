import React, { useState, useEffect } from "react";

const EditBudget = ({ budget, onSave, onCancel }) => {
  const [newName, setNewName] = useState(budget.name);
  const [newAmount, setNewAmount] = useState(budget.amount);

  useEffect(() => {
    // Update form fields when the budget prop changes
    setNewName(budget.name);
    setNewAmount(budget.amount);
  }, [budget]);

  const handleSave = () => {
    onSave(budget.id, newName, newAmount);
  };

  return (
    <div className="edit-budget">
      <label htmlFor="newName">New Budget Name</label>
      <input
        type="text"
        id="newName"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <label htmlFor="newAmount">New Amount</label>
      <input
        type="number"
        step="0.01"
        id="newAmount"
        value={newAmount}
        onChange={(e) => setNewAmount(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditBudget;
