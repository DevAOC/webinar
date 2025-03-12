import { Provider as GadgetProvider } from "@gadgetinc/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Suspense } from "react";
import { api } from "./api";
import "./app.css";
import type { GadgetConfig } from "gadget-server";
import type { Route } from "./+types/root";

export const links = () => [
  { rel: "stylesheet", href: "https://assets.gadget.dev/assets/reset.min.css" },
];

export const meta = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Gadget React Router app" },
];

export type RootOutletContext = {
  gadgetConfig: GadgetConfig;
  csrfToken: string;
};

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { session, gadgetConfig } = context;

  return {
    gadgetConfig,
    csrfToken: session?.get("csrfToken"),
  };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { gadgetConfig, csrfToken } = loaderData;

  return (
    <html lang="en" className="light">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Suspense>
          <GadgetProvider api={api}>
            <Outlet context={{ gadgetConfig, csrfToken }} />
          </GadgetProvider>
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
