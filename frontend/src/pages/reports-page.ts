import { Router, RouterLocation } from "@vaadin/router";
import { state } from "../state";

function initReportsPage() {
   class ReportsPage extends HTMLElement {
      constructor() {
         super();
      }
      onBeforeEnter(location: RouterLocation) {
         const token = state.getUserData()?.token;
         if (!token) {
            state.setTargetPage(location.pathname);
            Router.go("/login");
         }
      }

      async connectedCallback() {
         const headerEl = document.createElement("header-comp");
         this.append(headerEl);

         //chequea si el usuario tiene reportes, si tiene, renderiza una página, sino otra
         const reports = await state.getUserReports();
         if (reports.length > 0) this.reportsRender(reports);
         else this.emptyRender();
      }

      //página a renderizar si el usuario NO tiene reports
      emptyRender = () => {
         const contentContainerEl = document.createElement("div");
         contentContainerEl.classList.add("container");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("color", "#EB6372");
         titleEl.setAttribute("text", "Mascotas reportadas");

         const bodyEl = document.createElement("body-text-comp");
         bodyEl.setAttribute("text", "Aún no reportaste mascotas perdidas");

         const buttonEl = document.createElement("button-comp");
         buttonEl.setAttribute("text", "Publicar reporte");
         buttonEl.setAttribute("text-color", "#fff");
         buttonEl.setAttribute("color", "#5A8FEC");

         const style = document.createElement("style");
         style.textContent = /*css*/ `
            .container{
               height: calc(100vh - 60px);
               display: flex;
               flex-direction:column;
               align-items: center;
               justify-content:space-evenly;
               padding: 45px;
            }
            `;

         contentContainerEl.append(titleEl, bodyEl, buttonEl);
         this.append(contentContainerEl, style);
      };

      //página a renderizar si el usuario tiene uno o más reports
      //terminar de modificar para que se renderice lo que corresponde
      reportsRender = async (
         reports: {
            id: number;
            imageURL: string;
            name: string;
            area: string;
            owned: boolean;
         }[]
      ) => {
         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("text", "Mascotas reportadas");
         titleEl.setAttribute("bold", "true");

         const petCardscontainerEl = document.createElement("div");
         petCardscontainerEl.classList.add("cards-container");
         reports.forEach((report) => {
            const petCardEl = document.createElement("pet-card-comp");
            petCardEl.setAttribute("img", report.imageURL);
            petCardEl.setAttribute("name", report.name);
            petCardEl.setAttribute("id", JSON.stringify(report.id));
            petCardEl.setAttribute("location", report.area);
            if (report.owned)
               petCardEl.setAttribute("own", JSON.stringify(report.owned));
            petCardEl.addEventListener("petCardEdit", (e) => {
               //sin terminar
               //tengo que modificar la pagina de crear reporte para que tome el id que le paso en la barra de busqueda y muestre los datos de ese report
               Router.go(`/createreport?id=${JSON.stringify(report.id)}`);
            });

            petCardEl.addEventListener(
               "petCardReport",
               (e: CustomEventInit) => {
                  const reportEl = document.createElement("report-comp");
                  reportEl.setAttribute("pet", report.name);
                  reportEl.setAttribute("id", JSON.stringify(report.id));
                  reportEl.addEventListener("report", (e: CustomEventInit) => {
                     //sin terminar
                     //falta crear el método en state para reportar la mascota al back
                     console.log(
                        `data a mandar al backend para guardar: ${JSON.stringify(
                           e.detail
                        )}`
                     );
                  });
                  petCardscontainerEl.append(reportEl);
               }
            );

            petCardscontainerEl.append(petCardEl);
         });

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
            subtitle-comp{
               margin: 25px
            }
            .cards-container{
               display: flex;
               flex-direction: column;
               gap: 35px;
               padding: 20px
            }
         `;

         this.append(titleEl, petCardscontainerEl, styleEl);
      };
   }

   customElements.define("reports-page", ReportsPage);
}
export { initReportsPage };
