import { Router } from "@vaadin/router";

function initRouter() {
   const root = document.createElement("div");
   root.classList.add("root");
   document.body.append(root);

   const router = new Router(root);

   router.setRoutes([
      {
         path: "/",
         component: "home-page",
      },
   ]);
}
export { initRouter };
