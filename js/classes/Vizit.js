import Form from "./Form.js";

export default class Vizit extends Form {
    constructor(title) {
        super(title);
        this.select = document.createElement('select');
        this.additionalInputsContainer = document.createElement('div');

        this.cardiologistHTML = `
        <div class="mb-3">
            <label for="Звичайний_тиск" class="col-form-label">Звичайний тиск</label>
             <input type="text" class="form-control" id="Звичайний_тиск">
        </div>
        
        <div class="mb-3">
            <label for="Індекс_маси_тіла" class="col-form-label">Індекс маси тіла</label>
            <input type="text" class="form-control" id="Індекс_маси_тіла">
        </div>
        
        <div class="mb-3">
            <label for="Перенесені_захворювання" class="col-form-label">Перенесені захворювання сердцево-судинної системи </label>
            <input type="text" class="form-control" id="Перенесені_захворювання">
        </div>
                    
        <div class="mb-3">
            <label for="Вік" class="col-form-label">Вік</label>
            <input type="text" class="form-control" id="Вік">
        </div>          
        `;

        this.therapististHTML = `
        <div class="mb-3">
            <label for="Вік" class="col-form-label">Вік</label>
            <input type="text" class="form-control" id="Вік">
        </div>          
        `;

        this.dentistHTML = `
        <div class="mb-3">
            <label for="Дата_останнього_візиту" class="col-form-label">Дата останнього візиту</label>
            <input type="text" class="form-control" id="Дата_останнього_візиту">
        </div> 
        `;
    }

    createElement() {
        super.createElement()
        this.select.classList.add('form-select', 'select-doctor')
        this.select.setAttribute('id', 'Лікар');

        const options = `
        <option selected>Оберіть лікаря</option>
        <option value="Кардіолог">Кардіолог</option>
        <option value="Стоматолог">Стоматолог</option>
        <option value="Терапевт">Терапевт</option>
        `;

        this.select.innerHTML = options;


        const inputs = `
            <div class="mb-3">
                <label for="Мета_візиту" class="col-form-label">Мета візиту:</label>
                <input type="text" class="form-control" id="Мета_візиту">
            </div>

            <div class="mb-3">
                <label for="Короткий_опис_візиту" class="form-label">Короткий опис візиту</label>
                <textarea class="form-control" id="Короткий_опис_візиту" rows="2"></textarea>
            </div>

            <select class="form-select select-need" id="Терміновість" aria-label="Default select example">
                <option selected>Оберіть терміновість</option>
                <option  value="high">Звичайна</option>
                <option  value="normal">Пріоритетна</option>
                <option  value="high">Невідкладна</option>
            </select>

            <div class="mb-3">
                <label for="П_І_Б" class="col-form-label">Ваше П.І.Б.:</label>
                <input type="text" class="form-control" id="П_І_Б">
            </div>
        `
        this.form.append(this.select);
        this.form.insertAdjacentHTML('beforeend', inputs);
        this.form.append(this.additionalInputsContainer);
    }

    addInputsForElement(elementType) {
        if (elementType === 'Кардіолог') {
            this.additionalInputsContainer.innerHTML = this.cardiologistHTML;
            return;
        }

        if (elementType === 'Терапевт') {
            this.additionalInputsContainer.innerHTML = this.therapististHTML;
            return;
        }

        if (elementType === 'Стоматолог') {
            this.additionalInputsContainer.innerHTML = this.dentistHTML;
            return;
        }

        this.additionalInputsContainer.innerHTML = '';
    }



    getVizitValues() {

        const inputs = this.form.querySelectorAll("input");
        const textarea = this.form.querySelector("textarea");
        const selects = this.form.querySelectorAll("select");
        const body = {};

        body[textarea.id] = textarea.value;

        inputs.forEach((input) => {
            body[input.id] = input.value;
        });

        selects.forEach((select) => {
            body[select.id] = select.value;
        });
        return body;
    }

    getFormElement() {
        this.select.addEventListener('change', (event) => {
            this.addInputsForElement(event.target.value)

        })
        return super.getFormElement();
    }
}