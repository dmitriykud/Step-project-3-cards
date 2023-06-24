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
        
        
            
            data.forEach(({id,Вік,Короткий_опис_візиту,Лікар,Мета_візиту,П_І_Б,Терміновість,Індекс_маси_тіла,Звичайний_тиск,Перенесені_захворювання,Дата_останнього_візиту
            }) => {
        
        
                let additionalToCard = "";
        
        
        
                const addToCardKardiologist = `
                    <p class="card-text">Звичайний тиск: ${Звичайний_тиск}</p>
                    <p class="card-text">Індекс маси тіла: ${Індекс_маси_тіла}</p>
                    <p class="card-text">Перенесені захворювання: ${Перенесені_захворювання}</p>
                    <p class="card-text">Вік: ${Вік}</p>
                `;
                const addToCardDantist = `
                    <p class="card-text">Дата останнього візиту: ${Дата_останнього_візиту}</p>
                `;
                const addToCardTerapevtist = `
                    <p class="card-text">Вік: ${Вік}</p>
                `;
        
                if (Лікар === "Кардіолог") {
                    additionalToCard = addToCardKardiologist
                };
        
                if (Лікар === "Стоматолог") {
                    additionalToCard = addToCardDantist
                }
                if (Лікар === "Терапевт") {
                    additionalToCard = addToCardTerapevtist
                }
        
                const card = `
                <div class="card w-25"  id = ${id}>
                    <div class="card-body bg-warning">
                    <h5 class="card-title">Лікар:${Лікар}</h5>
                    <p class="card-text">Мета візиту: ${Мета_візиту}</p>
                    <p class="card-text">Короткий опис візиту: ${Короткий_опис_візиту}</p>
                    <p class="card-text">Терміновість: ${Терміновість}</p>
                    <p class="card-text">П.І.Б.: ${П_І_Б}</p>
        
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