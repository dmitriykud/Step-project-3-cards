const checkToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
        const loginBtn = document.querySelector('.login');
        const сreateVisit = document.querySelector('.сreate-visit')
       

        loginBtn.style.display = 'none';
        сreateVisit.style.display = 'block';

        // Отримати з сервера і відмалювати всю інфу
    }
}

export default checkToken;