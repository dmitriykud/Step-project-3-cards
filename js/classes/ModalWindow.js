
export default class ModalWindow {
    constructor(title, elem, confirmFunction) {
        this.title = title;
        this.elem = elem;
        this.confirmFunction = confirmFunction;
        this.modalConteiner = document.createElement('div');
        this.modalDialog = document.createElement('div');
        this.modalContent = document.createElement('div');
        this.modalHeader = document.createElement('div');
        this.modalBody = document.createElement('div');
        this.modalFooter = document.createElement('div');
        this.btnConfirm = document.createElement('button');
        this.btnClose = document.createElement('button')
    }

    createElement() {
        this.modalConteiner.classList.add('modal');
        this.modalConteiner.style.display = 'block';
        this.modalDialog.classList.add('modal-dialog');
        this.modalContent.classList.add('modal-content');
        this.modalHeader.classList.add('modal-header');
        this.btnClose.classList.add('btn-close')
        this.modalBody.classList.add('modal-body');
        this.modalFooter.classList.add('modal-footer');
        this.btnConfirm.classList.add('btn');
        this.btnConfirm.classList.add('btn-primary');
        this.btnConfirm.innerText = 'Confirm';


        const header = `<h5 class="modal-title">${this.title}</h5>`

        this.modalHeader.innerHTML = header;
        this.modalHeader.append(this.btnClose)

        this.modalFooter.append(this.btnConfirm)

        this.modalContent.append(this.modalHeader, this.modalBody, this.modalFooter)

        this.modalDialog.append(this.modalContent)

        this.modalConteiner.append(this.modalDialog)

        this.modalBody.append(this.elem);

    }

    addListeners() {

        this.btnClose.addEventListener('click', () => {
            this.close()

        })

        this.modalConteiner.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(this.modalContent);

            if (!withinBoundaries) {
                this.close()
            }
        })

        this.btnConfirm.addEventListener('click', () => {

            this.confirmFunction(() => {
                this.close();
            });
        })
    }

    close() {
        this.modalConteiner.remove();
    }

    render() {
        this.createElement();
        this.addListeners();
        document.body.append(this.modalConteiner)

    }
}