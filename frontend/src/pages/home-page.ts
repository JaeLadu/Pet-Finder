function initHomePage() {
   class HomePage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const headerEl = document.createElement("header-comp");
         this.append(headerEl);
      }
   }

   customElements.define("home-page", HomePage);
}
export { initHomePage };
