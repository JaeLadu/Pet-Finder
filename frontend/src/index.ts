import { initHeader } from "./components/header";
import { initMenu } from "./components/menu";
import { initHomePage } from "./pages/home-page";
import { initRouter } from "./router";

(function () {
   initRouter();
   // --Pages initiators--
   initHomePage();
   // --Components initiators--
   initHeader();
   initMenu();
})();
