// React Router Dom Imports
import { redirect } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// helper imports
import { deleteItem } from "../helpers";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });
  toast.success("Your account has been deleted!");

  // return a redirect
  return redirect("/");
}
