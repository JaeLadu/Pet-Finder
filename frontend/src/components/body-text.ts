function initBodyText() {
   class BodyText extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const bold = this.hasAttribute("bold");
         const color = this.getAttribute("color");
         const text = this.getAttribute("text");

         const bodyTextEl = document.createElement("span");
         bodyTextEl.classList.add("body-text");
         bodyTextEl.textContent = text || "Texto de body";

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
         .body-text{

            color: ${color || "#000"};
            text-align: center;
            font-family: Roboto;
            font-size: 16px;
            font-style: normal;
            font-weight: ${bold ? 700 : 400};
            line-height: normal;
}
        `;

         this.append(bodyTextEl, styleEl);
      }
   }
   customElements.define("body-text-comp", BodyText);
}
export { initBodyText };
