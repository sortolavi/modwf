import $ from 'jquery';

class Modal {

	constructor() {
		this.openModalButton = $(".open-modal");
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");
		this.events();
	}

	events() {
		// open modal 
		this.openModalButton.click(this.openModal.bind(this));

		// close modal
		this.closeModalButton.click(this.closeModal.bind(this));

		// any key
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) {
		// if esc key pressed
		if (e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass("modal--is-visible");
		// abort normal click behavior in browser by returning false
		return false; 
	}

	closeModal() {
		this.modal.removeClass("modal--is-visible");

	}

}

export default Modal;