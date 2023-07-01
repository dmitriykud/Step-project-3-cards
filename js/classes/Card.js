import ModalWindow from './ModalWindow.js';
import EditVisit from './EditVisit.js';

export default class Card {
    constructor(id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit) {
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
        this.container = document.createElement('div');
        this.deleteButton = document.createElement('button');
        this.btnShowMore = document.createElement('button');
        this.divShowMore = document.createElement('div');
        this.btnEditCard = document.createElement('button');
        this.btnWrapper = document.createElement('div');
    }

    createElements() {
        let additionalToCard = "";

        const addToCardKardiologist = `
            <p class="card-text">Звичайний тиск: ${this.normalPressure}</p>
            <p class="card-text">Індекс маси тіла: ${this.indexBodyMass}</p>
            <p class="card-text">Перенесені захворювання: ${this.transferredDiseases}</p>
            <p class="card-text">Вік: ${this.age}</p>
             `;

        const addToCardDantist = `
            <p class="card-text">Дата останнього візиту: ${this.lastDateVisit}</p>
            `;

        const addToCardTerapevtist = `
            <p class="card-text">Вік: ${this.age}</p>
             `;

        if (this.doctor === "Cardiologist") {
            additionalToCard = addToCardKardiologist
        };

        if (this.doctor === "Dentist") {
            additionalToCard = addToCardDantist
        };
        if (this.doctor === "Therapist") {
            additionalToCard = addToCardTerapevtist
        };

        const card =
            `<div class="card-body ">
       <h5 class="card-title">Лікар :   ${this.doctor}</h5>
       <p class="card-text">П.І.Б. паціента: ${this.fullName}</p>
           
       </div>
       `;

      const divMoreDiscription = `
            <p class="card-text">Мета візиту: ${this.purposeVisit}</p>
            <p class="card-text">Короткий опис візиту: ${this.visitDescription}</p>
            <p class="card-text">Терміновість: ${this.urgency}</p>       
            ${additionalToCard}          
            `;

        this.container.classList.add('card', 'w-25');
        this.container.setAttribute('id', `${this.id}`);
        this.btnWrapper.style.display = 'flex';
        this.btnWrapper.style.justifyContent ="space-around"
        this.btnWrapper.style.backgroundColor="rgba(187, 122, 177, 0.548)"
        this.divShowMore.classList.add('wrapper-show-more', "card-body", 'active')
        this.divShowMore.insertAdjacentHTML('beforeend', divMoreDiscription);
        this.deleteButton.classList.add('btn', 'btn-danger',);
        this.deleteButton.innerHTML = 'Видалити';
        this.btnShowMore.classList.add('btn', 'btn-info');
        this.btnShowMore.innerHTML = 'Показати більше';
        this.btnEditCard.classList.add('btn', 'btn-success');
        this.btnEditCard.innerHTML = 'Редагувати';


        this.container.insertAdjacentHTML('beforeend', card);
        this.btnWrapper.append(this.btnEditCard, this.deleteButton);
        this.container.append(this.btnShowMore, this.divShowMore, this.btnWrapper);
    };

    addEventListeners() {
        this.btnShowMore.addEventListener("click", () => {
            this.divShowMore.classList.toggle('active');
        });

        this.deleteButton.addEventListener("click", async () => {
            try {
                await axios.delete(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(({ status }) => {
                        if (status === 200) {
                            this.container.remove();
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        });

        this.btnEditCard.addEventListener('click', async () => {
            try {
                const form = new EditVisit(this.id, this.age, this.visitDescription, this.doctor, this.purposeVisit, this.fullName, this.urgency, this.indexBodyMass, this.normalPressure, this.transferredDiseases, this.lastDateVisit);

                const editCallback = async (close) => {
                    const data = form.getVizitValues();

                    await axios.put(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, data,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        .then(resp => {
                            if (resp.status === 200) {
                                const { id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit } = resp.data

                                document.getElementById(`${id}`).remove();

                                new Card(id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit
                                ).render('.cards-wrapper');

                                close();
                            }
                        })
                        .catch(err => {
                            console.log('ERROR:', err);
                        });
                };

                new ModalWindow("Редагувати запис до лікаря", form.getFormElement(), editCallback).render();
            } catch (error) {
                console.log(error);
            };
        });
    };

    render(selector) {
        this.createElements();
        this.addEventListeners();
        document.querySelector(selector).prepend(this.container);
    };
};