const checkToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
        const loginBtn = document.querySelector('.login');
        const сreateVisit = document.querySelector('.сreate-visit')
        const firstMessage = document.querySelector('.first-message');
        const filterForm = document.querySelector('.filter-form')

        loginBtn.style.display = 'none';
        сreateVisit.style.display = 'block';
        firstMessage.style.display = 'none';
        filterForm.style.display = 'flex';
        // Отримати з сервера і відмалювати всю інфу

        axios.get('https://ajax.test-danit.com/api/v2/cards',{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              }
        })
        .then(({data})=>{
        
        console.log(data);
            
            data.forEach(({id,age,visitDescription,doctor,purposeVisit,fullName,urgency,indexBodyMass,normalPressure,transferredDiseases,lastDateVisit
            }) => {
        
        
                let additionalToCard = "";
        
        
        
                const addToCardKardiologist = `
                    <p class="card-text">Звичайний тиск: ${normalPressure}</p>
                    <p class="card-text">Індекс маси тіла: ${indexBodyMass}</p>
                    <p class="card-text">Перенесені захворювання: ${transferredDiseases}</p>
                    <p class="card-text">Вік: ${age}</p>
                `;
                const addToCardDantist = `
                    <p class="card-text">Дата останнього візиту: ${lastDateVisit}</p>
                `;
                const addToCardTerapevtist = `
                    <p class="card-text">Вік: ${age}</p>
                `;
        
                if (doctor === "Cardiologist") {
                    additionalToCard = addToCardKardiologist
                };
        
                if (doctor === "Dentist") {
                    additionalToCard = addToCardDantist
                }
                if (doctor === "Therapist") {
                    additionalToCard = addToCardTerapevtist
                }
        
                const card = `
                <div class="card w-25"  id = ${id}>
                    <div class="card-body bg-warning">
                    <h5 class="card-title">Лікар:${doctor}</h5>
                    <p class="card-text">Мета візиту: ${purposeVisit}</p>
                    <p class="card-text">Короткий опис візиту: ${visitDescription}</p>
                    <p class="card-text">Терміновість: ${urgency}</p>
                    <p class="card-text">П.І.Б.: ${fullName}</p>
        
                    ${additionalToCard}
                    <a href="#" class="btn btn-primary btn-delete">Видалити</a>
                    </div>
                </div>
                        `;
                        const cardsContainer = document.querySelector('.cards-wrapper')
                
                        cardsContainer.insertAdjacentHTML('beforeend', card)
                
                        // close();
                    
        
        
                // new ModalWindow("Запис до лікаря", form.getFormElement(), confirmCallback).render()     
        // console.log(id,Вік,Короткий_опис_візиту,Лікар,Мета_візиту,П_І_Б,Терміновість,Індекс_маси_тіла,Звичайний_тиск,Перенесені_захворювання,Дата_останнього_візиту);
        
        
            });
        
        
        })







    }
}

export default checkToken;