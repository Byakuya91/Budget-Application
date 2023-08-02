// experimental wait function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

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

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  // Step one: fetch all the data
  const data = fetchData(category) ?? [];
  // Step two: filter the item based upon the value
  return data.filter((item) => item[key] === value);
};

// Delete an item from local storage(MY CODE)
// export const deleteItem = ({ key, id }) => {
//   // Step one: grab the existing data for whatever key was passed in
//   const existingData = fetchData(key);
//   // Step two: checking for the Id to exist
//   if (id) {
//     const newData = existingData.filter((item) => item.id !== id);
//     // Step three: return local storage of the new Data as a string
//     return localStorage.setItem(key, JSON.stringify(newData));
//   }

//   // Step four: if there's no new Id that's arrived return localstorage with remove item
//   return localStorage.removeItem(key);
// };

// NEW CODE

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
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

// Formatting dates
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Formatting percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Formatting currency
export const formatCurrency = (amt) => {
  // console.log("formatCurrency called with:", amt);
  const formattedAmount = amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
  // console.log("Formatted amount:", formattedAmount);
  return formattedAmount;
};

// Formatting Currency new version(BACKUP)
// export const formatCurrency = (amt) => {
//   const formattedAmount = `$${amt
//     .toFixed(2)
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
//   console.log("Formatted amount:", formattedAmount);
//   return formattedAmount;
// };

//
