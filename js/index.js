import ModalWindow from './classes/ModalWindow.js';
import LoginForm from './classes/LoginForm.js';
import Visit from './classes/Visit.js';
import checkToken from './functions/checkToken.js';
import loginFunction from './API/loginFunction.js';
import postElement from './API/postElement.js';
checkToken();


const btnLogin = document.querySelector('.btn-danger');

btnLogin.addEventListener('click', () => {

    const form = new LoginForm();

    const confirmCallback = async (close) => {
        const body = form.getValues();
        const { data } = await loginFunction(body);
        localStorage.setItem("token", data);
        close();
        checkToken();
    };


    new ModalWindow("Login", form.getFormElement(), confirmCallback).render();
})

const btnCreateVisit = document.querySelector('.сreate-visit');

btnCreateVisit.addEventListener('click', () => {

    const form = new Visit();

    const confirmCallback = async (close) => {
        const body = form.getVizitValues();
        const { data } = await postElement(body);
        console.log(data);
        let additionalToCard = "";



        const addToCardKardiologist = `
            <p class="card-text">Звичайний тиск: ${data.normalPressure}</p>
            <p class="card-text">Індекс маси тіла: ${data.indexBodyMass}</p>
            <p class="card-text">Перенесені захворювання: ${data.transferredDiseases}</p>
            <p class="card-text">Вік: ${data.age}</p>
        `;
        const addToCardDantist = `
            <p class="card-text">Дата останнього візиту: ${data.lastDateVisit}</p>
        `;
        const addToCardTerapevtist = `
            <p class="card-text">Вік: ${data.age}</p>
        `;

        if (data.doctor === "Cardiologist") {
            additionalToCard = addToCardKardiologist
        };

        if (data.doctor === "Dentist") {
            additionalToCard = addToCardDantist
        }
        if (data.doctor === "Therapist") {
            additionalToCard = addToCardTerapevtist
        }

        const card = `
        <div class="card w-25" id = ${data.id}>
            <div class="card-body bg-warning">
            <h5 class="card-title">Лікар:${data.doctor}</h5>
            <p class="card-text">Мета візиту: ${data.purposeVisit}</p>
            <p class="card-text">Короткий опис візиту: ${data.visitDescription}</p>
            <p class="card-text">Терміновість: ${data.urgency}</p>
            <p class="card-text">П.І.Б.: ${data.fullName}</p>

            ${additionalToCard}
            <a href="#" class="btn btn-primary btn-delete">Видалити</a>
            </div>
        </div>
                `;
    
        //  id :   176382
        // Індекс-маси-тіла :  ""
        // Вік  :  ""
        // Звичайний тиск :  ""
        // Короткий_опис_візиту   :  ""
        // Лікар : "Кардіолог"
        // Мета-візиту : ""
        // П.І.Б. : ""
        // Перенесені-захворювання-сердцево-судинної-системи  :  ""
        // Терміновість : "Оберіть терміновість"

        const cardsContainer = document.querySelector('.cards-wrapper')
        
        cardsContainer.insertAdjacentHTML('beforeend', card)

        close();
    };

    new ModalWindow("Створити запис до лікаря", form.getFormElement(), confirmCallback).render();
})





