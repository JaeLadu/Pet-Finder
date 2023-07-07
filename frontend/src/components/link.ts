function initLink() {
   class Link extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const linkEl = document.createElement("span");
         linkEl.textContent = this.getAttribute("text") || "Link";
         linkEl.classList.add("link");

         const style = document.createElement("style");
         style.textContent = /*css*/ `
         .link{
            color: #3B97D3;
            font-family: Roboto;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-decoration-line: underline;
            text-transform: uppercase;
            }
         `;

         this.append(linkEl, style);
      }
   }
   customElements.define("link-comp", Link);
}
export { initLink };
