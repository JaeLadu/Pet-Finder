function initSubtitle() {
   class Subtitle extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const subtitleEl = document.createElement("h3");
         subtitleEl.classList.add("subtitle");
         subtitleEl.textContent = this.getAttribute("text") || "Subtítulo";

         const color = this.getAttribute("color");
         const bold = this.hasAttribute("bold");

         const style = document.createElement("style");
         style.textContent = /*css*/ `
         .subtitle{
            color: ${color || "#000"};
            text-align: center;
            font-family: Poppins;
            font-size: 24px;
            font-style: normal;
            font-weight: ${bold ? 700 : 400};
            line-height: normal;
         }
        `;
         this.append(subtitleEl, style);
      }
   }
   customElements.define("subtitle-comp", Subtitle);
}
export { initSubtitle };
