function initCaption() {
   class Caption extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const captionEl = document.createElement("span");
         captionEl.textContent = this.getAttribute("text") || "Títutlo";
         captionEl.classList.add("caption");

         const style = document.createElement("style");
         style.textContent = /*css*/ `
         .caption{
            color: #000;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: uppercase;
            }
         `;

         this.append(captionEl, style);
      }
   }
   customElements.define("caption-comp", Caption);
}
export { initCaption };
