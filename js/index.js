import ModalWindow from './classes/ModalWindow.js';
import LoginForm from './classes/LoginForm.js';
import Vizit from './classes/Vizit.js';
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

    const form = new Vizit();

    const confirmCallback = async (close) => {
        const body = form.getVizitValues();
        const { data } = await postElement(body);
        console.log(data);
        let additionalToCard = "";



        const addToCardKardiologist = `
            <p class="card-text">Звичайний тиск: ${data.Звичайний_тиск}</p>
            <p class="card-text">Індекс маси тіла: ${data.Індекс_маси_тіла}</p>
            <p class="card-text">Перенесені захворювання: ${data.Перенесені_захворювання}</p>
            <p class="card-text">Вік: ${data.Вік}</p>
        `;
        const addToCardDantist = `
            <p class="card-text">Дата останнього візиту: ${data.Дата_останнього_візиту}</p>
        `;
        const addToCardTerapevtist = `
            <p class="card-text">Вік: ${data.Вік}</p>
        `;

        if (data.Лікар === "Кардіолог") {
            additionalToCard = addToCardKardiologist
        };

        if (data.Лікар === "Стоматолог") {
            additionalToCard = addToCardDantist
        }
        if (data.Лікар === "Терапевт") {
            additionalToCard = addToCardTerapevtist
        }

        const card = `
        <div class="card w-25" id = ${data.id}>
            <div class="card-body bg-warning">
            <h5 class="card-title">Лікар:${data.Лікар}</h5>
            <p class="card-text">Мета візиту: ${data.Мета_візиту}</p>
            <p class="card-text">Короткий опис візиту: ${data.Короткий_опис_візиту}</p>
            <p class="card-text">Терміновість: ${data.Терміновість}</p>
            <p class="card-text">П.І.Б.: ${data.П_І_Б}</p>

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





