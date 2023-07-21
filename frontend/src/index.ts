import { initBodyText } from "./components/body-text";
import { initButton } from "./components/button";
import { initCaption } from "./components/caption";
import { initHeader } from "./components/header";
import { initLink } from "./components/link";
import { initMenu } from "./components/menu";
import { initPetCard } from "./components/pet-card";
import { initSubtitle } from "./components/subtitle";
import { initTitle } from "./components/title";
import { initChooseLocationPage } from "./pages/choose-location-page";
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
   initBodyText();
   initButton();
   initPetCard();
   // --Pages initiators--
   initHomePage();
   initChooseLocationPage();
   // --Router--
   initRouter();
})();
