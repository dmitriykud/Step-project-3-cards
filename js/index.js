import ModalWindow from './classes/ModalWindow.js';
import LoginForm from './classes/LoginForm.js';
import checkToken from './functions/checkToken.js';
import loginFunction from './API/loginFunction.js';
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






