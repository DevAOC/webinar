import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/signed-in": {};
  "/profile": {};
  "/forgot-password": {};
  "/reset-password": {};
  "/verify-email": {};
  "/sign-in": {};
  "/sign-up": {};
};