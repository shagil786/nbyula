import { redirect } from "react-router-dom";
import { setAuthCookies, removeAuthCookies } from "./cookie-utils";

export const setToken = async ({ token, username }) => {
  setAuthCookies({ token, username });
};

export const removeAllLocStorage = async () => {
  await localStorage.clear();
  return true;
};

export const logout = ({
  hardReload = window.location.pathname === "/",
  routeTo = "/",
  shouldRedirect = true,
} = {}) => {
  localStorage.removeItem("userData");
  removeAllLocStorage();
  window.localStorage.setItem("logout", Date.now().toString());
  if (shouldRedirect) {
    redirect(routeTo);
    removeAuthCookies();
    if (hardReload) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    return true;
  }
};
