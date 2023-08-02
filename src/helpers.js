// experimental wait function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

// color generator function
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  // HSL:  34 = H,  64 = S, 50 = L
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  // grab expenses
  const expenses = fetchData("expenses") ?? [];
  // loop through app the expenses and Two things that need to be done:
  // 1) The budgetId they have matches the budgetId that is passed in
  // 2) add up all the values to see the total amount spent within that budget category.
  // SOLUTION: reduce  to do this in a single loop.
  // NOTE: acc means "accumulated"
  const budgetSpent = expenses.reduce((acc, expense) => {
    //  check if expense.id === budgetId passed in
    if (expense.budgetId !== budgetId) return acc;

    // add current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING

// Format currency
export const formatCurrency = (amt) => {
  console.log("formatCurrency called with:", amt);
  const formattedAmount = amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
  console.log("Formatted amount:", formattedAmount);
  return formattedAmount;
};

// Format Currency new version(BACKUP)
// export const formatCurrency = (amt) => {
//   const formattedAmount = `$${amt
//     .toFixed(2)
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
//   console.log("Formatted amount:", formattedAmount);
//   return formattedAmount;
// };

//
