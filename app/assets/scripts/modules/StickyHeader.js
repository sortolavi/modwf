import $ from 'jquery';
import waypoints from  '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {

	constructor() {
		// target element
		this.targetElem = $(".site-header");
		// triggering effect when this elem reaches top of the screen
		this.triggerElem = $(".large-hero__title");
		// run it
		this.createHeaderWaypoint();

		// all page-sections, site-header included to remove all link colors when reaching top page
		this.pageSections = $(".site-header, .page-section");
	
		// all nav links under primary-nav class
		this.headerLinks = $(".primary-nav a");
		// run it
		this.addSmoothScrolling();
		this.createPageSectionWaypoints();
	}

	// scroll smoothly to page sections, without this the move to link would be instant
	addSmoothScrolling() {
		$.smoothScroll("options", {"speed":"auto","autoCoefficient": 2});
		this.headerLinks.smoothScroll();
	}

	// turn header background color darker when scrolling down and restore it when scrolling back top
	createHeaderWaypoint() {
		var that = this;

		new Waypoint({
			// take first element from array
			element: this.triggerElem[0],

			handler: function (direction) {
				if (direction == "down") {
					that.targetElem.addClass("site-header--dark");
				} else {
					that.targetElem.removeClass("site-header--dark");
				}
			}
		});
	}

	// change header link color when reaching target page sections
	createPageSectionWaypoints() {
		var that = this;

		this.pageSections.each(function () {
			// 'this' refers to current page-section when looping through all page-sections
			var currentPageSection = this;

			new Waypoint({
				element: currentPageSection,
				handler: function (direction) {
					if (direction == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "15%"
			});

			new Waypoint({
				element: currentPageSection,
				handler: function (direction) {
					if (direction == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-30%"
			});
		});
	}
}

export default StickyHeader;