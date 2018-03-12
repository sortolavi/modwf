
import $ from 'jquery';
import waypoints from  '../../../../node_modules/waypoints/lib/noframework.waypoints';

// make some dom items visible with animation as user scrolls down the page
// array items, procent offset (An offet of '80%' will trigger when the top of the element is 80% of the way from the top of the window, ie. 20% is left before the top of element is at top of window)
class RevealOnScroll {
	constructor(items, offset) {
		this.itemsToReveal = items;
		this.offset = offset;
		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially() {
		this.itemsToReveal.addClass("reveal-item");
	}


	createWaypoints() {
		var that = this;
		this.itemsToReveal.each(function () {
			var currentItem = this;

			new Waypoint({
				element: currentItem,
				handler: function () {
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: that.offset
			});
		});
	}
}

export default RevealOnScroll;