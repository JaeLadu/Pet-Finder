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
      {
         path: "/choose-location",
         component: "choose-location-page",
      },
      {
         path: "/login",
         component: "login-page",
      },
      {
         path: "/signup",
         component: "signup-page",
      },
      {
         path: "/profile",
         component: "profile-page",
      },
      {
         path: "/personaldata",
         component: "personal-data-page",
      },
      {
         path: "/password",
         component: "password-page",
      },
   ]);
}
export { initRouter };
