import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import { Error } from "./pages/Error";

// Learning the new features of React Router DOM Version 6.8
// Learning about Loaders, Actions, and errorelements.

// Creating a BrowseRouter.
// The path tells us where the SPA(Single page Application) to look at
// The element shows us what is on that path, a component, text etc.

// ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader,
    errorElement: <Error />,
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
