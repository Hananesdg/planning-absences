import { contextBridge } from "electron";
import { login } from "./main/auth.js";
import { getDashboardKpis } from "./main/dashboard.js";
import { createUserAccount, listEmployeesWithAccounts } from "./main/users.js";

console.log("preload chargé");

contextBridge.exposeInMainWorld("auth", {
  login,
});

contextBridge.exposeInMainWorld("db", {
  getDashboardKpis,
});

contextBridge.exposeInMainWorld("users", {
  createUserAccount,
  listEmployeesWithAccounts,
});
