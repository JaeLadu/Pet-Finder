function initButton() {
   class Button extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const shadow = this.attachShadow({ mode: "open" });
         const text = this.getAttribute("text") || "Botón";
         const color = this.getAttribute("color");
         const textColor = this.getAttribute("text-color");
         const bold = this.hasAttribute("bold");

         const buttonEl = document.createElement("button");
         buttonEl.classList.add("button");

         const buttonTextEl = document.createElement("body-text-comp");
         buttonTextEl.setAttribute("text", text);
         if (textColor) buttonTextEl.setAttribute("color", textColor);
         if (bold) buttonTextEl.setAttribute("bold", "true");

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
         .button{
            border-radius: 4px;
            border-style: none;
            background-color: ${color || "#4A5553"};
            display: flex;
            width: 100%;  
            height: 50px;
            justify-content: center;
            align-items: center;
         }
         `;

         buttonEl.append(buttonTextEl, styleEl);
         shadow.append(buttonEl);
      }
   }
   customElements.define("button-comp", Button);
}
export { initButton };
