function initCaption() {
   class Caption extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const shadow = this.attachShadow({ mode: "open" });
         const captionEl = document.createElement("span");
         captionEl.textContent = this.getAttribute("text") || "Títutlo";
         captionEl.classList.add("caption");

         const color = this.getAttribute("color");

         const style = document.createElement("style");
         style.textContent = /*css*/ `
         .caption{
            color: ${color || "#000"};
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: uppercase;
            }
         `;

         shadow.append(captionEl, style);
      }
   }
   customElements.define("caption-comp", Caption);
}
export { initCaption };
