import React, { lazy} from "react";
import {
  RouteComponentProps,
} from 'react-router-dom'
import { StaticContext } from "react-router";

const routes: Array<{
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
  path?: string
}> = [
  {
    component: lazy(
      () =>
        import(
          "./pages/Home"
        )
    ),
    path: "/",
  },
  {
    component: lazy(
      () =>
        import(
          "./pages/NotFound"
        )
    ),
    path: "/:catchAll(.*)",
  }
]

export default routes