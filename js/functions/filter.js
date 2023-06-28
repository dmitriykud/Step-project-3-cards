import Card from "../classes/Card.js"

const filterCard = async ({ search, select_doctor, select_urgency }) => {

    try {
        const { data } = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        let dataRender = data;

        if (search !== "") {

            dataRender = dataRender.filter(obj => obj.purposeVisit.toLowerCase().includes(search.toLowerCase()))
        }
        console.log(dataRender);

        if (select_doctor !== "Пошук за лікарем") {

            dataRender = dataRender.filter(obj => obj.doctor === select_doctor)
        }

        if (select_urgency !== "Терміновість візиту") {

            dataRender = dataRender.filter(obj => obj.urgency === select_urgency)
        }

        document.querySelector('.cards-wrapper').innerHTML = '';
        dataRender.forEach(({ id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit
        }) => {
            new Card(id, age, visitDescription, doctor, purposeVisit, fullName, urgency, indexBodyMass, normalPressure, transferredDiseases, lastDateVisit).render('.cards-wrapper')
        })
    } catch (error) {
        console.log(error);
    }
};

export default filterCard;
