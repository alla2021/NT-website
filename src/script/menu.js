const menuModule = {
   menu: document.querySelector(".menu"),
   menuBtn: document.querySelector(".menu-btn"),

   toggleMenu: function() {
      this.menu.style.display = this.menu.style.display === "none" || this.menu.style.display === "" ? "block" : "none";
   },

   handleMenuClick: function(event) {
      if (event.target.tagName !== "UL") {
         this.menu.style.display = "none";
      }
   },

   handleDocumentClick: function(event) {
      if (!this.menu.contains(event.target) && event.target !== this.menuBtn) {
         this.menu.style.display = "none";
      }
   },

   initialize: function() {
      this.menuBtn.addEventListener("click", this.toggleMenu.bind(this));
      this.menu.addEventListener("click", this.handleMenuClick.bind(this));
      document.addEventListener("click", this.handleDocumentClick.bind(this));
   }
};

menuModule.initialize();

export default menuModule;
