import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import { Error } from "./pages/Error";

// LAYOUT IMPORTS
import Main, { mainLoader } from "./Layouts/main";

// Learning the new features of React Router DOM Version 6.8
// Learning about Loaders, Actions, and errorelements.

// Creating a BrowseRouter.
// The path tells us where the SPA(Single page Application) to look at
// The element shows us what is on that path, a component, text etc.

// ACTIONS IMPORTS
import { logoutAction } from "./actions/logout";

// ROUTES
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
        errorElement: <Error />,
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
      </div>
    </>
  );
}

export default App;
