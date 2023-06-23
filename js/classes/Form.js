export default class Form {
    constructor() {

        this.form = document.createElement('form');

    }

    createElement() {
        this.form.className = 'form-wrapper';

    }

    getValues() {
        const inputs = this.form.querySelectorAll('input');
        const body = {};


        inputs.forEach(input => {
            body[input.type] = input.value;
        })

        return body;
    }

    render() {
        this.createElement();
        document.body.append(this.form)
    }

    getFormElement() {
        this.createElement();
        return this.form;
    }
}
