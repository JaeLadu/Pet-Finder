function initMenu() {
   class Menu extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const menuEl = document.createElement("div");
         menuEl.classList.add("menu");

         const closeEl = document.createElement("span");
         closeEl.classList.add(
            "material-symbols-outlined",
            "menu__close-button"
         );
         closeEl.textContent = "close";
         closeEl.addEventListener("click", (e) => {
            this.remove();
            this.innerHTML = "";
         });

         const linksContainerEl = document.createElement("ul");
         linksContainerEl.classList.add("menu__links-container");

         linksContainerEl.innerHTML = /*html*/ `
            <li goes-to= '/profile'><subtitle-comp color='#fff' text='Mis datos'></subtitle-comp></li>
            <li goes-to= '/reports'><subtitle-comp color='#fff' text='Mis mascotas reportadas'></subtitle-comp></li>
            <li goes-to= '/report-lost-pet'><subtitle-comp color='#fff' text='Reportar mascota'></subtitle-comp></li>
         `;

         const sessionEl = document.createElement("div");
         sessionEl.classList.add("menu__session-container");
         sessionEl.innerHTML = /*html*/ `
            <caption-comp text=email@email.com color=#fff></caption-comp>
            <link-comp text='cerrar sesión'></link-comp>
         `;

         const style = document.createElement("style");
         style.textContent = /*css*/ `
            .menu{
               position: absolute;
               top: 0px;
               right: 0px;
               bottom: 150px;
               left: 50px;
               z-index: 3;
               padding: 25px;
               border-radius: 0px 0px 10px 10px;
               background-color: #26302E;
               display: flex;
               flex-direction: column;
               justify-content:space-between;
            }
            .menu__close-button{
               color:#fff;
               font-size:40px;
               align-self:flex-end;
            }
            .menu__links-container{
               padding:0;
               display:flex;
               flex-direction:column;
               gap:60px;
            }
            li{
               list-style: none;
            }
            .menu__session-container{
               display:flex;
               flex-direction:column;
               text-align:center;
               gap:35px;
            }
`;

         menuEl.append(closeEl, linksContainerEl, sessionEl);
         this.append(menuEl, style);
      }
   }
   customElements.define("menu-comp", Menu);
}
export { initMenu };
