import Form from "./Form.js";

export default class Visit extends Form {
    constructor(title) {
        super(title);
        this.select = document.createElement('select');
        this.additionalInputsContainer = document.createElement('div');

        this.cardiologistHTML = `
        <div class="mb-3">
            <label for="normalPressure" class="col-form-label">Звичайний тиск</label>
             <input type="text" class="form-control is-invalid" id="normalPressure">
        </div>
        
        <div class="mb-3">
            <label for="indexBodyMass" class="col-form-label">Індекс маси тіла</label>
            <input type="text" class="form-control is-invalid" id="indexBodyMass">
        </div>
        
        <div class="mb-3">
            <label for="transferredDiseases" class="col-form-label">Перенесені захворювання сердцево-судинної системи </label>
            <input type="text" class="form-control is-invalid" id="transferredDiseases">
        </div>
                    
        <div class="mb-3">
            <label for="age" class="col-form-label ">Вік</label>
            <input type="text" class="form-control is-invalid" id="age">
        </div>          
        `;

        this.therapistHTML = `
        <div class="mb-3">
            <label for="age" class="col-form-label">Вік</label>
            <input type="text" class="form-control is-invalid" id="age">
        </div>          
        `;

        this.dentistHTML = `
        <div class="mb-3">
            <label for="lastDateVisit" class="col-form-label">Дата останнього візиту</label>
            <input type="text" class="form-control is-invalid" id="lastDateVisit">
        </div> 
        `;
    }

    createElement() {
        super.createElement()
        this.select.classList.add('form-select', 'select-doctor', 'is-invalid')
        this.select.setAttribute('id', 'doctor');

        const options = `
        <option selected>Оберіть лікаря</option>
        <option value="Cardiologist">Кардіолог</option>
        <option value="Dentist">Стоматолог</option>
        <option value="Therapist">Терапевт</option>
        `;

        this.select.innerHTML = options;

        const inputs = `
            <div class="mb-3">
                <label for="purposeVisit" class="col-form-label">Мета візиту:</label>

                <input type="text" class="form-control is-invalid" id="purposeVisit">
            </div>

            <div class="mb-3">
                <label for="visitDescription" class="form-label">Короткий опис візиту</label>
                <textarea class="form-control" id="visitDescription" rows="2" required></textarea>
            </div>

            <select class="form-select select-need is-invalid" id="urgency" aria-label="Default select example">
                <option selected>Оберіть терміновість</option>
                <option  value="low">Звичайна</option>
                <option  value="normal">Пріоритетна</option>
                <option  value="high">Невідкладна</option>
            </select>

            <div class="mb-3">
                <label for="fullName" class="col-form-label">Ваше П.І.Б.:</label>

                <input type="text" class="form-control is-invalid" id="fullName">
            </div>       
        `;
        this.form.append(this.select);
        this.form.insertAdjacentHTML('beforeend', inputs);
        this.form.append(this.additionalInputsContainer);
    };

    addInputsForElement(elementType) {
        if (elementType === 'Cardiologist') {
            this.additionalInputsContainer.innerHTML = this.cardiologistHTML;
            return;
        };

        if (elementType === 'Therapist') {
            this.additionalInputsContainer.innerHTML = this.therapistHTML;
            return;
        };

        if (elementType === 'Dentist') {
            this.additionalInputsContainer.innerHTML = this.dentistHTML;
            return;
        };

        this.additionalInputsContainer.innerHTML = '';
    };

    getVizitValues() {
        const inputs = this.form.querySelectorAll("input");
        const textarea = this.form.querySelector("textarea");
        const selects = this.form.querySelectorAll("select");
        const body = {};

        body[textarea.id] = textarea.value;

        inputs.forEach((input) => {
            body[input.id] = input.value
        });

        selects.forEach((select) => {
            body[select.id] = select.value
        });

        for (let key in body) {
            if (key !== "visitDescription" && body[key] === "" || body[key] === "Оберіть лікаря" || body[key] === "Оберіть терміновість") {
                alert('Заповніть поля виділені червоним!')
                return;
            }
        }
        return body;
    };

    getFormElement() {
        this.select.addEventListener('change', (event) => {
            this.addInputsForElement(event.target.value)
        })
        return super.getFormElement();
    }
};