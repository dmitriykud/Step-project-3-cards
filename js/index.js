import ModalWindow from './classes/ModalWindow.js';
import LoginForm from './classes/LoginForm.js';
import Visit from './classes/Visit.js';
import checkToken from './functions/checkToken.js';
import loginFunction from './API/loginFunction.js';
import postElement from './API/postElement.js';
import Card from './classes/Card.js';
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
});

const btnCreateVisit = document.querySelector('.сreate-visit');

btnCreateVisit.addEventListener('click', () => {

    const form = new Visit();

    const confirmCallback = async (close) => {
        const body = form.getVizitValues();
        const { data } = await postElement(body);
        
        new Card(data.id, data.age, data.visitDescription, data.doctor, data.purposeVisit, data.fullName, data.urgency, data.indexBodyMass, data.normalPressure, data.transferredDiseases, data.lastDateVisit
        ).render('.cards-wrapper');

        document.querySelector('.first-message').style.display = 'none';

        close();
    };

    new ModalWindow("Створити запис до лікаря", form.getFormElement(), confirmCallback).render();
})



