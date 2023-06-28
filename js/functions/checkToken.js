import Card from "../classes/Card.js";

const checkToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
        const loginBtn = document.querySelector('.login');
        const сreateVisit = document.querySelector('.сreate-visit')
        const firstMessage = document.querySelector('.first-message');
        const filterForm = document.querySelector('.filter-form')

        loginBtn.style.display = 'none';
        сreateVisit.style.display = 'block';
        filterForm.style.display = 'flex';

        axios.get('https://ajax.test-danit.com/api/v2/cards', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(({ data }) => {

                if (data.length !== 0) {
                    firstMessage.style.display = 'none';

                    data.forEach(({ id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit
                    }) => {
                        new Card(id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit).render('.cards-wrapper')
                    })

                } else firstMessage.style.display = 'block';
            }
            );
    }
};

export default checkToken;


