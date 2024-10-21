import { CanActivateFn, Router } from "@angular/router";
import { ApiService } from "./api.service";
import { inject } from "@angular/core";

export const userGuard: CanActivateFn = (route, state) => {
  // Assuming all users, including guests, can access this.
  // Since no authentication is required, always allow access.
  return true; // allow accessing the endpoint
};

export const adminGuard: CanActivateFn = (route, state) => {
  // Check if the user is "logged in" as an admin based on a backend verification or local state
  if (localStorage.getItem("isAdmin") === "true") {
    return true; // allow accessing admin endpoints
  } else {
    inject(Router).navigate(['/login']);
    return false; // not allowing if not admin
  }
};
