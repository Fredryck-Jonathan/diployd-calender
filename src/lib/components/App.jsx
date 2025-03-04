import { useEffect, useState } from 'react';
import 'ionicons/dist/ionicons/ionicons.esm.js';


function Calender(props) {
    const keyCalender = props.keyCalender;
    const dayName = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const monthName = ['Janvier', "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]

    /**
     * Retourne la date d'aujourd'hui au format "AAAA-MM-".
     * Le jour n'est pas inclus, seule l'année et le mois sont retournés.
     *
     * @returns {string} - La date d'aujourd'hui au format partiel "AAAA-MM-".
     */
    const getTodayDate = () => {
        const todayDate = new Date();
        const todayMonth = todayDate.getMonth()
        const todayYear = todayDate.getFullYear();
        const numberMonth = Number(todayMonth) + 1;
        if (numberMonth <= 9) {
            return todayYear + "-0" + numberMonth + "-";
        } else {
            return todayYear + "-" + numberMonth + "-";
        }
    }

    const [dateInfos, setDateInfos] = useState(getTodayDate());
    const [days, setDays] = useState(undefined)

    /**
     * Crée un tableau des années de 1900 jusqu'à 2025 inclus, dans l'ordre décroissant.
     *
     * @returns {string[]} - Un tableau contenant les années sous forme de chaînes, triées de 2025 à 1900.
     */
    const createArrayYears = () => {
        const arrayYears = []
        for (let année = 1900; année <= 2025 ; année++) {
            arrayYears.push(String(année));
        }
        arrayYears.reverse()
        return arrayYears
    }

    const [arrayYears, setArrayYears] = useState(createArrayYears)

    useEffect(() => {
        const dataDateInfos = dateInfos;
        const [dataYear, dataMonth, dataDay] = dataDateInfos.split('-');
        const allCalenders = document.querySelectorAll('.calender');
        let calenderDocument = undefined
        allCalenders.forEach((element) => {
            if (element.getAttribute('data-key') == keyCalender) {
                calenderDocument = element;
            }
        })
        if (dataYear == 2025 && dataMonth == 12) {
            calenderDocument.querySelector('.previous-month-button').removeAttribute('disabled');
            calenderDocument.querySelector('.next-month-button').setAttribute('disabled', "");
        } else if (dataYear == 1900 && dataMonth == 1) {
            calenderDocument.querySelector('.next-month-button').removeAttribute('disabled');
            calenderDocument.querySelector('.previous-month-button').setAttribute('disabled', "")
        } else {
            calenderDocument.querySelector('.previous-month-button').removeAttribute('disabled');
            calenderDocument.querySelector('.next-month-button').removeAttribute('disabled');
        }
        const dataTextEvent = monthName[Number(dataMonth) - 1] + " " + dataYear;
        calenderDocument.querySelector('.button-toggle-dropdown').textContent = dataTextEvent;
        setDays(generateDays(dataYear, Number(dataMonth)-1 ));
    }, [dateInfos])


    /**
     *  Toggle la classe 'active' sur le conteneur le plus proche avec la classe 'dropdown-calender'.
     *
     * @param {Event} e - L'événement déclenché par l'interaction utilisateur.
     */
    const toggleDropdown = (e) => {
        const dropdownCalender = e.currentTarget.closest('.dropdown-calender');
        dropdownCalender.classList.toggle('active');
    }

    /**
    * Toggle la classe 'active sur le conteneur le plus proche avec la classe 'year-option', tout en fermant les autres element avec la class 'year-option', si ouvert.
    *
    *  @param {Event} e - l'événement déclenché par l'interaction utilisateur.
    */
    const toggleDropdownYear = (e) => {
        e.preventDefault();
        const dropdownCalender = e.currentTarget.closest('.year-option');
        const allDropdownCalender = document.querySelectorAll('.year-option')
        allDropdownCalender.forEach((dropdown) => {
            if (dropdown.classList.contains('active') && dropdown !== dropdownCalender) {
                dropdown.classList.toggle('active');
            }
        })
        dropdownCalender.classList.toggle('active');
    }

    /**
     * Génère un tableau des jours d'un mois donné.
     *
     * @param {number} year - L'année pour le calendrier.
     * @param {number} month - Le mois pour le calendrier (0 pour janvier, 11 pour décembre).
     * @returns {Array<number | null>} - Un tableau contenant les `null` pour les jours avant le premier jour du mois et les jours du mois.
     */
    const generateDays = (year, month) => {
        const days = [];
        const firstDay = new Date(Number(year), Number(month), 1);
        const lastDay = new Date(Number(year), Number(month) + 1, 0);
        for (let i = 0; i < ((firstDay.getDay() === 0 ? 7 : firstDay.getDay()) - 1); i++) {
            days.push(null);
        }
        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(day);
        }
        return days
    }


    /**
     * Change le mois actuel grace à un evenement onClick.
     * Met à jour les informations de la date avec un format "AAAA-MM-".
     *
     * @param {string} action - L'action à effectuer, "+" pour le mois suivant, "-" pour le mois précédent.
     */
    const changeMonth = (e) => {
        e.preventDefault();
        const dataYear = e.currentTarget.getAttribute('data-year');
        const dataMonth = e.currentTarget.getAttribute('data-month');
        const numberMonth = Number(dataMonth) + 1;
        if (numberMonth <= 9) {
            setDateInfos(dataYear + "-0" + numberMonth + "-");
        } else {
            setDateInfos(dataYear + "-" + numberMonth + "-");
        }
        const element_dropdown_calender = e.currentTarget.closest('.dropdown-calender');
        element_dropdown_calender.classList.toggle('active');
    }

    /**
     * Change le mois actuel en fonction de l'action donnée ("+" pour le mois suivant, "-" pour le mois précédent).
     * Met à jour les informations de la date avec un format "AAAA-MM-".
     *
     * @param {string} action - L'action à effectuer, "+" pour le mois suivant, "-" pour le mois précédent.
     */
    const changePreviousNextMonth = (action) => {
        const dataInfos = dateInfos;
        const [dataYear, dataMonth, dataDay] = dataInfos.split('-');
        if (action === "+") {
            let newDataMonth = Number(dataMonth) + 1;
            let newDataYear = dataYear;
            if (newDataMonth >= 13) {
                newDataMonth = 1;
                newDataYear = Number(newDataYear) + 1;
            }
            if (newDataMonth <= 9) {
                setDateInfos(newDataYear + "-0" + newDataMonth + "-");
            } else {
                setDateInfos(newDataYear + "-" + newDataMonth + "-");
            }
        } else {
            let newDataMonth = Number(dataMonth) - 1;
            let newDataYear = dataYear;
            if (newDataMonth <= 0) {
                newDataMonth = 12;
                newDataYear = Number(newDataYear) - 1;
            }
            if (newDataMonth <= 9) {
                setDateInfos(newDataYear + "-0" + newDataMonth + "-");
            } else {
                setDateInfos(newDataYear + "-" + newDataMonth + "-");
            }
        }
    }

    /**
     * Gère les informations des jours sélectionnés, créer le format la date au format "JJ/MM/AAAA", et passe l'attribut data-valid a true.
     *
     * @param {Event} e - L'événement déclenché par la sélection d'un jour dans le calendrier.
     */
    const getDaysInfos = (e) => {
        e.preventDefault();
        const dataInfos = e.currentTarget.getAttribute('data-date-infos');
        const [dataYear, dataMonth, dataDay] = dataInfos.split('-');

        const element_data_input = e.currentTarget.closest('.calender').querySelector('.date-input');
        element_data_input.setAttribute('data-valid', true);
        element_data_input.setAttribute('data-date', dataInfos);
        element_data_input.value = dataDay + "/" + dataMonth + "/" + dataYear;
    }

    /**
     * Crée un identifiant de date pour un jour donné dans le format "AAAA-MM-DD".
     *
     * @param {number} day - Le jour pour lequel on crée l'identifiant de date.
     * @returns {string} - La date formée sous la forme "AAAA-MM-DD".
     */
    const createDayInfo = (day) => {
        const [year, month, oldday] = dateInfos.split('-');
        if (day <= 9) {
            const data_date = year + '-' + month + "-0" + String(day);
            return data_date
        } else {
            const data_date = year + '-' + month + "-" + String(day);
            return data_date
        }
    }

    /**
     * Active ou désactive le modal de calendrier.
     *
     * @param {Event} e - L'événement déclenché par l'utilisateur (souvent un clic).
     */
    const toggleCalender = (e) => {
        const calender_modal = e.currentTarget.closest('.calender').querySelector('.calender-modal');
        calender_modal.classList.toggle('active');
    }

    /**
     * Met à jour les informations de la date en fonction d'une date fournie au format `JJ/MM/AAAA`, pour qu'elle soit au format `AAAA-MM-JJ`.
     *
     * @param {string} value - La date sous forme de chaîne de caractères au format `JJ/MM/AAAA`.
     * @returns {string} - La nouvelle date formatée sous la forme `AAAA-MM-DD`.
     */
    const setDataDateInput = (value) => {
        console.log(value)
        const [jour, mois, année] = value.split('/');
        const newDate = année+"-"+mois+"-"+jour
        setDateInfos(newDate)
        return newDate
    }

    /**
     * Formate l'entrée de la date en ajoutant des barres obliques après les chiffres appropriés.
     * Valide également la date après le formatage et met à jour les attributs des éléments en conséquence.
     *
     * @param {Event} e - L'événement déclenché lors de la saisie de la date.
     */
    const formatDateInput = (e) => {
        let value = e.currentTarget.value;
            value = value.replace(/[^0-9/]/g, "");
            if (value.length > 2 && value[2] !== "/") {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
            if (value.length > 5 && value[5] !== "/") {
                value = value.slice(0, 5) + "/" + value.slice(5);
        }
        e.target.value = value.slice(0, 10);
        if (validateDateFormat(value)) {
            e.currentTarget.setAttribute('data-valid', true);
            const finalValue = setDataDateInput(e.currentTarget.value);
            console.log(finalValue)
            e.currentTarget.setAttribute('data-date', finalValue);
            console.log(e.currentTarget);
        } else {
            e.currentTarget.setAttribute('data-valid', false);
            e.currentTarget.setAttribute('data-date', "undefined");
        }
    }


    /**
     * Valide si une chaîne de caractères correspond au format de date `JJ/MM/AAAA`.
     *
     * @param {string} value - La chaîne de caractères à valider.
     * @returns {boolean} - Retourne `true` si la chaîne est au format `JJ/MM/AAAA`, sinon retourne `false`.
     */
    const validateDateFormat = (value) => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return datePattern.test(value);
    }


    /**
     * Sélectionne la date d'aujourd'hui et met à jour les informations de la date dans l'état.
     */
    const selectTodayDate = () => {
        setDateInfos(getTodayDate())
    }


    return (
        <div className='calender' data-key={keyCalender}>
            <div className='calender-input-div'>
                <input onInput={formatDateInput} type='text' data-valid="false" data-date="undefined" className='date-input' placeholder='jj/mm/aaaa' maxLength="10"></input>
                <button aria-label='toggle calender button' onClick={(e) => { e.preventDefault(); toggleCalender(e) }} className='button-open-calender'> <ion-icon name="calendar-outline"></ion-icon></button>
            </div>
            <div className='calender-modal'>
                <div className="calender-first-part">
                    
                    <div className="dropdown-calender">
                        <button className="button-toggle-dropdown" onClick={(e) => { e.preventDefault(); toggleDropdown(e) }}>Novembre 2024</button>
                        <div className="dropdown-content">
                            {arrayYears.map((year, index) => (
                                <div className="year-option" data-year={year} key={year}>
                                    <button onClick={toggleDropdownYear} className="button-toggle-year-dropdown">{year}</button>
                                    <div className="all-month-option">
                                        <button className="month-option" data-text={"Janvier " + year} data-year={year} data-month="0" onClick={(e) => changeMonth(e)}>Janvier</button>
                                        <button className="month-option" data-text={"Février " + year} data-year={year} data-month="1" onClick={(e) => changeMonth(e)}>Février</button>
                                        <button className="month-option" data-text={"Mars " + year} data-year={year} data-month="2" onClick={(e) => changeMonth(e)}>Mars</button>
                                        <button className="month-option" data-text={"Avril " + year} data-year={year} data-month="3" onClick={(e) => changeMonth(e)}>Avril</button>
                                        <button className="month-option" data-text={"Mai " + year} data-year={year} data-month="4" onClick={(e) => changeMonth(e)}>Mai</button>
                                        <button className="month-option" data-text={"Juin " + year} data-year={year} data-month="5" onClick={(e) => changeMonth(e)}>Juin</button>
                                        <button className="month-option" data-text={"Juillet " + year} data-year={year} data-month="6" onClick={(e) => changeMonth(e)}>Juillet</button>
                                        <button className="month-option" data-text={"Août " + year} data-year={year} data-month="7" onClick={(e) => changeMonth(e)}>Août</button>
                                        <button className="month-option" data-text={"Septembre " + year} data-year={year} data-month="8" onClick={(e) => changeMonth(e)}>Septembre</button>
                                        <button className="month-option" data-text={"Octobre " + year} data-year={year} data-month="9" onClick={(e) => changeMonth(e)}>Octobre</button>
                                        <button className="month-option" data-text={"Novembre " + year} data-year={year} data-month="10" onClick={(e) => changeMonth(e)}>Novembre</button>
                                        <button className="month-option" data-text={"Décembre " + year} data-year={year} data-month="11" onClick={(e) => changeMonth(e)}>Décembre</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='div-button-calender-first-part'>
                        <div className="change-month">
                            <button aria-label='go to previous month' onClick={(e) => { e.preventDefault(); changePreviousNextMonth("-") }} className="previous-month-button"><ion-icon name="arrow-down-outline"></ion-icon></button>
                            <button aria-label='go to next month' onClick={(e) => { e.preventDefault(); changePreviousNextMonth("+") }} className="next-month-button"><ion-icon name="arrow-up-outline"></ion-icon></button>
                        </div>
                        <button aria-label='close_calender' onClick={(e) => { e.preventDefault(); toggleCalender(e)}} className='close_calender_dropdown'><ion-icon name="close-outline"></ion-icon></button>
                    </div>
                </div>
                <div className="calender-second-part">
                    {dayName.map((dayName, index) => (
                        <div className='day-name-div' key={index}>{dayName}</div>
                    ))}
                    {days && days.map((day, index) => { 
                        if (day !== null) {
                            const data_date = createDayInfo(day)
                            return(
                                <button aria-label={`select ${data_date} date button`} key={index} data-date-infos={data_date} onClick={(e) => { e.preventDefault(); getDaysInfos(e) }} >{day}</button>
                            )
                        } else {
                            return(
                                <div key={index}>{day}</div>
                            )
                        }
                    })}
                </div>
                <div className="calender-third-part">
                    <button aria-label='Select today date button' onClick={(e) => { e.preventDefault(); selectTodayDate()}} className="select-today-button">Aujourd'hui</button>
                </div>
            </div>
        </div>
    )
}
export default Calender
