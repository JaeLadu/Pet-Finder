import { initBodyText } from "./components/body-text";
import { initButton } from "./components/button";
import { initCaption } from "./components/caption";
import { initHeader } from "./components/header";
import { initLink } from "./components/link";
import { initMenu } from "./components/menu";
import { initPetCard } from "./components/pet-card";
import { initReport } from "./components/report";
import { initSubtitle } from "./components/subtitle";
import { initTitle } from "./components/title";
import { initChooseLocationPage } from "./pages/choose-location-page";
import { initCreateReportPage } from "./pages/create-report-page";
import { initHomePage } from "./pages/home-page";
import { initLoginPage } from "./pages/login-page";
import { initPasswordPage } from "./pages/password-page";
import { initPersonalDataPage } from "./pages/personal-data-page";
import { initProfilePage } from "./pages/profile-page";
import { initSignUpPage } from "./pages/signup-page";
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
   initReport();
   // --Pages initiators--
   initHomePage();
   initChooseLocationPage();
   initLoginPage();
   initSignUpPage();
   initProfilePage();
   initPersonalDataPage();
   initPasswordPage();
   initCreateReportPage();
   // --Router--
   initRouter();
})();
