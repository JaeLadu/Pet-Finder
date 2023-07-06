function initHeader() {
   class Header extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const headerEl = document.createElement("header");

         const headerLogoEl = document.createElement("img");
         headerLogoEl.src =
            "http://res.cloudinary.com/dxdihjprh/image/upload/v1688484624/pet-finder/bsydcroe9uzsunuxbou0.png";

         const headerMenuButton = document.createElement("span");
         headerMenuButton.classList.add(
            "material-symbols-outlined",
            "header__menu-button"
         );
         headerMenuButton.textContent = "menu";

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
            header{
                border-radius: 0px 0px 10px 10px;
                background-color: #26302E;    
                width: 100%;
                height: 60px;
                display:flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 18px;

            }
            .material-symbols-outlined {
                font-variation-settings:
                'FILL' 0,
                'wght' 400,
                'GRAD' 0,
                'opsz' 48
            }
            .header__menu-button{
                font-size:40px
            }
         `;

         headerEl.append(headerLogoEl, headerMenuButton);
         this.append(headerEl, styleEl);
      }
   }
   customElements.define("header-comp", Header);
}
export { initHeader };
