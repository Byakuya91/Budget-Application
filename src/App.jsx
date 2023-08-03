import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./pages/Error";
// Learning the new features of React Router DOM Version 6.8
// Learning about Loaders, Actions, and errorelements.

// Creating a BrowseRouter.
// The path tells us where the SPA(Single page Application) to look at
// The element shows us what is on that path, a component, text etc.

// LAYOUT IMPORTS
import Main, { mainLoader } from "./Layouts/main";

// LIBRARY IMPORTS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ACTIONS IMPORTS
import { logoutAction } from "./actions/logout";
// import deleteBudget from "./actions/deleteBudget";
import { deleteBudget } from "./actions/deleteBudget";

// ROUTES IMPORTS
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
