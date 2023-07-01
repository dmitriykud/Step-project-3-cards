import Form from "./Form.js";

export default class EditVisit extends Form {
    constructor(id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit, title) {
        super(title);
        this.id = id;
        this.age = age;
        this.visitDescription = visitDescription;
        this.doctor = doctor;
        this.purposeVisit = purposeVisit;
        this.fullName = fullName;
        this.urgency = urgency;
        this.indexBodyMass = indexBodyMass;
        this.normalPressure = normalPressure;
        this.transferredDiseases = transferredDiseases;
        this.lastDateVisit = lastDateVisit;
        this.selectDoctorHTML = "";
        this.selectUrgency = "";
        this.additionalForDoctor = "";
      
        this.cardiologistHTML = `
            <div class="mb-3">
                <label for="normalPressure" class="col-form-label">Звичайний тиск</label>
                <input type="text" class="form-control is-invalid" id="normalPressure" value ="${this.purposeVisit}">
            </div>
            
            <div class="mb-3">
                <label for="indexBodyMass" class="col-form-label">Індекс маси тіла</label>
                <input type="text" class="form-control is-invalid" id="indexBodyMass" value="${this.indexBodyMass}">
            </div>
            
            <div class="mb-3">
                <label for="transferredDiseases" class="col-form-label">Перенесені захворювання сердцево-судинної системи </label>
                <input type="text" class="form-control is-invalid" id="transferredDiseases" value ="${this.transferredDiseases}">
            </div>
                        
            <div class="mb-3">
                <label for="age" class="col-form-label ">Вік</label>
                <input type="text" class="form-control is-invalid" id="age" value="${this.age}">
            </div>          
            `;

        this.therapistHTML = `
            <div class="mb-3">
                <label for="age" class="col-form-label">Вік</label>
                <input type="text" class="form-control is-invalid" id="age" value="${this.age}">
            </div>          
            `;

        this.dentistHTML = `
            <div class="mb-3">
                <label for="lastDateVisit" class="col-form-label">Дата останнього візиту</label>
                <input type="text" class="form-control is-invalid" id="lastDateVisit" value="${this.lastDateVisit}">
            </div> 
            `;
    };

    createElement() {
        super.createElement()

        if (this.doctor === 'Cardiologist') {
            this.selectDoctorHTML = `
            <select class="form-select select-doctor is-invalid" id="doctor" aria-label="Default select example">
            <option >Оберіть лікаря</option>
            <option selected value="Cardiologist">Кардіолог</option>
            <option value="Dentist">Стоматолог</option>
            <option value="Therapist">Терапевт</option>
            </select>
            `;
            this.additionalForDoctor = this.cardiologistHTML;
        };

        if (this.doctor === 'Therapist') {
            this.selectDoctorHTML = `
            <select class="form-select select-doctor is-invalid" id="doctor" aria-label="Default select example">
            <option >Оберіть лікаря</option>
            <option  value="Cardiologist">Кардіолог</option>
            <option value="Dentist">Стоматолог</option>
            <option selected value="Therapist">Терапевт</option>
            </select>
            `;
            this.additionalForDoctor = this.therapistHTML;
        };

        if (this.doctor === 'Dentist') {
            this.selectDoctorHTML = `
            <select class="form-select select-doctor is-invalid" id="doctor" aria-label="Default select example">
            <option >Оберіть лікаря</option>
            <option  value="Cardiologist">Кардіолог</option>
            <option selected value="Dentist">Стоматолог</option>
            <option value="Therapist">Терапевт</option>
            </select>
            `;
            this.additionalForDoctor = this.dentistHTML;
        };

        if (this.urgency === 'low') {
            this.selectUrgency = `
            <select class="form-select select-need is-invalid" id="urgency" aria-label="Default select example">
                <option >Оберіть терміновість</option>
                <option selected value="low">Звичайна</option>
                <option  value="normal">Пріоритетна</option>
                <option  value="high">Невідкладна</option>
            </select>
            `;
        };

        if (this.urgency === 'normal') {
            this.selectUrgency = `
            <select class="form-select select-need is-invalid" id="urgency" aria-label="Default select example">
                <option selected>Оберіть терміновість</option>
                <option  value="low">Звичайна</option>
                <option selected value="normal">Пріоритетна</option>
                <option  value="high">Невідкладна</option>
            </select>
            `;
        };

        if (this.urgency === 'high') {
            this.selectUrgency = `
            <select class="form-select select-need is-invalid" id="urgency" aria-label="Default select example">
                <option selected>Оберіть терміновість</option>
                <option  value="low">Звичайна</option>
                <option  value="normal">Пріоритетна</option>
                <option selected value="high">Невідкладна</option>
            </select>
            `;
        };

        const inputsHTML = `
            ${this.selectDoctorHTML}
            <div class="mb-3">
                <label for="purposeVisit" class="col-form-label">Мета візиту:</label>
                <input type="text" class="form-control is-invalid" id="purposeVisit" value="${this.purposeVisit}">
            </div>

            <div class="mb-3">
                <label for="visitDescription" class="form-label">Короткий опис візиту</label>
                <textarea class="form-control" id="visitDescription" rows="2" >${this.visitDescription}</textarea>
            </div>

            ${this.selectUrgency}

            <div class="mb-3">
                <label for="fullName" class="col-form-label">Ваше П.І.Б.:</label>
                <input type="text" class="form-control is-invalid" id="fullName" value="${this.fullName}">
            </div>  
            ${this.additionalForDoctor}     
             `;

        this.form.insertAdjacentHTML('beforeend', inputsHTML);


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

}
