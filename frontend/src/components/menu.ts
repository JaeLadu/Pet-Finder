function initMenu() {
   class Menu extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const menuEl = document.createElement("me");
      }
   }
   customElements.define("menu-comp", Menu);
}
export { initMenu };
