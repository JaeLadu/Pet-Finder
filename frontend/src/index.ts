import { initCaption } from "./components/caption";
import { initHeader } from "./components/header";
import { initLink } from "./components/link";
import { initMenu } from "./components/menu";
import { initSubtitle } from "./components/subtitle";
import { initTitle } from "./components/title";
import { initHomePage } from "./pages/home-page";
import { initRouter } from "./router";

(function () {
   // --Components initiators--
   initHeader();
   initMenu();
   initTitle();
   initSubtitle();
   initCaption();
   initLink();
   // --Pages initiators--
   initHomePage();
   // --Router--
   initRouter();
})();
