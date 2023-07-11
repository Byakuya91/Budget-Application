// React Router Dom Imports
import { redirect } from "react-router-dom";

// helper imports
import { deleteItem } from "../helpers";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });

  // return a redirect
  return redirect("/");
}
