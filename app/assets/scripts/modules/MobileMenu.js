/*jshint esversion: 6 */ 
import $ from 'jquery';

class MobileMenu {
	constructor() {
		// dom pieces
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");
		
		// start listening events
		this.events();
	}

	events() {
		// binding toggleTheMenu to use MobileMenu obj as 'this' 
		this.menuIcon.click(this.toggleTheMenu.bind(this));
		// console.log(this);
	}

	toggleTheMenu() {
		// console.log(this);
		// without binding 'this' would refer to dom element that was clicked at
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
	}
}

export default MobileMenu;